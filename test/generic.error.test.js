'use strict'

const test = require('brittle')
const { GrcGenericError } = require('../')

test('GenericError: it should parse fields properly', (t) => {
  const err = new GrcGenericError('MY_FUNCTION')
  t.ok(err instanceof Error)
  t.is(err.name, 'GrcGenericError')
  t.is(err.message, 'MY_FUNCTION: generic error')
  t.is(err.code, null)
  t.is(typeof err.stack, 'string')
  t.ok(err.stack.startsWith('GrcGenericError: MY_FUNCTION: generic error'))
  t.ok(err.stack.includes(' at '))
})

test('GenericError: it should work also without optional params', (t) => {
  const err = new GrcGenericError()

  t.is(err.message, 'generic error')
  t.is(err.code, null)
  t.ok(err.stack.startsWith('GrcGenericError: generic error'))
})

test('GenericError: it should serialize only specific fields', (t) => {
  const serialized = JSON.stringify(new GrcGenericError('MY_FUNC'))
  const deserialized = JSON.parse(serialized)
  const expected = {
    name: 'GrcGenericError',
    message: 'MY_FUNC: generic error',
    code: null
  }

  t.alike(deserialized, expected)
})
