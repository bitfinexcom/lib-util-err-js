'use strict'

const { apiErrorHandler, GrcUserError, constants: { ERR_CODES } } = require('..')

const err = new Error('ERR_CONNECTION_FAILED')
const userErr = new GrcUserError('ERR_INVALID_CREDENTIALS', 'AUTH_ACTION', ERR_CODES.ERR_AUTH_FAIL)

const cb = (err) => {
  console.error('- Response from action')
  console.error(err)
}

apiErrorHandler(err, 'AUTH_FUNCTION', cb)
apiErrorHandler(userErr, 'AUTH_FUNC', cb)
