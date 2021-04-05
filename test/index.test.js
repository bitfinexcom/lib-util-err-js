'use strict'

/* eslint-env mocha */

const userErrorTests = require('./user.error.test')
const genericErrorTests = require('./generic.error.test')
const apiErrorHandlerTests = require('./api.error.handler.test')

describe('Unit tests', () => {
  userErrorTests()
  genericErrorTests()
  apiErrorHandlerTests()
})
