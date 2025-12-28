// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getToken', (user, passwd) => {
    // Fazendo login na aplicação e validando se o token não está vazio
        cy.request({
            method: 'POST',
            url: '/signin',
            body: {
                email: user,
                redirecionar: false,
                senha: passwd
            }
        }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
        })
})

Cypress.Commands.add('resetRest', () => {
    // Resetando o banco de dados via API
    cy.getToken('27@teste.com', '2727')
        .then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}`},
        }).its('status').should('be.equal', 200)        
    })
})

Cypress.Commands.add('getAccountByName', name => {
    // Obter conta por nome
    cy.getToken('27@teste.com', '2727')
        .then(token => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            qs: {
                nome: name
            }
        }).then(response => {
            return response.body[0].id
        })    
    })
})