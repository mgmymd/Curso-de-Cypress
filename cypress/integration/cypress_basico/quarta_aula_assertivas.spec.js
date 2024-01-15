/// <reference types="cypress" />

describe("Cypress basics", () => {
    it('should visit a page and assert title', () => {
    // Vai acessar essa página: https://wcaquino.me/cypress/componentes.html e realizar a assertiva do título
    /* Todo arquivo de testes do cypress já tem uma variável chamada "cy" que será usada em todos os
    testes, ela tem uma API que serve para fazer os testes a partir dela;
    * Nesse exemplo abaixo, com o uso do visit, ela vai acessar a página em html indicada */  
        cy.visit("https://wcaquino.me/cypress/componentes.html")

    /* O título será buscado de forma assíncrona e o chainer é encadeado, vamos encadear a próxima 
    ação que queremos realizar com o título, que seria a verificação;
    * através do should que vamos fazer as assertivas, como se o título é igual a alguma coisa;
    * O title seria o texto que aparece na barra do navegador;
    * Os erros podem levar um tempo para serem mostrados, ele vai ficar tentando e tentando até
    * conseguir alcançar algo, há algumas retentativas; 
    * Se a execução for correta ele vai realizar rapidamente*/
        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Treinamento');
    // Podemos também escrever da seguinte maneira, dando um pouco mais de legibilidade:
        cy.title().should('be.equal', 'Campo de Treinamento')
        .and('contain', 'Campo');
    })
    
})
