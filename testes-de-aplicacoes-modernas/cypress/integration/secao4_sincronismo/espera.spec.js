/// <reference types='cypress'/>

describe('Sincronismo', () => {
    // Preparo dos ambientes dos testes
    before(() => { cy.visit("https://wcaquino.me/cypress/componentes.html") })
    beforeEach(() => { cy.reload() })

    it('19-Espera, Must wait for the element be avalable', () => {
    /* Nesse exemplo vamos apenas clicar no botão e esperar aparecer o campo após alguns minutos.
     * Nesse caso ocorreu de forma automática o clique e a espera até encontrar o novo campo para que
     * fosse possível escrever o funciona neste novo campo. O Cypress fica procurando esse elemento, 
     * até que este fique disponível para que possa escrever. Para validar esse comportamento, a primeira
     * assertiva na linha 17 irá comprovar que esse campo não existe inicialmete e vai aparecer apenas após
     * clicar no botão de 'Resposta Demorada'. Logo após clicar, por ser rápido, esse campo ainda não deve
     * existir, linha 19, e, depois ele deve existir para que seja possível escrever 'funciona' como desejado*/

        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it('20-Retentativas, Must do retrys', () => {
    /* Apresentar como o Cypress faz as retentativas de busca e assertivas. Esse exemplo, ele não aceita o 
     * segundo assert de not.exist, e até o get ele negou desta assertiva.
     * Porque ele fica tentando realizar o get, até conseguir satisfazer as assertivas associadas a ele. */

        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo').should('exist').should('not.exist')

    /* Se tentar agora realizar a sequência contrária de assertivas acaba dando um erro geral. Há o GET
     * e logo em seguida verifica que o campo não existe. Ele espera que um null exista ao usar um exist.
     * Ao olhar a documentação do Cypress sobre o should, na parte de YIELDS: na maioria dos casos o should
     * vai retornar um mesmo objeto, e isso que permite o encadeamento de ações, ex um should existe e um should
     * not exist, ou usar um should depois um type que deve retornar o campo. Dependendo do que for feito na
     * assertiva, o should não vai retornar um objeto, nesse caso abaixo ele não retorna, porque primeiro
     * pedimos para ele garantir que o elemento não exista então não faz sentido retornar um elemento e assim
     * é retornado um null. Sendo necessário tomar cuidado no encadeamento realizado nas assertivas. */

        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo').should('not.exist')
        //     .should('exist')

    /* Tendo em vista o YIELDS do should que garante o retorno do mesmo objeto no encadeamento de assertivas, a forma abaixo é a mais correta */
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist').type('funciona')
    })
})
