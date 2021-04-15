'use strict'

const { ERR_CODES, GRC_ERR_TAG } = require('../constants')

/**
 * User friendly error that is shown directly to endusers
 */
class GrcUserError extends Error {
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

  /**
   * This method is called from JSON.stringify function when serializing object
   * @returns {{ message: string, code: number, name: string }}
   */
  toJSON () {
    return {
      message: this.message,
      code: this.code,
      grctag: GRC_ERR_TAG
    }
  }

  /**
   * Useful to determine if deserialized object could be parsed to GrcUserError
   * @param {object} err
   * @returns {boolean}
   */
  static hasUserErrorSignature (err) {
    return err instanceof GrcUserError ||
      (typeof err === 'object' && err.grctag === GRC_ERR_TAG &&
        err.message && typeof err.message === 'string' &&
        err.code && typeof err.code === 'number')
  }
}

module.exports = GrcUserError
