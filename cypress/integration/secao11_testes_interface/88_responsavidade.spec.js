///<reference types="cypress"/>

import '../../support/commands.js'
import loc from '../../support/locators.js'

describe('Front end', () =>{
    before(()=>{
        cy.visit('https://barrigareact.wcaquino.me')
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: { id: 1000, nome: 'usuario falso',token: 'String token falso'}
            }).as('signin')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response:[{"conta_id": 666,"conta": "Carteira",  "saldo": "1000"},
                    { "conta_id": 999, "conta": "Banco",  "saldo": "1000000000000000000"}
            ]
        }).as('saldo')

        cy.login('fake@email', 'senhaErrada')})

    beforeEach(() =>{cy.get(loc.MENU.HOME).click()})

    after(() =>{cy.clearLocalStorage(); })

/* Quanto tempo leva para ajustar e responder de acordo com o tamanho da tela, verificando quais
 * ícones estão ou não aparecendo mais ou voltando a aparecer; */
    it('Should test the responsiveness', () =>{
        cy.server()
        cy.get('[data-test=menu-home]').should('exist').and('be.visible');
//Trocar o tamanho da tela com o comando viewport, passando a largura e altura da tela desejada
        cy.viewport(500, 700)
// Deve existir mas não deve ser visível
        cy.get('[data-test=menu-home]').should('exist').and('not.be.visible');
// Na documentação há alguns valores já indicados para celulares e notebooks específicos
        cy.viewport('iphone-x');
        cy.get('[data-test=menu-home]').should('exist').and('not.be.visible');
//Para o samsung
        cy.viewport('samsung-note9');
        cy.get('[data-test=menu-home]').should('exist').and('not.be.visible');
    })
})
