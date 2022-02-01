'use strict'

const GrcUserError = require('./errors/grc.user.error')
const GrcGenericError = require('./errors/grc.generic.error')

/**
 * @callback ErrorCallbackFunction
 * @param {Error} err
 * @returns {void}
 */

/**
 * Error handler utility that is useful for hiding internal errors from endusers
 *
 * @param {Error} err - Original error
 * @param {string} [basename] - Optional, error base message
 * @param {Object} [opts] - Optional, error handling options
 * @param {boolean} [opts.force] - Optional, force original error message
 * @param {ErrorCallbackFunction} cb - Callback function in format: `(err) => void`
 */

const apiErrorHandler = (err, basename, opts, cb) => {
  if (typeof basename === 'function') {
    cb = basename
    basename = null
    opts = { force: false }
  }

  if (typeof opts === 'function') {
    cb = opts
    opts = { force: false }
  }

  console.error(new Date().toISOString(), basename, err)

  if (err instanceof GrcUserError || opts.force) {
    // in case if force flag is used, debugging purposes
    let message = err.message || err.toString()
    const prefix = basename && !message.startsWith(basename) ? `${basename}: ` : ''
    message = prefix + message // wrap error with basename
    const code = err.code || null

    cb(new GrcUserError(message, code))
  } else {
    cb(new GrcGenericError(basename))
  }
}

module.exports = apiErrorHandler
