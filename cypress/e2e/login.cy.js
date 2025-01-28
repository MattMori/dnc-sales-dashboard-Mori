describe('Login flow correct credentials', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('should display login form', () => {
    cy.get('form').should('be.visible')
  })

  it('should login with valid credentials', () => {
    cy.get('input[type="email"]').type('tester17@dnc.com.br')
    cy.get('input[type="password"]').type('32212546xD%')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/home')
    cy.get('header').should('be.visible')
  })
})

describe('Login flow invalid credentials', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('should display login form', () => {
    cy.get('form').should('be.visible')
  })


  it('should show error message with invalid credentials', () => {
    cy.get('input[type="email"]').type('usuario@invalido.com')
    cy.get('input[type="password"]').type('32212546xD%')
    cy.get('button[type="submit"]').click()

    cy.contains('Usuário ou senha inválidos').should('be.visible')
  })
})