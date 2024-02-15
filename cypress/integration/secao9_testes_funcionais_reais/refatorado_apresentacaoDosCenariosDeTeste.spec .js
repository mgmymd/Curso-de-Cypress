/// <reference types="cypress"/>

import loc from '../../support/locators.js'
import '../../support/commandsContas.js'

describe("REFATORADO/SEGUINDO OS VÍDEOS: Instructions and should test at a functional level the webpage", ()=>{
    before(() => {
        cy.visit("https://barrigareact.wcaquino.me");
        cy.login('testeteste@fakegmail.com', '987@SENHA123@');
        cy.resetar();
    })

    it('Cenário 1: Inserir uma nova conta', () =>{
// Clicar para seguir até a página de contas
        cy.wait(4000);
        cy.acessarMenuContas();
// Inserir uma nova conta
        cy.inserirConta('Nova conta inseridaaaa');
// Validar a inserção correta da conta
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!');
        cy.get(':nth-child(7) > :nth-child(1)').should('contain', 'Nova conta inseridaaaa');
    })

    it("Cenário 2: Alterar conta", () =>{
// Navegando até a página de contas
        cy.acessarMenuContas();
// Selecionando a conta a ser alterada e trocando seu nome
        cy.wait(4000);
        cy.xpath("//table//td[contains(.,'Nova conta inseridaaaa')]/..//i[@class='far fa-edit']").click();
        cy.get(loc.CONTAS.NOME)
                .clear()
                .type("ALTERADOOOOOOO");
        cy.get(loc.CONTAS.BTN_SETTINGS_CONTAS).click();
// Validando se a alteração foi feita com sucesso
        cy.get(loc.MESSAGE).should('exist');
        cy.get(loc.MESSAGE).should('have.text', 'Conta atualizada com sucesso!');
        cy.wait(2000);
        //cy.get(':nth-child(7) > :nth-child(1)').should('have.text', 'ALTERADOOOOOOO');
        cy.xpath("//table//td[contains(.,'ALTERADOOOOOOO')]").should('exist');
    })

    it('Cenário 3: Inserir conta repetida, não deve criar uma conta com o mesmo nome', ()=>{
// Navegando até a página de contas
        cy.acessarMenuContas();
// Tentar inserir uma conta nova
        cy.get(loc.CONTAS.NOME).type('ALTERADOOOOOOO');
        cy.get(loc.CONTAS.BTN_SETTINGS_CONTAS).click();
// Validar mensagem de erro
        cy.get(loc.MESSAGE).should('have.text', 'Erro: Error: Request failed with status code 400');
    })

    it('Cenário 4: Inserir movimentação', ()=>{
        cy.get(loc.MENU.MOVIMENTACAO).click();
// Preenchendo campos
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('AAAAAAAAAAAAAAAAAAAAAA');
        cy.get(loc.MOVIMENTACAO.VALOR).type('123000000');
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('FULANO');
        cy.get(loc.MOVIMENTACAO.BTN_STATUS_CONTA).click();
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR_MOVIMENTACAO).click();
// Validando a mensagem toast que aparece
        cy.get(loc.MESSAGE).should('have.text', 'Movimentação inserida com sucesso!')
// Validando a existência da nova movimentação na tela após carregar
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7);
// Validando com o uso de XPATH
        cy.xpath(loc.EXTRATO.XPATH_EXTRATO).should('exist');
    })

    it('Cenário 5: Consultar o saldo', ()=>{
        cy.get(loc.MENU.HOME).click();


        
    })

    it('Cenário 6', ()=>{

    })
})
