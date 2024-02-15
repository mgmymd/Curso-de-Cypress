import loc from './locators'

Cypress.Commands.add('login', (user, psswrd)=>{
    cy.get(loc.LOGIN.USER).type(user);
    cy.get(loc.LOGIN.PASSWORD).type(psswrd);
    cy.get(loc.LOGIN.BTN_LOGIN).click();
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo, Meg!');
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
