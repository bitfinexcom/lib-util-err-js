'use strict'

/* eslint-env mocha */

const { expect } = require('chai').use(require('dirty-chai'))
const { GrcUserError, GrcGenericError, constants: { ERR_CODES, GRC_ERR_TAG } } = require('../')

module.exports = () => {
  describe('GenericError tests', () => {
    it('it should parse fields properly', () => {
      const err = new GrcGenericError('MY_FUNCTION')
      expect(err).to.be.instanceOf(Error)
      expect(err.name).to.be.equal('GrcGenericError')
      expect(err.message).to.be.equal('MY_FUNCTION: generic error')
      expect(err._bfxMessage).to.be.equal('MY_FUNCTION: generic error')
      expect(err.code).to.be.equal(ERR_CODES.ERR_GENERIC)
      expect(err._bfxCode).to.be.equal(ERR_CODES.ERR_GENERIC)
      expect(err.stack).to.be.a('string')
      expect(err.stack.startsWith('GrcGenericError: MY_FUNCTION: generic error')).to.be.true()
      expect(err.stack.includes(' at ')).to.be.true()
    })

    it('it should work also without optional params', () => {
      const err = new GrcGenericError()

      expect(err.message).to.be.equal('generic error')
      expect(err._bfxMessage).to.be.equal('generic error')
      expect(err.code).to.be.equal(ERR_CODES.ERR_GENERIC)
      expect(err._bfxCode).to.be.equal(ERR_CODES.ERR_GENERIC)
      expect(err.stack.startsWith('GrcGenericError: generic error')).to.be.true()
    })

    it('it should serialize only specific fields', () => {
      const serialized = JSON.stringify(new GrcGenericError('MY_FUNC'))
      const deserialized = JSON.parse(serialized)
      const expected = {
        message: 'MY_FUNC: generic error',
        code: ERR_CODES.ERR_GENERIC,
        grctag: GRC_ERR_TAG
      }

      expect(deserialized).to.be.eqls(expected)
    })

    it('it should be able to be detected as deserialized user error object', () => {
      const serialized = JSON.stringify(new GrcGenericError('MY_FUNC'))
      const deserialized = JSON.parse(serialized)
      const falseError = {
        message: 'MY_FUNC: generic error',
        code: ERR_CODES.ERR_GENERIC
      }

      expect(GrcUserError.hasUserErrorSignature(falseError)).to.be.false()
      expect(GrcUserError.hasUserErrorSignature(deserialized)).to.be.true()
    })
  })
}
