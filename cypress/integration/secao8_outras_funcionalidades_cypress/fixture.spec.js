///<reference types="cypress"/>

describe("Outras funcionalidades do Cypress", ()=>{
    before(()=>{    cy.visit("https://wcaquino.me/cypress/componentes.html");   })
    beforeEach(()=>{    cy.reload() })

    it("FIXTURE", () => {
/* Usar dados externos para povoar nossos testes com o uso de fixtures. Há uma pasta chamada fixture */

    })
})
