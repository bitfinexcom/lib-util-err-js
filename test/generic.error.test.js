'use strict'

/* eslint-env mocha */

const { expect } = require('chai').use(require('dirty-chai'))
const { UserError, GenericError, constants: { ERR_CODES, GRC_ERR_TAG } } = require('../')

module.exports = () => {
  describe('GenericError tests', () => {
    it('it should parse fields properly', () => {
      const err = new GenericError('MY_FUNCTION')
      expect(err).to.be.instanceOf(Error)
      expect(err.name).to.be.equal('GenericError')
      expect(err.message).to.be.equal('MY_FUNCTION: generic error')
      expect(err._bfxMessage).to.be.equal('MY_FUNCTION: generic error')
      expect(err.code).to.be.equal(ERR_CODES.ERR_GENERIC)
      expect(err._bfxCode).to.be.equal(ERR_CODES.ERR_GENERIC)
      expect(err.stack).to.be.a('string')
      expect(err.stack.startsWith('GenericError: MY_FUNCTION: generic error')).to.be.true()
      expect(err.stack.includes(' at ')).to.be.true()
    })

    it('it should work also without optional params', () => {
      const err = new GenericError()

      expect(err.message).to.be.equal('generic error')
      expect(err._bfxMessage).to.be.equal('generic error')
      expect(err.code).to.be.equal(ERR_CODES.ERR_GENERIC)
      expect(err._bfxCode).to.be.equal(ERR_CODES.ERR_GENERIC)
      expect(err.stack.startsWith('GenericError: generic error')).to.be.true()
    })

    it('it should serialize only specific fields', () => {
      const serialized = JSON.stringify(new GenericError('MY_FUNC'))
      const deserialized = JSON.parse(serialized)
      const expected = {
        message: 'MY_FUNC: generic error',
        code: ERR_CODES.ERR_GENERIC,
        grctag: GRC_ERR_TAG
      }

      expect(deserialized).to.be.eqls(expected)
    })

    it('it should be able to be detected as deserialized user error object', () => {
      const serialized = JSON.stringify(new GenericError('MY_FUNC'))
      const deserialized = JSON.parse(serialized)
      const falseError = {
        message: 'MY_FUNC: generic error',
        code: ERR_CODES.ERR_GENERIC
      }

      expect(UserError.hasUserErrorSignature(falseError)).to.be.false()
      expect(UserError.hasUserErrorSignature(deserialized)).to.be.true()
    })
  })
}
