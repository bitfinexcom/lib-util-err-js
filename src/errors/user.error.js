'use strict'

const { ERR_CODES } = require('../constants')

/**
 * User friendly error that is shown directly to endusers
 */
class UserError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} [code] - Optional, error code, default is bfx generic error
   */
  constructor (message, code = null) {
    super(message)

    this.name = this.constructor.name
    this.code = code || ERR_CODES.ERR_GENERIC
    this._bfxCode = this.code
    this._bfxMessage = this.message

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = UserError
