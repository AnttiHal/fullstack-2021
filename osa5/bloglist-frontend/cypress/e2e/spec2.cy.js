
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Antti Halmetoja',
      username: 'halmis',
      password: 'secretpw'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // ...
      cy.get('#username').type('halmis')
    cy.get('#password').type('secretpw')
    cy.get('#login-button').click()
    cy.contains('Antti Halmetoja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('halis')
    cy.get('#password').type('secrtpw')
    cy.get('#login-button').click()
    cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('halmis')
    cy.get('#password').type('secretpw')
    cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#create-button').click()
      cy.get('#title').type('parhaat ruokaohjeet')
      cy.get('#author').type('henri alen')
      cy.get('#url').type('www.henrialen.fi')
      cy.get('#create-blog-button').click()
      
      cy.contains('parhaat ruokaohjeet henri alen')
    })

    it('user can like a blog', function() {
      cy.get('#create-button').click()
      cy.get('#title').type('parhaat ruokaohjeet')
      cy.get('#author').type('henri alen')
      cy.get('#url').type('www.henrialen.fi')
      cy.get('#create-blog-button').click()
      cy.get('#show-button').click()
      cy.contains('0')
      cy.get('#like-button').click()
      cy.contains('1')
      cy.get('#like-button').click()
      cy.contains('2')
      
      
    })

    it('user can delete a blog', function() {
      cy.get('#create-button').click()
      cy.get('#title').type('parhaat ruokaohjeet')
      cy.get('#author').type('henri alen')
      cy.get('#url').type('www.henrialen.fi')
      cy.get('#create-blog-button').click()
      cy.get('#show-button').click()
      cy.get('#delete-button').click()
      cy.get('#delete-button').should('not.exist'); 
    })

  })
})