/// <reference types="cypress" />

///<reference types="cypress"/>

import '../../support/commands.js'
import loc from '../../support/locators.js'
import buildEnv from '../../support/buildEnv.js'

describe('Testes mockados do frontend - Gerenciamento de massas', ()=>{
    before(()=>{
/* Em suporte, criamos um arquivo chamado buildEnv.js e definir uma constante chamada buildEnv, e nesse
 * arquivo/constante vamos definir as principais rotas que poderão ser aproveitadas em todos os testes.
 * Podemos colocar a lista inicial de login, desde o cy.server até o final do login.
 * Será levado também para esse documento o cenário de listar as contas iniciais. 
 * Rotas específicas de testes não serão refatoradas e sim mantidas para cada caso*/

        cy.visit('https://barrigareact.wcaquino.me');
        buildEnv()
        cy.login('fake@email', 'senhaErrada');  })

    beforeEach(() =>{   cy.get(loc.MENU.HOME).click();   })

    after(() =>{    cy.clearLocalStorage(); })

    it('Cenário 1: Inserir conta', () => {
        cy.server();
            cy.route({
                method:'POST',
                 url: '/contas',
                 response:[{"id":3, "nome":"Conta de teste", "visivel":true, "usuario_id":3}]
            }).as('salvar conta');

    // Clicar para seguir até a página de contas
        cy.wait(4000);
        cy.acessarMenuContas();

    // Redefinindo para que possa ser apresentado na interface gráfica a presença desta terceira conta:
        cy.route({
            method:'GET',
            url: '/contas',
            response:[{"id": 1, "nome": "Carteira",  "visivel": true, "usuario_id": 1},
                    {"id": 2, "nome": "Banco", "visivel": true, "usuario_id": 2},
                {"id": 3, "nome": "Conta de teste", "visivel": true, "usuario_id": 3}]
            }).as('contasSave');

    // Inserir uma nova conta
        cy.inserirConta('Conta de teste');

    // Validar a inserção correta da conta
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!');
    })

    it('Cenário 2: Alterar conta', () =>{
        cy.server()
        cy.route({
            method:'GET',
            url: '/contas',
            response:[{ "id": 1,"nome": "Carteira","visivel": true,"usuario_id": 1},
                    {"id": 2,"nome": "Banco","visivel": true,"usuario_id": 2}]
            }).as('contas');

        cy.route({
            method:'PUT',
            url:'/contas/1',
            response: {"id":1,"nome":"Conta de teste","visivel":true,"usuario_id":1}
            })
        
    // Navegando até a página de contas
    cy.acessarMenuContas();

    // Selecionando a conta a ser alterada e trocando seu nome
            cy.wait(4000);
            cy.xpath("//table//td[contains(.,'Carteira')]/..//i[@class='far fa-edit']").click();
            cy.get(loc.CONTAS.NOME)
                    .clear()
                    .type("Carteira");
            cy.get(loc.CONTAS.BTN_SETTINGS_CONTAS).click();

    // Validando se a alteração foi feita com sucesso
            cy.get(loc.MESSAGE).should('exist');
            cy.get(loc.MESSAGE).should('have.text', 'Conta atualizada com sucesso!'); 
    })

    it('Cenário 3: Não deve ser possível inserir uma conta repetida, com o mesmo nome de outra já existente', () =>{
/*  No navegador vamos simular a interação de tentar inserir uma conta com o mesmo nome de uma já
 * cadastrada. Observar o pacote que informa o erro, de método PUT e status code 400, bad request,
 * com resposta {"error":"Já existe uma conta com esse nome!"}; 
 * Está esperando um statuscode 400, colocamos como sendo um novo parâmetro que é o esperado o 400
 * fazendo com que o teste passe e o erro deixe de ser apresentado ou a mensagem de sucesso;    */
        cy.route({
            method:'PUT',
            url:'/contas',
            response: {"error":"Já existe uma conta com esse nome!"},
            status: 400
            }).as('sabeContaMesmoNome')

    // Preparando o ambiente
        cy.acessarMenuContas();
    // Navegando até a página de contas
        cy.get(loc.MENU.HOME);
        cy.acessarMenuContas();
    // Tentar inserir uma conta nova que tenha o nome de outra já existente
        cy.get(loc.CONTAS.NOME).type('Banco');
        cy.get(loc.CONTAS.BTN_SETTINGS_CONTAS).click();
    // Validar mensagem de erro
        cy.get(loc.MESSAGE).should('contain', 'Request failed');
    })

    it('Cenário 4: Inserir movimentação', ()=>{
/* No navegador vamos realizar manualmente o caminho, inserir uma movimentação nova e observar os pacotes;
 * Iniciando pela inserção de transações, será um post, com id */
        cy.server()
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {    "id": 1929914,
            "descricao": "AAAAAAAAA",
            "envolvido": "Fulano",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-03-10T03:00:00.000Z",
            "data_pagamento": "2024-03-10T03:00:00.000Z",
            "valor": "123000000.00",
            "status": true,
            "conta_id": 2056535,
            "usuario_id": 47637,
            "transferencia_id": null,
            "parcelamento_id": null}
        })

        cy.get(loc.MENU.MOVIMENTACAO).click();
// Preenchendo campos
        cy.wait(2000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('AAAAAAA');
        cy.get(loc.MOVIMENTACAO.VALOR).type('123000000');
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('FULANO');
        cy.get(loc.MOVIMENTACAO.BTN_STATUS_CONTA).click();
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOVIMENTACAO).click();
// Validando a mensagem toast que aparece
        cy.get(loc.MESSAGE).should('have.text', 'Movimentação inserida com sucesso!')
/* No buildEnv vamos colocar o método de GET que é recebido após um tempo, e algumas das contas. 
 * Mas há um problems relativo a quantidade de linhas que será checado do teste inicial e depois de,
 * feito será uma conta a meos se for corretamente. Sendo necessário detalhar mais para algo exclusivo da rota
 * Nas fixtures vamos colocar a resposta que deveria conter no cy.route abaixo:
 * [{    "conta": "Conta para movimentacoes", "id": 1927821, 
                        "descricao": "Movimentacao para exclusao", "envolvido": "AAA",  "observacao": null, "tipo": "DESP", "data_transacao": "2024-03-07T03:00:00.000Z",
                        "data_pagamento": "2024-03-07T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 2056537, "usuario_id": 47637, "transferencia_id": null, "parcelamento_id": null },
                    {    "conta": "Conta com movimentacao", "id": 1927822,
                        "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP",
                        "data_transacao": "2024-03-07T03:00:00.000Z", "data_pagamento": "2024-03-07T03:00:00.000Z", "valor": "-1500.00","status": true,  "conta_id": 2056538,  "usuario_id": 47637,
                        "transferencia_id": null, "parcelamento_id": null},
                    {    "conta": "Conta para saldo",
                        "id": 1927823, "descricao": "Movimentacao 1, calculo saldo",  "envolvido": "CCC", "observacao": null,
                        "tipo": "REC",  "data_transacao": "2024-03-07T03:00:00.000Z",  "data_pagamento": "2024-03-07T03:00:00.000Z", "valor": "3500.00",
                        "status": false, "conta_id": 2056539, "usuario_id": 47637, "transferencia_id": null, "parcelamento_id": null    }]
                        
 * Para reduzir o tamanho do código. O arquivo em que o código acima deverá constar, deve ser criado
 * dentro da pasta de fixtures com o nome movimentacaoSalva.json */

        cy.route({
            method: 'GET',
            url: '/extrato',
            response: 'fixture:movimentacaoSalva.json'
        })

// Validando a existência da nova movimentação na tela após carregar
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 3);
// Validando com o uso de XPATH
        cy.xpath(loc.EXTRATO.XPATH_EXTRATO('AAAAAAAAAAAAAAAAAAAAAA', '123')).should('exist');
    })

    it.only('Cenário 5: Consultar o saldo', ()=>{
        cy.get(loc.MENU.HOME).click();
        cy.wait(2000)
/* */


        cy.xpath(loc.SALDO.FN_XPATH_SALDO_CONTA('Conta para movimentacoes'))
                .should('contain', '1.500,00');
    })

    it('Cenário 6: Remover movimentação', ()=>{
        cy.get(loc.MENU.EXTRATO).click();
/*  */


        cy.xpath(loc.EXTRATO.FN_XPATH_REMOVER_ELEMENTO('AAAAAAAAAAAAAAAAAAAAAA')).click();
        cy.get(loc.MESSAGE).should('have.text', 'Movimentação removida com sucesso!')
    })
})
