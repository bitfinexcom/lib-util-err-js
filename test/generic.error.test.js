'use strict'

/* eslint-env mocha */

const { expect } = require('chai').use(require('dirty-chai'))
const { GenericError, constants: { ERR_CODES } } = require('../')

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
  })
}
