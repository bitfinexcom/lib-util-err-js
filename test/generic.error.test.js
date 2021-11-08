'use strict'

/* eslint-env mocha */

const { expect } = require('chai').use(require('dirty-chai'))
const { GrcGenericError } = require('../')

describe('GenericError tests', () => {
  it('it should parse fields properly', () => {
    const err = new GrcGenericError('MY_FUNCTION')
    expect(err).to.be.instanceOf(Error)
    expect(err.name).to.be.equal('GrcGenericError')
    expect(err.message).to.be.equal('MY_FUNCTION: generic error')
    expect(err.code).to.be.equal(null)
    expect(err.stack).to.be.a('string')
    expect(err.stack.startsWith('GrcGenericError: MY_FUNCTION: generic error')).to.be.true()
    expect(err.stack.includes(' at ')).to.be.true()
  })

  it('it should work also without optional params', () => {
    const err = new GrcGenericError()

    expect(err.message).to.be.equal('generic error')
    expect(err.code).to.be.equal(null)
    expect(err.stack.startsWith('GrcGenericError: generic error')).to.be.true()
  })

  it('it should serialize only specific fields', () => {
    const serialized = JSON.stringify(new GrcGenericError('MY_FUNC'))
    const deserialized = JSON.parse(serialized)
    const expected = {
      name: 'GrcGenericError',
      message: 'MY_FUNC: generic error',
      code: null
    }

    expect(deserialized).to.be.eqls(expected)
  })
})
