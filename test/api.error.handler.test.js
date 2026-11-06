'use strict'

const test = require('brittle')
const { format } = require('util')
const { GrcGenericError, GrcUserError, apiErrorHandler } = require('../')

// Captures console.error output for the test and restores it afterwards
const stubConsoleError = (t) => {
  const logs = []
  const original = console.error
  console.error = (...params) => logs.push(format(...params))
  t.teardown(() => { console.error = original })
  return logs
}

test('it should hide original error message in case if it\'s not instance of GrcUserError', (t) => {
  t.plan(3)
  stubConsoleError(t)
  apiErrorHandler(new Error('Critical error in db'), 'MY_FUNCTION', {}, (err) => {
    t.ok(err instanceof GrcGenericError)
    t.is(err.message, 'MY_FUNCTION: generic error')
    t.is(err.code, null)
  })
})

test('it should return original error message in case if it\'s instance of GrcUserError', (t) => {
  t.plan(3)
  stubConsoleError(t)
  apiErrorHandler(new GrcUserError('invalid field', 10001), 'MY_FUNCTION', {}, (err) => {
    t.ok(err instanceof GrcUserError)
    t.is(err.message, 'MY_FUNCTION: invalid field')
    t.is(err.code, 10001)
  })
})

test('it should return original error message in case if it has force flag', (t) => {
  t.plan(3)
  stubConsoleError(t)
  apiErrorHandler(new Error('Critical error in db'), 'MY_FUNCTION', { force: true }, (err) => {
    t.ok(err instanceof GrcUserError)
    t.is(err.message, 'MY_FUNCTION: Critical error in db')
    t.is(err.code, null) // since it's missing add default one!
  })
})

test('it should work without optional params', (t) => {
  t.plan(3)
  stubConsoleError(t)
  apiErrorHandler(new Error('Critical error in db'), (err) => {
    t.ok(err instanceof GrcGenericError)
    t.is(err.message, 'generic error')
    t.is(err.code, null)
  })
})

test('it should work without opts param', (t) => {
  t.plan(3)
  stubConsoleError(t)
  apiErrorHandler(new Error('Critical error in db'), 'MY_FUNCTION', (err) => {
    t.ok(err instanceof GrcGenericError)
    t.is(err.message, 'MY_FUNCTION: generic error')
    t.is(err.code, null)
  })
})

test('it should always log original error', (t) => {
  t.plan(2)
  const logs = stubConsoleError(t)
  apiErrorHandler(new GrcUserError('invalid field', 10001), () => {
    t.is(logs.length, 1)
    t.ok(logs[0].includes('GrcUserError: invalid field'))
  })
})

test('it should use toString method when error does not have message field', (t) => {
  t.plan(3)
  stubConsoleError(t)
  apiErrorHandler('Critical error in db', 'MY_FUNCTION', { force: true }, (err) => {
    t.ok(err instanceof GrcUserError)
    t.is(err.message, 'MY_FUNCTION: Critical error in db')
    t.is(err.code, null)
  })
})

test('it should avoid adding prefix more than once', (t) => {
  t.plan(3)
  stubConsoleError(t)
  apiErrorHandler(new GrcUserError('MY_FUNCTION: invalid field'), 'MY_FUNCTION', (err) => {
    t.ok(err instanceof GrcUserError)
    t.is(err.message, 'MY_FUNCTION: invalid field')
    t.is(err.code, null)
  })
})
