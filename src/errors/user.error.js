'use strict'

const { ERR_CODES } = require('../constants')

/**
 * User friendly error that is shown directly to endusers
 */
class UserError extends Error {
  /**
   * @param {string} message - Error message
   * @param {string} [basename] - Optional, error message prefix
   * @param {number} [code] - Optional, error code, default is bfx generic error
   */
  constructor (message, basename = null, code = null) {
    super(basename ? `${basename}: ${message}` : message)

    this.name = this.constructor.name
    this.code = code || ERR_CODES.ERR_GENERIC
    this._bfxCode = this.code
    this._bfxMessage = this.message

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = UserError
