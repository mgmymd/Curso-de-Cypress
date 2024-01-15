/// <reference types="cypress" />

describe('Words with basic elements', () => {
    /* Agora podemos refatorar os testes da aula passada usando hooks para deixar os testes 
        * mais limpos ao retirar comportamentos repetidos. Ao ser usado dentro do describe, será
        * aplicado para todos os testes presentes nesse grupo.
        * O FOR vai ser o hook mais usado para retirar comportamentos repetidos;
        * Inicialmente temos o cy.visit nos dois testes: vamos usar o visit para todos os testes 
        * desde que não especifiquemos o que queremos acessar. Para isto, vamos colocar o cy.visit
        * dentro do group mas fora do it. Usamos o BEFORE para indicar o hook e dentro vamos colocar
        * a função que será executada */
        before(() => {cy.visit("https://wcaquino.me/cypress/componentes.html")})
    
        /* Com o before é possível ver no Cypress que antes de iniciar os testesm o before all foi executado;
         * No links ele foi diretamente no teste, porque o beforeall já foi executado.
         * O before all é executado uma vez apenas antes de cada teste;
         * Há ainda uma segunda estratégia para executar antes de cada teste, que é usar o beforeEach()
         * No cypress, usando o beforeEach, é possível ver que ele vai visitar a cada teste a página antes
         * de iniciar propriamente. */
         // beforeEach(() => {cy.visit("https://wcaquino.me/cypress/componentes.html")})
    
         /* Podemos também usar o before e o beforeEach em um mesmo grupo. No cenário do curso, ele usa o before
         * para visitar a página apenas 1 vez antes de iniciar todos os testes e, depois um beforeEach 
         * para recarregar a página e não ficar sujeira de um teste para o outro */
         beforeEach(() => {cy.reload()})
    
        it('Text', () =>{
           cy.get('body').should('contain', 'Cuidado')
    
           cy.get('span').should('contain', 'Cuidado')
    
           cy.get('.facilAchar').should('contain', 'Cuidado')
           cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
        })
    
        it('Links', () => {
            cy.get('[href="#"]').click()
            cy.get('#resultado').should('have.text', 'Voltou!')
    
            cy.reload()
            cy.get('#resultado').should('not.have.text','Voltou!')
    
            cy.contains('Voltar').click()
            cy.get('#resultado').should('have.text', 'Voltou!')
        })
    })
    
    describe('Work with basic elements part II', () => {
        before(() => {cy.visit('https://wcaquino.me/cypress/componentes.html')})
        it('Teste externo', () => {
            // Esse bloco, grupo de testes, mostra que o beforeEach usado no grupo acima não interfere no outro grupo
        })
    })
    