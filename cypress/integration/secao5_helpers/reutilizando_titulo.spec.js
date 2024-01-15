/// <reference types="cypress"/>

describe('Reutilizando Título e outras dúvidas', () =>{
    before(() => { 
        cy.visit("https://wcaquino.me/cypress/componentes.html") 
    })
    beforeEach(() => { cy.reload() })

    it('Pegando o título I', () =>{
/* T-O-D-O-S da quinta_aula_acessar_uma_pag: 
 * Já temos a estrutura, agora basta procurar algum campo e escrever dentro dele. Como do campo nome do formulário.
 * E usar o comando type para digitar o title que foi obtido inicialmente.Devendo usar o THEN no lugar de SHOULD
 * para evitar que ele fique em um loop infinito */
        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)
        })
    })

    it('Pegando o título II', () =>{
/* Agora, supondo que pegamos o valor do title e queremos continuar a navegação e as ações, usando o valor
 * de title apenas para frente, como fazemos sem ter que colocar tudo dentro de uma mesma promise usando then?
 * Vamos criar uma variável com let acima e, depois, dentro da promise vamos colocar numa variável 
 * o título que foi obtido. Se fizermos qualquer outro comando após a promise, já sabemos que o cypress
 * consegue automaticamente sincronizar a ordem dos comandos de forma correta; Se usarmos um próximo comando
 * do cypress vamos garantir que já estará com a variável preenchida corretamente */
        cy.title().should('be.equal', 'Campo de Treinamento')
        .and('contain', 'Campo');

        let syncTitle;

        cy.title().then(title => {
            console.log(title)
            
            cy.get('#formNome').type(title)

            syncTitle = title;
        })
/* Tentar preencher agora o sobrenome para comprovar que o cypress vai cuidar automaticamente da sincronização
 * Não vai funcionar inicialmente com:  cy.get('[data-cy=dataSobrenome').type(syncTitle) porque é como se ele ainda
 * não tivesse preenchido, mas se colocar dentro da promise que o cypress vai esperar até encontrar o campo, 
 * com o uso de THEN e depois vai sincronizar, conseguimos fazer com que o teste passe. */

        cy.get('[data-cy=dataSobrenome').then($elemento =>{
            $elemento.val(syncTitle) //essa é uma das formas de escrever no campo um valor desejado
        })
        cy.get('#elementosForm\\:sugestoes').then($elemento2 => {
            cy.wrap($elemento2).type(syncTitle)
        })
/* Olhando os logs do cypress vamos ver que não temos o log do sobrenome, porque a escrita não foi por
 * gerenciamento nativo do cypress, mas no segundo log, com o uso do wrap conseguimos ver a presença dele */
    })
})
