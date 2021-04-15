'use strict'

/* eslint-env mocha */

const { expect } = require('chai').use(require('dirty-chai'))
const { UserError, constants: { ERR_CODES, GRC_ERR_TAG } } = require('../')

module.exports = () => {
  describe('UserError tests', () => {
    it('it should parse fields properly', () => {
      const err = new UserError('invalid user input', ERR_CODES.ERR_PARAMS)

      expect(err).to.be.instanceOf(Error)
      expect(err.name).to.be.equal('UserError')
      expect(err.message).to.be.equal('invalid user input')
      expect(err._bfxMessage).to.be.equal('invalid user input')
      expect(err.code).to.be.equal(ERR_CODES.ERR_PARAMS)
      expect(err._bfxCode).to.be.equal(ERR_CODES.ERR_PARAMS)
      expect(err.stack).to.be.a('string')
      expect(err.stack.startsWith('UserError: invalid user input')).to.be.true()
      expect(err.stack.includes(' at ')).to.be.true()
    })

    it('it should work also without optional params', () => {
      const err = new UserError('invalid user input')

      expect(err.message).to.be.equal('invalid user input')
      expect(err._bfxMessage).to.be.equal('invalid user input')
      expect(err.code).to.be.equal(ERR_CODES.ERR_GENERIC)
      expect(err._bfxCode).to.be.equal(ERR_CODES.ERR_GENERIC)
      expect(err.stack.startsWith('UserError: invalid user input')).to.be.true()
    })

    it('it should serialize only specific fields', () => {
      const serialized = JSON.stringify(new UserError('invalid user input', ERR_CODES.ERR_PARAMS))
      const deserialized = JSON.parse(serialized)
      const expected = {
        message: 'invalid user input',
        code: ERR_CODES.ERR_PARAMS,
        grctag: GRC_ERR_TAG
      }

      expect(deserialized).to.be.eqls(expected)
    })

    it('it should be able to detect deserialized objects based on their signature', () => {
      const serialized = JSON.stringify(new UserError('invalid user input', ERR_CODES.ERR_PARAMS))
      const deserialized = JSON.parse(serialized)
      const falseError = {
        message: 'invalid user input',
        code: ERR_CODES.ERR_PARAMS
      }

      expect(UserError.hasUserErrorSignature(falseError)).to.be.false()
      expect(UserError.hasUserErrorSignature(deserialized)).to.be.true()
    })
  })
}
