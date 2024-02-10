/// <reference types="cypress"/>

import loc from '../../support/locators.js'

describe("REFATORADO: Instructions and should test at a functional level the webpage", ()=>{
    before(() => {  
        cy.visit("https://barrigareact.wcaquino.me");
// Página inicial, realizando o login
        cy.get(loc.LOGIN.USER).type("testeteste@fakegmail.com");
        cy.get(loc.LOGIN.PASSWORD).type("987@SENHA123@");
        cy.get(loc.LOGIN.BTN_LOGIN).click();
// Irá aparecer um toast dizendo "Bem vindo, Meg" e usaremos para verificar se foi feito um login de erro ou de sucesso
        cy.get(loc.MESSAGE).should('exist');
        cy.get(loc.MESSAGE).should('contain', 'Bem vindo, Meg!');
// Apenas para resetar os dados esta primeira vez
        cy.wait(4000);
        cy.get('[data-test=menu-settings]').click();
        cy.get(loc.MENU.RESETAR).click();
        cy.wait(4000);
    })

    it('Cenário 1: Inserir uma nova conta', () =>{
// Clicar para seguir até a página de contas
        cy.wait(4000);
        cy.get(loc.MENU.SETTINGS).click();
        cy.get(loc.MENU.CONTAS).click();
// Inserir uma nova conta
        cy.get(loc.CONTAS.NOME).type('Nova conta inseridaaaa');
        cy.get(loc.CONTAS.BTN_SETTINGS_CONTAS).click();
// Validar a inserção correta da conta
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!');
        cy.get(':nth-child(7) > :nth-child(1)').should('contain', 'Nova conta inseridaaaa');
    })

    it("Cenário 2: Alterar conta", () =>{
// Navegando até a página de contas
        cy.wait(4000);
        cy.get(loc.MENU.SETTINGS).click();
        cy.get(loc.MENU.CONTAS).click();
// Selecionando a conta a ser alterada e trocando seu nome
        cy.wait(4000);
        cy.xpath("//table//td[contains(.,'Nova conta inseridaaaa')]/..//i[@class='far fa-edit']").click();
        cy.get(loc.CONTAS.NOME)
                .clear()
                .type("ALTERADOOOOOOO");
        cy.get(loc.CONTAS.BTN_SETTINGS_CONTAS).click();
// Validando se a alteração foi feita com sucesso
        cy.get(loc.MESSAGE).should('exist');
        cy.get(loc.MESSAGE).should('have.text', 'Conta atualizada com sucesso!')
        cy.wait(2000)
        //cy.get(':nth-child(7) > :nth-child(1)').should('have.text', 'ALTERADOOOOOOO');
        cy.xpath("//table//td[contains(.,'ALTERADOOOOOOO')]").should('exist');
    })
})
