'use strict'

const test = require('brittle')
const { GrcUserError } = require('../')

test('GrcUserError: it should parse fields properly', (t) => {
  const err = new GrcUserError('invalid user input', 10001)

  t.ok(err instanceof Error)
  t.is(err.name, 'GrcUserError')
  t.is(err.message, 'invalid user input')
  t.is(err.code, 10001)
  t.is(typeof err.stack, 'string')
  t.ok(err.stack.startsWith('GrcUserError: invalid user input'))
  t.ok(err.stack.includes(' at '))
})

test('GrcUserError: it should work also without optional params', (t) => {
  const err = new GrcUserError('invalid user input')

  t.is(err.message, 'invalid user input')
  t.is(err.code, null)
  t.ok(err.stack.startsWith('GrcUserError: invalid user input'))
})

test('GrcUserError: it should serialize only specific fields', (t) => {
  const serialized = JSON.stringify(new GrcUserError('invalid user input', 10001))
  const deserialized = JSON.parse(serialized)
  const expected = {
    name: 'GrcUserError',
    message: 'invalid user input',
    code: 10001
  }

  t.alike(deserialized, expected)
})
