/// <reference types="cypress"/>

describe('Sincronismo III', ()=>{
    // Preparo dos ambientes dos testes
        before(() => { cy.visit("https://wcaquino.me/cypress/componentes.html") })
        beforeEach(() => { cy.reload() })
    
        it('Nem todos os comandos tem um retry: Click retry', () => {
    /* Nem todos os comandos tem um retry, pelo fato de que certos comandos alteram a tela, como o click
     * Nesse exemplo iremos clicar no botão 1 do site usado para o curso. Após algum tempo vai aparecer no 
     * botão mais um 1 ao lado e sempre que clicar neste botão um 1 novo será adicionado, da seguinte
     * forma: 1 -> 11 -> 111 -> 1111
     * Assim, esse teste vai demonstrar que mesmo que a assertiva não seja satisfeita, ele vai fazer a espera
     * o should vai ser refeito, mas não irá refazer o comando anterior*/
            cy.get('#buttonCount').click()
                .should('have.value', '1') //lembrando que o valor de botões ficam na propriedade value
    /* A assertiva acima vai passar, por conta dessa demora que há de virar 11 após clicar no botão 1, ele
     * chegou a encontrar o valor 1 do botão. E, se for alterado para 11, ele vai retentar a assertiva, should,
     * até encontrar o valor 11, mas o comando click não é reexecutado em momento algum como acontece com os outros. */
        })
    
        it('Do Cypress basic, imprimir o título no console: should visit a page and assert title', () => {
    /* O título será buscado de forma assíncrona e o chainer é encadeado, vamos encadear a próxima ação 
     * que queremos realizar com o título, que seria a verificação;
     * O title seria o texto que aparece na barra do navegador; */
                cy.title().should('be.equal', 'Campo de Treinamento')
                cy.title().should('contain', 'Treinamento');
    // Podemos também escrever da seguinte maneira, dando um pouco mais de legibilidade:
                cy.title().should('be.equal', 'Campo de Treinamento')
                    .and('contain', 'Campo');
                
    /* Vamos inicialmente usar um cy.title().debug() para melhor visualização. Com o debug, já vemos que o
     * título que estamos trabalhando tem o valor Current Subject:  Campo de Treinamento indicado no console.
     * Esse valor, quando pedir para fazer uma promise, nesse ponto, temos que usar o then para tratar e usar como
     * parâmetro o título, sendo na verdade uma função*/
                cy.title().then(title=> {
                    console.log(title)
                })
    /* Uma outra mudança que poderia ser feita é que tanto o then quanto o should tratam as promises, poderíamos
     * usar o should também. Mas, há uma diferença entre eles.*/
                cy.title().should(title=> {
                    console.log(title) })
            })
        
        it('SHOULD vs THEN - I', () => {
    /* Tratar as promises do CYPRESS: */
            cy.get('#buttonListDOM').click()
    /* cy.get('#lista li span').debug() Vai trazer apenas a lista li span e depois usamos o then para tratar a promise
            * Vamos usar o $elements que será uma função, e não é mais um elemento do cypress, mas sim um elemento
            * html que foi capturado e vamos usar o jquery de tratamento. Voltamos para aula de asserts e usamos as
            * expectativas de ações usando o expect para checar/fazer as validações*/
            cy.get('#lista li span').then($elements => {
                console.log($elements)
                expect($elements).to.have.length(1);
            })
    /* Se colocar o should no lugar do then, vai funcionar da mesma maneira. Mas ao pedir para imprimir no log o com should e com then
     * mostra a diferença, em que o should faz a verificação logo após a busca e o then aguarda para poder fazer a
     * verificação da busca;
     * O get com o should são mais alinhados de maneira geral; */
        })
    
        it('SHOULD vs THEN - II', () => {
    /* Vamos agora alinhar as verificações, além do único then que há no exemplo acima, poderíamos ter várias
     * outras verificações abaixo, ou de maneira externa também após realizar a verificação com a função;
     * Não vamos usar a busca por ID com a #, porque ela é usada para indicar que queremos buscar com ID, mas a
     * sem a cerquilha vamos apenas indicar que estamos replicando esse ID
     * Com should também daria certo; */
                    cy.get('#buttonListDOM').click()
                    cy.get('#lista li span').should($elements => {
                        expect($elements).to.have.length(1);
                }).and('have.id','buttonListDOM')
    /* Pedindo agora para retornar o 2 vai continuar funcionando, mas se trocar para o then deixa de funcionar.
     * Porque o should ignora o que está dentro do retorno, ele sempre vai retornar o mesmo objeto que recebeu e
     * o then vai retornar o 2 no lugar do objeto; Vai retornar outra coisa e, com o uso do then podemos aplicar
     * para outros fins;
     * O eq 2 vai dar certo, porque queremos, com o uso do then, que seja retornado o novo valor */
                    cy.get('#buttonListDOM').click()
                    cy.get('#lista li span').then($elements => {
                        expect($elements).to.have.length(1);
                        return 2;})
                        .and('eq',2)
                        //.and('not.have.id','buttonListDOM')
        })
        it('SHOULD vs THEN - I', () => {
    /* A terceira diferença, vamos usar agora outro botão dentro do buttonListDOM, usando a #para indicar pelo get
     * que queremos buscar por ID. Vamos executar dessa forma usando o then e ele aceita, passa o teste após fazer
     * a busca; Logo em seguida fez a busca pelo buttonList; */
                    cy.get('#buttonListDOM').click()
                    cy.get('#lista li span').then($elements => {
                        console.log($elements)
                        expect($elements).to.have.length(1)
                        cy.get('#buttonList')
                })
    /* Agora, com o uso de should na mesma situação anterior, ele vai entrar em um loop infinto, porque ele 
     * trabalha com um botão e acaba entrando na busca de outro elemento e isso gera um loop;
     * Assim, se for necessário fazer outra busca, usa-se o then para evitar que ele entre em loop de tentativas
     * para conseguir obter os termos.*/
                        // cy.get('#buttonListDOM').click()
                        // cy.get('#lista li span').should($elements => {
                        //     console.log($elements)
                        //     expect($elements).to.have.length(1)
                        //     cy.get('#buttonList')
                        // })
        })
    })
    