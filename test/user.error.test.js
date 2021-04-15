'use strict'

/* eslint-env mocha */

const { expect } = require('chai').use(require('dirty-chai'))
const { UserError, constants: { ERR_CODES } } = require('../')

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
  })
}
