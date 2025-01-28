describe('Homepage Tests', () => {
  beforeEach(() => {
    cy.login('tester17@dnc.com.br', '32212546xD%')
    cy.visit('http://localhost:5173/home')
  })

  it('should display total sales', () => {
    cy.get('#total-sales').should('be.visible')
  })

  it('should display month goals', () => {
    cy.get('#month-goals').should('be.visible')
  })

  it('should display total leads', () => {
    cy.get('#total-leads').should('be.visible')
  })

  it('should display month sales chart', () => {
    cy.get('#month-sales-chart').should('be.visible')
  })

  it('should display sales stars', () => {
    cy.get('#sales-stars').should('be.visible')
  })

  it('should display news', () => {
    cy.get('#news').should('be.visible')
  })

  it('should display year sales chart', () => {
    cy.get('#year-sales-chart').should('be.visible')
  })

})