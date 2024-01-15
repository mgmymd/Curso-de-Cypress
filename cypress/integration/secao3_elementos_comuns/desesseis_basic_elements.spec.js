/// <reference types="cypress"/>

describe('Working with Basic Elements IV', () => {
    // Preparo dos ambientes dos testes
    before(() => { cy.visit("https://wcaquino.me/cypress/componentes.html") })
    beforeEach(() => { cy.reload() })

    it('Aula 16-Checkbox', () => {
        cy.get('#formComidaPizza').click().should('be.checked')
        
        /* A pricipal diferença do radiobutton e checkbox é que podemos clicar em vários no checkbox
        * Nesse exemplo vamos clicar em todos, usando a estratégia de agrupar pelo name que deve ser igual 
        * de todos. O .click() é usado apenas para 1 elemento, mas essa busca que foi
        *  feita(['name=formComidaFavorita']) retornou 4 elementos, então deve-se usar o parâmetro, objeto, 
        * multiple: true */
        cy.get('[name=formComidaFavorita]').click({multiple: true})

        // Depois de realizado esse múltiplo toque, podemos verificar o que foi desmarcado, Pizza, e o restante marcado
        cy.get('#formComidaPizza').should('not.be.checked')

        const listaComidas = ['#formComidaCarne', '#formComidaFrango', '#formComidaVegetariana']

        for(let i=0; i< listaComidas.length; i++){
            cy.get(listaComidas[i]).should('be.checked')}
    })

    it('Aula 17-Working with Combobox', ()=> {
    // O Combobox permite selecionar apenas 1 opção. Nesse exemplo estamos procurando a propriedade datatest
        cy.get('[data-test=dataEscolaridade]').select('2o grau completo')

    /* Para encontrar o valor a ser valido, assim como o textfield, será na propriedade have.value. Mas
     * essa estratégia de usar apenas o have.value deu errado, pois o valor encontrado foi 2ograucompleto.
     * Deu esse problema pelo fato do value ser diferente. Vendo pelo navegador é possível observar melhor,
     * ao selecionar o combobox que o value é junto, então a verificação deve ser feita por essa propriedade e
     * não pela propriedade que aparece na tela  */
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

    /*Selecionar agora o value de fato e não o valor que é apresentado na tela*/
        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')
    
    /* Para enviar o select, podemos enviar tanto o valor visível que o usuário pode ver no combobox, 
     * quanto o valor do value real, para selecionar ele aceita os dois valores.
     * Porém, para verificar essa propriedade ele aceita apenas o valor do value. */
    })

    it('Aula 18-Combo Múltiplo', ()=> {
    /* É possível selecionar vários elementos.
     * Para simular isso no Cypress, deve selecionmar 1 opção, segurar o Ctrl e selecionar a próxima opção.
     * Com o get fazemos uma busca e depois pedimos para selecionar natação e corrida. Para enviar esses
     * dois valores, no select, vamos enviar os 2 valores, value, dentro de um array. 
     * Não irá funcionar se tentar enviar os valores conforme o que é apresentado de maneira escrita, o
     * combo múltiplo funciona apenas com os valores reais do value.*/
        cy.get('[data-testid=dataEsportes]').select(['natacao', 'Corrida']).debug()
    })
})
