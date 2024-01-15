/// <reference types="cypress" />

describe('Working with basic elements part III', () => {
    // Preparo dos ambientes dos testes
    before(() => { cy.visit("https://wcaquino.me/cypress/componentes.html") })
    beforeEach(() => { cy.reload() })

    it('TextFields', () => {
        /* O primerio elemento que queremos acessar na página é o 'Nome', e com o cypres podemos
         * ver que é possível acessar pelo id usando o #formName.
         * Uma vez que temos o elemento, vamos querer escrever algo dentro dele, usa-se o método type*/
        cy.get('#formNome').type('Cypress Test Part I, NAME')

        /* Uma vez que escrevemos o nome do elemento na caixa de texto, 
         * precisamos recuperá-lo com o uso de uma assertiva:
        cy.get('#formNome').should('have.text', 'Cypress Test Part I, NAME')

         * Mas acabou resultando em erro, pelo fato de que em campos de texto esse texto inserido não
         * é acessível de forma fácil. O input do texto feito fica em um atributo do campo de texto.
         * Parecido com algo que fica no botão, fica no value */
        cy.get('#formNome').should('have.value', 'Cypress Test Part I, NAME')

        /* Agora, com o text alley 'Sugestões' que é igual ao do Nome, mas devemos nos atentar ao \: 
        cy.get('#elementosForm\:sugestoes').type('Cypress test')
        cy.get('#elementosForm\:sugestoes').should('have.value', 'Cypress test')

         * Mas haverá um retorno de erro, tendo em vista que os : são um caracter especial, assim
         * como a barra, e alguns comandos de JQuery acabam inutilizando os :
         * é necessário proceder usando \\:, mas que o barra barra vire uma barra única e não
         * é preciso interpretar o :
         * É comum também encontrar alguns IDs que fazem uso de : e, usando o JQuery Selector haverá
         * problemas com o uso de : e \*/
        cy.get('#elementosForm\\:sugestoes').type('Cypress test')
        cy.get('#elementosForm\\:sugestoes').should('have.value', 'Cypress test')

        /* Usando agora um dos campos mais abaixo da tela: o relativo ao 'Francisco'
         * Podemos ver um comando grande:
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')

         * Os dois pontos estão presentes, mas não atrelados a um ID, nem ID existe nesse caso da
         * tabela de usuário e, são realizadas algumas navegações, indicadas por > para chegar 
         * em tal elemento, no campo que desejamos preencher*/
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input').type(
            'Grande')
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input').should(
            'have.value', 'Grande')

        /* Outras interações que podemos realizar em campos de textos, como de sobrenome e a 
         * inserção de números sem um backspace nesse momento. Iremos pedir para que o espaço
         * seja adicionado enquanto for digitando, usando {backspace}{backspace}.
         * Nesse exemplo o should da assetiva também já é colocada em seguida, em um único comando */
        cy.get('[data-cy=dataSobrenome]').type('Teste123456{backspace}{backspace}').should(
            'have.value', 'Teste1234'
        )

        /* Agora, vamos escrever novamente em sugestões, mas ele já foi preenchido anteriormente.
         * Devemos ou realizar um reload na página ou usar algo para limpar, como o .clear()
         * seguido de um outro comando e depois o texto; O objeto delay ({delay:número}) pode ser usado
         * durante a criação do script para acompanhar o que está sendo preenchido, mas durante a execução 
         * não acaba sendo útil, deve ser retirado; Em alguns casos mais específicos o delay pode ser
         * usado para resultar em uma inatividade de script necessária
         * Por último já podeos colocar um should() para realizar a assertiva: */
        cy.get('#elementosForm\\:sugestoes').clear().type('Cypress test{selectall}acerto', (
            {delay:100})).should('have.value', 'acerto'
        )
    })

    it('Aula 15 - RadioButton', () =>{
        cy.visit("https://wcaquino.me/cypress/componentes.html")
        cy.get('#formSexoFem').click()

        // Depois de pedir para clicar, temos agora que verificar se ele realmente está selecionado
        cy.get('#formSexoFem').should('be.checked')
        // Em vez de usar separado como acima, pode também ser feito tudo junto:
        // cy.get('#formSexoFem').click().should('be.checked')

        /* Uma vez que pedimos para ele clicar no feminino, temos agora que verificar se o
        item masculino não está selecioado */
        cy.get('#formSexoMasc').should('not.be.checked')

        /* Sabe-se que o RadioButton tem a característica de estar em grupo, assim, quando um é selecionado
        o outro deixa de estar marcado. Então, se olhar no código, na parte do html, podemos ver que há o id
        com o tipo, o nome e o id, assim como o valor dele. O name deve ser igual para os dois nesse exemplo,
        é o name que está agrupando os dois radiobuttons presentes na página.
        Na busca da propriedade do elemento vamos adicionar entre o [] o que queremos procurar, nesse caso deverá
        selecionar automaticamente os dois radiobuttons de Masculino e Feminino, indicando que encontrou 2
         elementos que apresentam esse nome, o Sexo Feminino e o Masculino */
        cy.get("[name='formSexo']").should('have.length', 2);

        /* As aspas simples, ', não são necessárias quando não há espaço, poderia ficar como no exemplo:
        cy.get("name=formSexo").should(have.length,2); */
    })
})
