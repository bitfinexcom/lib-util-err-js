'use strict'

/* eslint-env mocha */

const { expect } = require('chai').use(require('dirty-chai'))
const { format } = require('util')
const { GenericError, UserError, constants: { ERR_CODES }, apiErrorHandler } = require('../')

module.exports = () => {
  describe('apiErrorHandler tests', () => {
    let backupFunc = null
    let storedLog = null

    before(() => {
      backupFunc = console.error

      console.error = (...params) => {
        storedLog = format(...params)
      }
    })

    after(() => {
      console.error = backupFunc
    })

    beforeEach(() => {
      storedLog = null
    })

    it('it should hide original error message in case if it\'s not instance of UserError', (done) => {
      apiErrorHandler(new Error('Critical error in db'), 'MY_FUNCTION', {}, (err) => {
        expect(err).to.be.instanceOf(GenericError)
        expect(err.message).to.be.equal('MY_FUNCTION: generic error')
        expect(err._bfxMessage).to.be.equal('MY_FUNCTION: generic error')
        expect(err.code).to.be.equal(ERR_CODES.ERR_GENERIC)
        expect(err._bfxCode).to.be.equal(ERR_CODES.ERR_GENERIC)
        done()
      })
    })

    it('it should return original error message in case if it\'s instance of UserError', (done) => {
      apiErrorHandler(new UserError('invalid field', ERR_CODES.ERR_PARAMS), 'MY_FUNCTION', {}, (err) => {
        expect(err).to.be.instanceOf(UserError)
        expect(err.message).to.be.equal('MY_FUNCTION: invalid field')
        expect(err._bfxMessage).to.be.equal('MY_FUNCTION: invalid field')
        expect(err.code).to.be.equal(ERR_CODES.ERR_PARAMS)
        expect(err._bfxCode).to.be.equal(ERR_CODES.ERR_PARAMS)
        done()
      })
    })

    it('it should return original error message in case if it has force flag', (done) => {
      apiErrorHandler(new Error('Critical error in db'), 'MY_FUNCTION', { force: true }, (err) => {
        expect(err).to.be.instanceOf(UserError)
        expect(err.message).to.be.equal('MY_FUNCTION: Critical error in db')
        expect(err.code).to.be.equal(ERR_CODES.ERR_GENERIC) // since it's missing add default one!
        done()
      })
    })

    it('it should work without optional params', (done) => {
      apiErrorHandler(new Error('Critical error in db'), (err) => {
        expect(err).to.be.instanceOf(GenericError)
        expect(err.message).to.be.equal('generic error')
        expect(err._bfxMessage).to.be.equal('generic error')
        expect(err.code).to.be.equal(ERR_CODES.ERR_GENERIC)
        expect(err._bfxCode).to.be.equal(ERR_CODES.ERR_GENERIC)
        done()
      })
    })

    it('it should always log original error', (done) => {
      apiErrorHandler(new UserError('invalid field', ERR_CODES.ERR_PARAMS), (err) => {
        expect(storedLog).not.to.be.null()
        expect(storedLog.includes(err.trace))
        done()
      })
    })
  })
}
