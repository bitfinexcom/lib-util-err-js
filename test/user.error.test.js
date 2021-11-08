'use strict'

/* eslint-env mocha */

const { expect } = require('chai').use(require('dirty-chai'))
const { GrcUserError } = require('../')

describe('GrcUserError tests', () => {
  it('it should parse fields properly', () => {
    const err = new GrcUserError('invalid user input', 10001)

    expect(err).to.be.instanceOf(Error)
    expect(err.name).to.be.equal('GrcUserError')
    expect(err.message).to.be.equal('invalid user input')
    expect(err.code).to.be.equal(10001)
    expect(err.stack).to.be.a('string')
    expect(err.stack.startsWith('GrcUserError: invalid user input')).to.be.true()
    expect(err.stack.includes(' at ')).to.be.true()
  })

  it('it should work also without optional params', () => {
    const err = new GrcUserError('invalid user input')

    expect(err.message).to.be.equal('invalid user input')
    expect(err.code).to.be.null()
    expect(err.stack.startsWith('GrcUserError: invalid user input')).to.be.true()
  })

  it('it should serialize only specific fields', () => {
    const serialized = JSON.stringify(new GrcUserError('invalid user input', 10001))
    const deserialized = JSON.parse(serialized)
    const expected = {
      name: 'GrcUserError',
      message: 'invalid user input',
      code: 10001
    }

    expect(deserialized).to.be.eqls(expected)
  })
})
