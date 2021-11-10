'use strict'

const GrcUserError = require('./grc.user.error')

/**
 * Generic api error, useful for hiding errors like connection failures
 */
class GrcGenericError extends GrcUserError {
  /**
   * @param {string} [basename] - Optional, error message prefix
   */
  constructor (basename = null) {
    super((basename ? `${basename}: ` : '') + 'generic error')

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = GrcGenericError
