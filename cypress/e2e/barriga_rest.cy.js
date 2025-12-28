/// <reference types="cypress" />

import '../support/restCommands'

describe('Barriga Rest API Tests', () => {

    // Variável para armazenar o token de autenticação
    let token 
    // Executa antes de cada teste - Login e obtenção do token
    beforeEach(() => {
        cy.getToken('27@teste.com', '2727')
        .then(tkn => {
            token = tkn
        })
    })

    it.only('Should create an account', () => { //Deve criar uma conta
        cy.request({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta via rest 02'
            }
        }).as('response')
    
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest 02')
        })

    })

    it('Should edit an account', () => { //Deve alterar/editar uma conta existente
    })

    it('Should not create an account with same name', () => { //Não deve criar uma conta com o mesmo nome
    })

    it('Should create a transaction', () => { //Deve criar uma movimentação, transação
    })

    it('Should get balance', () => { //Deve validar o saldo
    })

    it('Should remove a transaction', () => { //Deve remover uma movimentação
    })

})