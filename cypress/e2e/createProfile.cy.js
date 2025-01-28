
describe('check if create Profile page renders the correct components', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/cadastro')
  })

  it('should steps 1 and 2 works', () => {
    cy.get('input[type="text"]').type('Teste Cypress')
    cy.get('input[type="email"]').type('Tester@Cypress.com')
    cy.get('input[type="tel"]').type('123456789')
    cy.get('button[type="submit"]').click()
    cy.get('input[type="password"]').type('32212546xD%')
    cy.get('button[type="submit"]').should('be.visible')

  })

})
