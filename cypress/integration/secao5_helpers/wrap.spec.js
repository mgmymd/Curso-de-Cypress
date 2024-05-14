/// <reference types="cypress"/>

describe('Helpers', () =>{
    before(() => { cy.visit("https://wcaquino.me/cypress/componentes.html") })
    beforeEach(() => { cy.reload() })

/* O método WRAP é capaz de encapsular um objeto comum e permite com que a API do cypress use*/
    it('WRAP I', () =>{
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome') //assertiva do objeto

/* Para fazer uma assertiva usando o should no padrão do cypress não pode fazer de forma direta, precisa
 * usar o wrap, o should não é do obj mas da API do Cypress*/
        cy.wrap(obj).should('have.property', 'nome')

/* Agora a aplicação buscando algo: */
        //cy.get('#formNome').type('Funciona')
/* Buscando algo dentro de uma promise: */
        cy.get('#formNome').then($element => {
            $element.val('Funciona via JQUERY dessa maneira') })
/* Se não fizer via JQUERY, mas via CYPRESS por ação monitorada com o WRAP
 * Lembrando de apagar com clear() o campo que anteriormente foi escrito */
        cy.get('#formNome').clear().then($element => {
            cy.wrap($element).type('Funcionando via Cypress agora') })
    })

    it('WRAP II', () => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(()=> {
                resolve(10)
            }, 500)
        })
/* E agora fazer uma busca por um botão para colocar dentro de uma promise e entender o uso do wrap.
 * Agora no meio das duas buscas vamos colocar a promise para executar no meio dos dois métodos
 * A promise vai ser executa antes das duas buscas por ser normalmente difícil de ser sincronizada, mas
 * se for gerenciada pelo cypress é melhor, sem usar should etc
 * Na segunda tentativa é usado o cypress para gerenciar a promise e imprimir entre os dois comandos */
        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        // promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(()=> console.log('Encontrei o segundo botão'))

/* Mesmo dando um wrap em 1, conseguimos com o then comparar com o 2 devido a existência do retorno
 * se estivesse usando um should a comparação não seria possível de ser feita */
        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
    })

    it('Its - I', () => {
/* Esse método pega a propriedade um objeto, apenas 1 por exemplo e realiza a assertiva diretamente nela*/
        const obj = {nome: 'User', idade: 20}
        cy.wrap(obj).should('have.property','nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

/* Também podemos encadear os ITS, como no exemplo abaixo em que é usado um objeto dentro de um objeto, 
 * o endereço é um objeto novo.
 * O Its, como o should, fica tentando, repetindo a ação até encontrar, então na linha 63 há uma forma
 * melhor de resolver, usar o ITS encadeado. */
        const object2 = {nome:'User', idade: 20, endereco:{rua:'rua dos bobos', numero:1, bairro:'perdido'}}
        cy.wrap(object2).its('endereco').should('have.property','rua')
        cy.wrap(object2).its('endereco').its('rua').should('contain', 'bobos')
        cy.wrap(object2).its('endereco.rua').should('contain','bobos')
    })

    it('Its - II', () => {
/* Agora, vamos pegar o título da página que é uma string, e as strings apresentam a propriedade de length */
        cy.title().its('length').should('be.equal', 20)
    })
})
