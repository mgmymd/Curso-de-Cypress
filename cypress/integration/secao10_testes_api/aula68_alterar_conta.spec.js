/// <reference types="Cypress" />

import '../../support/commands.js'

describe('Testes de serviços Rest com Cypress - API', () =>{
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

    
})
