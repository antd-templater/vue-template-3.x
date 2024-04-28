import { createPinia, setActivePinia } from 'pinia'
import { mount } from 'cypress/vue'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

beforeEach(() => {
  cy.document().then(() => {
    document.body.style.margin = '0px'
    document.documentElement.style.margin = '0px'
  })

  setActivePinia(createPinia())
})

Cypress.Commands.add('mount', mount)
