'use strict'

const { ERR_CODES } = require('../constants')
const UserError = require('./user.error')

/**
 * Generic api error, useful for hiding errors like connection failures
 */
class GenericError extends UserError {
  /**
   * @param {string} [basename] - Optional, error message prefix
   */
  constructor (basename = null) {
    super('generic error', basename, ERR_CODES.ERR_GENERIC)

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = GenericError
