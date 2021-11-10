'use strict'

/**
 * User friendly error that is shown directly to endusers
 */
class GrcUserError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} [code] - Optional, error code
   */
  constructor (message, code = null) {
    super(message)

    this.name = this.constructor.name
    this.code = code

    Error.captureStackTrace(this, this.constructor)
  }

  /**
   * This method is called from JSON.stringify function when serializing object
   * @returns {{ message: string, code: number, name: string }}
   */
  toJSON () {
    return {
      name: this.name,
      message: this.message,
      code: this.code
    }
  }
}

module.exports = GrcUserError
