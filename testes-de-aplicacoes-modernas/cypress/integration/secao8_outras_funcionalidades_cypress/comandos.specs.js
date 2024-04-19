/// <reference types="cypress"/>

describe("Outras funcionalidades do cypress", () =>{
    before(()=>{    cy.visit("https://wcaquino.me/cypress/componentes.html");   });
    beforeEach(()=>{    cy.reload() });

    it("Comandos", ()=>{
/* Queremos criar um comando que encapsule todo o abaixo, que é usado em alerts
        cy.get('#alert').click();
        cy.on('window:alert', msg=>{
            console.log(msg);
            expect(msg).to.be.equal('Alert Simples');
        }); 
 * Podemos fazer isso no arquivo commands.jr que está na pasta de support.
 * A primeira parte será: Cypress.Commands.add('NOME DO COMANDO', (locator, message)=>{
 *          cy.get(locator).click();
        cy.on('window:alert', msg=>{
            expect(msg).to.be.equal(message);
        }); 
 * })
 * Mas vamos precisar parametrizar esse comando, não deixar mais fixo, então usamos o locator e o mesage
 * Não precisamos importar nada, o arquivo Commands já vem importado automaticamente */
        cy.clickAlert('#alert', 'Alert Simples');
    })
})
