'use strict'

/* eslint-env mocha */

const sinon = require('sinon')
const { expect } = require('chai').use(require('dirty-chai'))
const { format } = require('util')
const { GrcGenericError, GrcUserError, apiErrorHandler } = require('../')

describe('apiErrorHandler tests', () => {
  let storedLog = ''
  const logStub = sinon.stub(console, 'error')

  before(() => {
    logStub.callsFake((...params) => {
      storedLog = format(...params)
    })
  })

  after(() => {
    logStub.restore()
  })

  beforeEach(() => {
    storedLog = ''
  })

  it('it should hide original error message in case if it\'s not instance of GrcUserError', (done) => {
    apiErrorHandler(new Error('Critical error in db'), 'MY_FUNCTION', {}, (err) => {
      expect(err).to.be.instanceOf(GrcGenericError)
      expect(err.message).to.be.equal('MY_FUNCTION: generic error')
      expect(err.code).to.be.equal(null)
      done()
    })
  })

  it('it should return original error message in case if it\'s instance of GrcUserError', (done) => {
    apiErrorHandler(new GrcUserError('invalid field', 10001), 'MY_FUNCTION', {}, (err) => {
      expect(err).to.be.instanceOf(GrcUserError)
      expect(err.message).to.be.equal('MY_FUNCTION: invalid field')
      expect(err.code).to.be.equal(10001)
      done()
    })
  })

  it('it should return original error message in case if it has force flag', (done) => {
    apiErrorHandler(new Error('Critical error in db'), 'MY_FUNCTION', { force: true }, (err) => {
      expect(err).to.be.instanceOf(GrcUserError)
      expect(err.message).to.be.equal('MY_FUNCTION: Critical error in db')
      expect(err.code).to.be.equal(null) // since it's missing add default one!
      done()
    })
  })

  it('it should work without optional params', (done) => {
    apiErrorHandler(new Error('Critical error in db'), (err) => {
      expect(err).to.be.instanceOf(GrcGenericError)
      expect(err.message).to.be.equal('generic error')
      expect(err.code).to.be.equal(null)
      done()
    })
  })

  it('it should work without opts param', (done) => {
    apiErrorHandler(new Error('Critical error in db'), 'MY_FUNCTION', (err) => {
      expect(err).to.be.instanceOf(GrcGenericError)
      expect(err.message).to.be.equal('MY_FUNCTION: generic error')
      expect(err.code).to.be.equal(null)
      done()
    })
  })

  it('it should always log original error', (done) => {
    apiErrorHandler(new GrcUserError('invalid field', 10001), (err) => {
      expect(storedLog).not.to.be.null()
      expect(storedLog.includes(err.trace))
      done()
    })
  })

  it('it should use toString method when error does not have message field', (done) => {
    apiErrorHandler('Critical error in db', 'MY_FUNCTION', { force: true }, (err) => {
      expect(err).to.be.instanceOf(GrcUserError)
      expect(err.message).to.be.equal('MY_FUNCTION: Critical error in db')
      expect(err.code).to.be.equal(null)
      done()
    })
  })

  it('it should avoid adding prefix more than once', (done) => {
    apiErrorHandler(new GrcUserError('MY_FUNCTION: invalid field'), 'MY_FUNCTION', (err) => {
      expect(err).to.be.instanceOf(GrcUserError)
      expect(err.message).to.be.equal('MY_FUNCTION: invalid field')
      expect(err.code).to.be.equal(null)
      done()
    })
  })
})
