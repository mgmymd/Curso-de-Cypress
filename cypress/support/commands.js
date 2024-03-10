// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) =>{
    cy.get(locator).click();
    cy.on('window:alert', msg=>{
        expect(msg).to.be.equal(message);
    });
})

Cypress.Commands.add('getToken', (user, passwd) =>{
    cy.request({   method: 'POST', 
    url: '/signin', 
    body: {email: user, 
            redirecionar: false, 
            senha:passwd}  })
        .its('body.token').should('not.be.empty')
        .then(token => {
            Cypress.env('token', token)
            return token
        })
})

Cypress.Commands.add('resetRest', () =>{
    cy.getToken('testeteste@fakegmail.com', '987@SENHA123@')
        .then(token =>{
            cy.request({    method: 'GET',
                url: '/reset',
                headers: {Authorization: `JWT ${token}`}
            })
        })
        .its('status').should('be.equal', 200)
} )

Cypress.Commands.add('getContaByName', name =>{
    cy.getToken('testeteste@fakegmail.com', '987@SENHA123@').then(token => {
            cy.request({ method: 'GET',
            url: '/contas',
            headers: {Authorization: `JWT ${token}`},
            qs: {   nome: name  }
        })
    }).then(res => {    return res.body[0].id;  })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) =>{
        if(options.length==1){
            if(Cypress.env('token')){
    //Se encontrar o que está sendo pedido, se exsitir ele adiciona. Se não existir nada é feito.
                options[0].headers ={
                    Authorization: `JWT ${Cypress.env('token')}`
                }
            }
        }
    // E volta para execução original do request
        return originalFn(...options)
    })

Cypress.Commands.add('login', (user, psswrd)=>{
    cy.get(loc.LOGIN.USER).type(user);
    cy.get(loc.LOGIN.PASSWORD).type(psswrd);
    cy.get(loc.LOGIN.BTN_LOGIN).click();
})  

Cypress.Commands.add('resetar', () =>{
    cy.wait(4000);
    cy.get('[data-test=menu-settings]').click();
    cy.get(loc.MENU.RESETAR).click();
    cy.wait(4000);
});

Cypress.Commands.add('acessarMenuContas', () =>{
    cy.get(loc.MENU.SETTINGS).click();
    cy.get(loc.MENU.CONTAS).click();
})

Cypress.Commands.add('inserirConta', conta =>{
    cy.get(loc.CONTAS.NOME).type(conta);
    cy.get(loc.CONTAS.BTN_SETTINGS_CONTAS).click();
})
