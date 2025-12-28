/// <reference types="cypress" />

import '../support/restCommands'

describe('Barriga Rest API Tests', () => {

    // Variável para armazenar o token de autenticação
    let token 
    // Executa antes de cada teste - Login e obtenção do token
    before(() => {
        cy.getToken('27@teste.com', '2727')
        .then(tkn => {
            token = tkn
        }) 
        
         cy.resetRest()
    })

    it('Should create an account', () => { //Deve criar uma conta
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta via rest 02'
            }
        }).as('response')
    
        cy.get('@response').then(response => {
            expect(response.status).to.be.equal(201)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('nome', 'Conta via rest 02')
        })
    })

    it('Should update an account', () => { //Deve atualizar uma conta existente
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}`},
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(response => {
            cy.request({
                url: `/contas/${response.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}`},
                body: {
                    nome: 'Conta alterada via rest'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Should not create an account with same name', () => { //Não deve criar uma conta com o mesmo nome
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')
    
        cy.get('@response').then(response => {
            expect(response.status).to.be.equal(400)
            expect(response.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it.only('Should create a transaction', () => { //Deve criar uma movimentação, transação
        cy.getAccountByName('Conta para movimentacoes')
            .then(accountID => {
                const dataAtual = new Date().toLocaleDateString('pt-BR')
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}`},
                    body:{
                        conta_id: accountID,
                        data_pagamento: dataAtual,
                        data_transacao: dataAtual,
                        descricao: "desc teste",
                        envolvido: "nubank",
                        status: true,
                        tipo: "REC",
                        valor: "150",
                    }
                }).as('response')
            })

            cy.get('@response').its('status').should('be.equal', 201)
            cy.get('@response').its('body.id').should('exist', )

    })

    it('Should get balance', () => { //Deve validar o saldo
    })

    it('Should remove a transaction', () => { //Deve remover uma movimentação
    })

})