// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Ignore certain exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // TODO: Once #280 is resolved, this should be removed
  if (err.message.includes('No project data has been stored')) {
    return false
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
})