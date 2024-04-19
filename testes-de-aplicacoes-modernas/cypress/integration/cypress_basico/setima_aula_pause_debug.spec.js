/// <reference types="cypress" />

// O pause e o debug podem ajudar durante a execução e pegar mais informações, teste da quinta aula
describe("Cypress basics", () => {
    it('should visit a page and assert title', () => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")

    /* O pause acaba sendo importante, por executar o comando de visit e em seguida pausa a execução até que a
    pessoa volte a executar apertando o botão no cypress;
    * Se pedir para reexecutar, é possível clicar e pedir para que execute linha por linha pelo
    botão de continuidade da execução até finalizar a execução de todos os testes*/
        cy.pause()

    /* Usando o .debug() ao final é possível ver no console do Cypress as informações necessárias:
    * Com o uso do debug na linha 9 é possível ver no console que ele recebe 2 argumentos, o contain e o 'Treinamento
    * Também é possível ver o alvo que era buscado, o Subject, que ele estava trabalhando, nesse caso o Campo de Treinamento */
        cy.title().should('be.equal', 'Campo de Treinamento').debug()
        cy.title().should('contain', 'Treinamento').debug()

    // Podemos também escrever da seguinte maneira, dando um pouco mais de legibilidade:
        cy.title().should('be.equal', 'Campo de Treinamento')
        .and('contain', 'Campo');

    /* Podemos também colocar o debug() logo depois do title() mas haverá uma pequena diferença, por
    * deixar de estar referenciando o should;
    * As diferenças são: não há argumentos recebidos e o Subject é mostrado da maneira correta: Campo de Treinamento 
    * Assim, o uso do debug() acaba sendo bom para conseguir mais detalhes de alguns pontos*/
    cy.title().debug().should('contain', 'Campo')

    })
})
