/// <reference types="cypress"/>

import '../../support/commands.js'

describe('Testes de serviços REST', () =>{
    before(() =>{   cy.getToken('testeteste@fakegmail.com', '987@SENHA123@')    })
    beforeEach(() =>{   cy.resetRest()     })

    it('Cenário 1: Inserir uma nova conta', () =>{
/* Refatoração e sobreescrever os métodos, nesse capítulo será do método cy.request. Queremos que o request
 * seja capaz de adicionar automaticamente o token sem a necessidade de manter a adição do token separada como
 * uma variável global da forma que estávamos fazendo até o momento. Para isso vamos alterar inicialmente o 
 * método getToken do documento commands.js, para além de retornar o token, dar o comportamento extra de uma
 *  variável chamada token e seu valor seja o token que acabou de ser recebido.
 * 
 * Agora, criar um método que vai sobreescrever o request, no mesmo arquivo de commands.js, vamos usar
 * o Cypress.Commands.overwrite('request') para realizar a sobreescrita do comando request, passar os parâmetros
 * que virão através das ...options. O cypress, no método request, apresenta várias formas de receber 
 * parâmetros, foi trabalhado o modo de receber um objeto que recebe as options que precisamos, então vamos
 * criar um método que cheque a quantidade de options.
 * Vamos colocar options[0] para pegar o objeto e adicionar uma propriedade que vai ser o Authorization = `JWT ${token}`
 * dentro dos cabeçalhos e depois vamos retornar a execução da função original e suas options.
 * 
 * Mas nenhum teste executará com o token no cabeçalho do que está sendo enviado.
 */
        cy.request({   method: 'POST', 
                url: 'https://barrigarest.wcaquino.me/signin', 
                body: {email: "testeteste@fakegmail.com", 
                        redirecionar: false, 
                        senha:"987@SENHA123@"}  })
            .its('body.token').should('not.be.empty')
            .then(token => {
        cy.request({    url: '/contas',
                method: 'POST',
                body:{nome:"aaaaa"},
                })
            .as('response');
        })

        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'aaaaa')
        });
    })

    it('Alterar conta', () => {
        cy.request({ method: 'GET',
                    url: '/contas',
                    qs: {   nome: 'Conta para alterar'  }
                }).then(res => cy.request({ url: `/contas/${res.body[0].id}`,
                                            method: 'PUT',
                                            body:{    nome: 'Conta alterada'   }})
                .as('response'))
        
        cy.get('@response').its('status').should('be.equal', 200)
    });
        
    it('Inserir conta repetida', () =>{
        cy.request({    url: '/contas',
                    method: 'POST',
                    body:{nome:"Conta mesmo nome"},
                    failOnStatusCode: false
                    })
                .as('response');

        cy.get('@response').then(res =>{
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.have.equal('Já existe uma conta com esse nome!')
                });
            })
        
    it('Inserir movimentação', () =>{
        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {
                cy.request({    method: 'POST',
                url: '/transacoes',
                body: {
                        conta_id: contaId,
                        data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                        data_transacao: Cypress.moment().add().format('DD/MM/YYYY'),
                        descricao:"qualquer",
                        envolvido:"Fulano",
                        status: true,
                        tipo:"REC",
                        valor:"123"
                    }  
            }).as('response')
        });
        
        cy.get('@response').its('status').should('be.equal', 201);
        cy.get('@response').its('body.id').should('exist');
    })
})
