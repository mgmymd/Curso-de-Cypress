/// <reference types="cypress"/>

describe('Cuidado com a forma que busca', ()=>{
    // Preparo dos ambientes dos testes
    before(() => { cy.visit("https://wcaquino.me/cypress/componentes.html") })
    beforeEach(() => { cy.reload() })

    it('How to use FIND', ()=>{
        /* O cenário para mostrar os diferentes resultados que podem ser obtidos conforme a ordem será o
         * de clicar no botão de lista e esperar pelos: Item 1 e Item 2, que levam alguns segundos para
         * aparecer na tela abaixo da parte laranja */
        cy.get('#buttonList').click()

        /* Após clicar, no código html temos o item li, depois dele a tag span com o Item 1. Então uma
         * forma de busca além do get é usar a busca por id como de "resultado" ou "lista" é o de colocar
         * o  id ESPAÇO li ficando como exemplo: cy.get('#lista li span'), ele reduz a busca, porque não é 
         * mais a lista ou o li, é o span que está dentro da lista.
         *              cy.get('#buttonList li span').click()
         * Nesse exemplo de cima é usado apenas o ID de maior hierarquia e depois as tags seguindo a hierarquia,
         * quando usamos as tags não precisamos usar nenhum caracter especial.
         * 
         * Agora, para mostrar o uso do FIND vamos usar o cy.get apeas até o li e compor a busca dentro de
         * outra busca com o escopo já reduzido através deste comando FIND, que irá buscar o conteúdo contido
         * em span e realizar a assertiva após realizar a busca*/
        cy.get('#lista li').find('span')
            .should('contain','Item 1')

        /* Nesse caso ele não vai achar o Item 2 dentro de span, pelo fato do Item 2 ter surgido durante
         * a execução do fin, mas na hora do erro, ele já está lá presente na tela, ele não encontrou o 
         * span do Item 2 e se perdeu. Isso ocorre pelo fato que ele fica refazendo o comando anterior a ele
         * chegando na assertiva, ou seja, ele retentou o de cima pelo fato do should do item 2 não ter funcionado
         * Ele nao retenta todos os comandos, apenas o comando imediato acima dele, ele retenta todos os comandos acima 
         * Assim ele ficou retentando o comando find depois o should e, como ele tinha feito um get lista li que jpa
         * existia do teste acima, o find e o should vão observar apenas o Item 1 e não usar o item 2, porque o get
         * já tinha reduzido o escopo apenas para o LISTA LI ITEM1.*/
                        // cy.get('#lista li').find('span')
                        //     .should('contain','Item 2')
        // Para resolver esse comando acima de teste, é necessário realizar uma busca completa
        cy.get('#lista li span').should('contain', 'Item 2')

        /* Nesses casos específicos em que a tela é montada ou apresentada aos poucos, o uso do
         * find acaba atrapalhando, sendo necessário realizar a busca completa para evitar tais problemas */
    })

    it('Lista DOM', ()=>{
/* Nessa lista, ele apaga o item 1 para adicionar o item 2, colocando agora o item 1 e item 2 na sequência
    * Diferentemente do que ocorria no caso acima em que o item 2 era apenas adicionado abaixo do item 1.
    *          cy.get('#lista li').find('span').should('contain', 'Item 2')
    * Usando o acima dá um erro, justamente pelo comportamento de apagar o item 1 do DOM e depois 
    * adicionar os dois itens de uma só vez. CypressError: Timed out retrying: cy.should() failed
    *  because this element is detached from the DOM. 
    *          <span>Item 1</span>
    *  Cypress requires elements be attached in the DOM to interact with them. */
        cy.get('#buttonListDOM').click()
        cy.get('#lista li').find('span')
            .should('contain','Item 1')
        cy.get('#lista li span').should('contain', 'Item 2')
    })

    it('Usos do timeout', () => {
/* O cypress apresenta um timeout de 4 segundos, mas podemos alterar esse valor se necessário. 
* Com o not.exist em seguida é devido à demora de 13 segundos para o campo aparecer, assim é possível
 * realizar a verificação que ele não existe inicialmente.
* Agora, podemos tentar alterar o timeout. O timeout é usado como segundo parâmetro dentro 
* do get e é usado em milissegundos, colocando para 1 segundos ele é capaz de alterar o timeout e gerar um erro.
                        cy.get('#buttonDelay').click()            
                        cy.get('#novoCampo', {timeout: 1000}).should('not.exist')
Em casos que o sistema demora muitoo para gerar a resposta, podemos aumentar o timeout para que ele demore 
* mais, quando ele demora em todas as ações ou é mais ´rapido em todas as ações, devemos alterar o arquivo
* cypress.json, usando por exemplo "defaultCommandTimeout":1000, que em vez de 4 segundos e timeout que ele usa, 
* será considerado 1 segundo agora para cada comando, podendo aplicar em toda a aplicação e reduzir
* o tempo de execução de testes. Mas em casos específicos deve realizar a aplicação do timeout de maneira
* direta na consulta.
* 
Agora, voltando para o exemplo que usa a Lista DOM, o teste irá quebrar, pelo fato de que a alteração
* feita no arquivo cypress.json foi aplicada a todos os comandos de maneira geral e não apenas isoladamente,
* o que faz com que todos os comandos tenham um timeout de 1 segundo e não de 4 segundos esperados para
* cada item da lista que iria aparecer. Ele não esperou os 6 segundos que levam para aparecer o item 1 e item 2*/
        cy.get('#buttonListDOM').click()
        // cy.wait(6000) Poderá ser adicionado para resolver o problema de timeout curto de 1 segundo de uma maneira isolada
        cy.get('#lista li span', {timeout:3000}).should('contain', 'Item 2')

/* O cy.wait() deve ser usado apenas em tempos fixos e quando necessário, nesse caso de cima foi usado por
* saber quanto deveria levar de tempo para aparecer e, não deve ser usado para variações de reação das aplicações,
* é melhor usar os timeouts nos gets, como exemplo e, quando a condição for satisfeita antes há a 
* liberação do fluxo e não deixa preso como o uso do wait que só liberará depois de satisfeita */
    })

    it('Usos de timeout e wait II', () =>{
/* Agora, iremos pedir para verificar o tamanho da lista, #lista li span.
 * Ele vai ficar realizando retrys até que o should seja satisfeito com o uso do timeout de 3000 específico
 * para esse comando, e o timeout geral reduzido para 1s. Ele só libera quando todas as assertivas são satisfeitas */
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span', {timeout:8000}).should('have.length', 1)
/* Se tivermos agora duas assertivas encadeadas
        cy.get('#lista li span', {timeout:3000})
                        .should('have.length', 1)
                        .should('have.length', 2)
 * Derá um erro, pelo fato dele tentar ficar realizando os retrys observando apenas o primeiro.
 * A forma de resolver será separando os comandos e não deixando mais encadeado. */
        cy.get('#lista li span', {timeout:8000}).should('have.length', 2)
    })
})
