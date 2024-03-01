/// <reference types="cypress"/>

import '../../support/commands.js'

describe('Testes de serviços Rest com Cypress - getToken e Reset', () =>{
/* Agora, para evitar ficar repetindo o processo de login, vamos criar um comando que realize o processo e
 * o nome do método será getToken. Podemos usar da aula passada o comando para se obter o token que é usado
 * e criar esse novo método no documento commandsContas. Precisamos do usuario que é o email, a senha, e assim
 * ele vai poder verificar se está correto e por fim retornar o token
 * E o token é uma chave que verifica se quem está fazendo a requisição somos nós mesmo, então podemos usar o método
 * da aula passada e criar uma variável que guarde esse valro que não é alterado para o usuário. O valor da
 * aula passada é:
 *             .then(token => {
                cy.request({    url: 'https://barrigarest.wcaquino.me/contas',
                        method: 'POST',
                        headers: {Authorization: `JWT ${token}`},
                        body:{nome:"aaaaa"},
                        })
            }) 
 * Para isso temos que usar uma promise e pedir para que token receba o valor e, ainda criar esse valor na parte
 * do before() para que ele seja executado antes de todos os testes */
    let token

    before(() =>{
        cy.getToken('testeteste@fakegmail.com', '987@SENHA123@')
            .then(tken => {
                token = tken
            })
    })

    beforeEach(() =>{
        cy.resetRest()
    })

    it('getToken', () =>{
        cy.request({    url: '/contas',
            method: 'POST',
            headers: {Authorization: `JWT ${token}`},
            body:{nome:"aaaaa"},
        })
            .as('response');
        
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'aaaaa')
        })
            })

    it('RESET', () =>{
/* Realizar o reset antes de todos os testes serem executados para evitar problemas. Para isso é necessário
 * antes realizar etapa por etapa o caminho para resetar os dados pelo Navegador, usando F12 e observando
 * na parte de internet os pacotes e seus detalhes para compreender como realizar o reset por meio do cypress
 * e aplicando em API. 
 * 
 * Ele reseta os dados e já procura pelo saldo disponível de modo direto. O reset que temos interesse e vamos
 * usar é o que apresenta como Request Method o GET e o status 200. E, foi necessário passar o token para que
 * a API saiba qual é o usuário que deve ser resetado e não todos ou outro aleatório. 
 * 
 * Vamos adicionar o comando de resetar no documento commands.js com o Cypress.Commands.add
 * Esse método não precisa de parâmetros e vamos pegar o token antes de realizar
 *
 * Para checar depois se o reset foi realmente realizado com sucesso, podemos usar o status code para verificar
 * o sucesso do reset da conta, usando o its('status').should('be.equal', 200)
 * 
 * Estamos usando muito a URL nos testes de API, se for necessário algum tipo de manutenção teremos mais trabalho, 
 * de manutenção. Sempre fazemos uma requisição completa, assim, caso seja necessário alterar a URL
 * vamos usar o documento cypress.json e dentro dele, colocar uma propriedade chamada "baseurl" e colocar
 * o caminho principal da URL para que depois seja necessário apenas alterar o valor do recurso, isto é,
 * após a /
 * Não importando mais qual é a base, só o recurso que estamos utilizando */


    })
})
