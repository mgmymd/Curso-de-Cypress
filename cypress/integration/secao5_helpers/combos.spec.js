/// <reference types="cypress"/>

describe('TODOS dos COMBOS', () => {
    //Preparo dos testes
        before(() => { 
            cy.visit("https://wcaquino.me/cypress/componentes.html") 
        })
        beforeEach(() => { cy.reload() })
    
        it('Combos I', () => {
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
    
    /* Validar opções do combo da aula desesseis de elementos do combo:
     * Uma primeira boa prática é verificar quantos elementos existem dentro do combo e depois quais são.
     * Se olhar o html do combo dataEscolaridade vemos que o id é formEscolaridade e dentro há a propriedade option.
     * Há tags que podem ser usadas e depois a propriedade option que podem ser inseridas no cypress para
     * realizar a busca e ver quantos elementos existem, nesse exemplo indicará que há 8 elementos */
                cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)
    
    /* Agora verificando os elementos da lista: será a mesma busca, isto é, utilizando as options contidas
     * no combo que são indicadas no html. Mas usaremos agora um array dentro:
     * E dentro desta função, vamos colocar todos os valores que encontrar no array. E para cada elemento do array
     * vamos usar o function. Os elementos do array possuem uma propriedade chamada innerHTML, que vai dar
     * exatamente o valor que queremos procurar e usaremos o this; O push vai ser para povoar o array.
     * Depois de povoado o array, podemos usar o expect(values) para verificar se os seguintes membros 
     * dentro do array estão presentes */
            cy.get('[data-test=dataEscolaridade] option').then($arrayOptions => {
                const values = []
                $arrayOptions.each(function(){
                        values.push(this.innerHTML)
                })
            expect(values).to.include.members(["Superior", "Mestrado"])
            })
        })
    
        it('Combo Múltiplo', ()=> {
    /* É possível selecionar vários elementos.
    * Para simular isso no Cypress, deve selecionmar 1 opção, segurar o Ctrl e selecionar a próxima opção.
    * Com o get fazemos uma busca e depois pedimos para selecionar natação e corrida. Para enviar esses
    * dois valores, no select, vamos enviar os 2 valores, value, dentro de um array. 
    * Não irá funcionar se tentar enviar os valores conforme o que é apresentado de maneira escrita, o
    * combo múltiplo funciona apenas com os valores reais do value.*/
            cy.get('[data-testid=dataEsportes]').select(['natacao', 'Corrida', 'nada']).debug()
    
    /* Verificar agora quais são todas as opções selecionadas no combo múltiplo: 
     * Uma forma simples de fazer é realizar uma busca, usar um should, pedir o have.value e passar os valores 
            cy.get('[data-testid=dataEsportes]').should(['natacao', 'Corrida', 'nada'])
     * Mas essa maneira irá trazer o erro de que não está igual ao que foi comparado, mostrando que o have.value
     * não funciona muito bem para essas situações, é o mesmo caso da comparação de 2 objetos iguais com o have.value
     * Assim, é necessário fazer uma mudança para poder usar. Precisamos tratar a busca como uma promise usando then
     * Depois usar a assertiva com o expect e oegar o valor do elemento com a Jquery para pegar o 
     * valor do elemento ao usar os () vazios na forma de $elementos.val()
     * Após pegar o valor dos elementos usamos o to.be.equal ao array inicial*/
            cy.get('[data-testid=dataEsportes]').then($elementos => {
                expect($elementos.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
                //Dentro do bloco podemos ter mais de uma assertiva, uma segunda agora seguindo o mesmo padrão de checagem
                expect($elementos.val()).to.have.length(3)
            })
        })
        it('Combo Múltiplo II', () => {
    /* Agora, usando o invoke vamos chamar diretamente o método val presente no jquery
     * Usamos o eql que é equivalente a um equal e podemos depois passar o array que queremos verificar
     * Nesse caso o array que queremos verificar são as opções que desejamos que estejam marcadas
     * Esse padrão usa a busca normal do combo múltiplo e depois suas propriedades */
            cy.get('[data-testid=dataEsportes]').invoke('val')
                .should('eql', ['natacao', 'Corrida', 'nada'])
        })
    })
    