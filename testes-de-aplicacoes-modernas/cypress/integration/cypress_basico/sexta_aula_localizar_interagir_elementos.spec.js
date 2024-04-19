/// <reference types="cypress" />

// Sexta aula: Localizar e interagir com elemento
describe("Cypress basics", () => {
    it('Should find and interact with an element', () => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")

/* Precisamos apontar para o botão e indicar o que ele precisa fazer com esse botão, no momento
será usado apenas o botão que já vem com o Cypress, clicando no Open Selector Playground;
    - Procurar o elemento: vai estar selecionando o elemento quando passar o cursos por cima
    - Ao clicar no elemento desejado, ele vai dar uma sugestão de como procurar, localizar, o elemento */
    cy.get('#buttonSimple')
// Se fizer uma busca por um elemento que não existir, ao usar o cy.get ele não vai encontrar
    //cy.get('#naoexiste')

// Pedir agora para clicar nesse botão que foi localizado e encontrado
    cy.get('#buttonSimple').click()

/* Essa execução na interface do Cypress mostra a ordem a execução, iniciada pelo "visit", indo para get e depois click
    * Quando clicamos no botão que seria o #buttonSimple, podemos ver na parte de baixo um before e after,
que indicam o que aconteceu depois de clicar no botão e o que era disponibilizado antes de clicar
    * Ou seja, após clicar no botão ele apareceu um "Obrigado!" 

    * Criar agora a assertiva, o que era esperado de ocorrer após clicar? Podemos clicar no botão
    * de selecionar e observar no html o valor que havia antes e depois */
    cy.get('#buttonSimple').should('have.value', 'Obrigado!')
    cy.get('#buttonSimple').click().should('have.value','Obrigado!')
    })

})
