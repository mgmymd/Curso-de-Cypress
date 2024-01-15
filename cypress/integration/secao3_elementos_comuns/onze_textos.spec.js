/// <reference types="cypress" />

describe('Words with basic elements', () => {
    it('Text', () =>{
        cy.visit("https://wcaquino.me/cypress/componentes.html")

        /* Verificar se um certo texto está na tela, de maneira genérica usamos: cy.get() 
        * e dentro dos () colocamos alguma maneira do cypress localizar o elemento. O que ele aceita
        * é um JQuery select na bsuca , e uma  característica dele é quando queremos buscar algum 
        * elemento pela tag, basta escrever a tag que está dentro do body.
        * Primeiramente iremos pegar o body, ou seja, todo o corpo da página, e depois pedir para
        *  verificar se aquele texto está contido dentro do body.
        * iremos usar o contain, pelo fato do body conter muita coisa e, no console em Subject JQuery
        * iremos conferir que o body contém tudo*/
       cy.get('body').should('contain', 'Cuidado')

       /* O body não é uma boa prática, é melhor fazer uma forma mais específica, vamos fazer agora
        * procura com span. Irá retornar 2 spans que estarão destacados na tela do Cypress com a palavra
        * e o teste vai passar*/
       cy.get('span').should('contain', 'Cuidado')

       /* Agora mais direcionado, para o 'Cuidado' presente no centro da tela, precisamos procurar 
        * algo que seja mais específico quanto à localização na tela.
        * Se usarmos a ferramenta do próprio Cypress, ela oferece uma sugestão usando uma classe
        * de CSS: a facilachar. E pelo Jquery selector para colocar uma classe de CSS, basta usar
        * .nomeDaClasse, ficando como exemplo: .facilAchar
        * Por ser mais exato, não usamos mais o contain mas sim have.text e, o texto deverá
        * agora ser idêntico ao que desejamos realizar o assert */
       cy.get('.facilAchar').should('contain', 'Cuidado')
       cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it.only('Links', () => {
        /* Lembrar de tirar o .only para executar os testes acima 
         * Devemos sempre usar o cy.visit() abaixo para fazer com que os testes sejam possíveis
         * de serem executados de maneira isolada, caso o teste acima que acessa essa página não for
         * executado e este teste 'Links' não conter o cy.visit não haverá como realizar a execução */
 
        cy.visit("https://wcaquino.me/cypress/componentes.html")

        /* Agora para links, iremos usar a ferramenta de seleção do próprio Cypress, que dará
         * a referência como sendo '[href="#"]', por ser o único link da tela já podemos usar o click() 
         * em seguida para pedir para clicar no link. Mas para ser mais específico é necessário
         * buscar a div, só que no momento será necessário pedir para que o cypress dê a recomendação;
         * Nesse caso, o Cypress vai dar a recomendação de realizar a busca por ID que é usando #,
         * indicando que queremos realizar uma busca por um elemento que o ID seja esse valor indicado;
         * Antes do click era "Não cadastraso", então se não clicar antes e pedir para fazer o assert dará
         * erro, e após o click é "Voltou!" sendo a forma correta */
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        /* Há uma segunda forma de busca que usa o contain e busca pelo texto mesmo na página;
         * Na parte de busca do Cypress podemos clicar em contain e digitar 'Voltar'
         * Podemos tentar agora, novamente, fazer o click no Voltar e o resultado seguido deve ser
         * o mesmo do anterior. Contudo, há uma dúvida, uma vez que o primeiro click trocou de não
         * cadastrado para Voltou e o segundo link já estava Voltou, então não foi feito nada;
         * Para resolver essa situação, é necessário entrar novamente no link da página ou recarregar,
         * para confirmar se foi realmente recarregada, podemos usar o should('not.gave.text', 'texto')
         * assim conseguimos validar que ainda não tem esse texto e pode seguir realizando o click no botão*/
        cy.reload()
        cy.get('#resultado').should('not.have.text','Voltou!')

        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        /* Assim, temos duas formas principais de verificação, o contains e o get;
         * O get fica atrelado a uma classe CSS, uma div, um texto, é mais 
         * específica e segura de ser utilizada do que o contains;
         * É bom usar o texto para realizar o assert, contudo, muitas vezes há textos diferentes de acordo 
         * com o idioma que está sendo usado na página, ou textos dinâmicos e, quando houver alteração
         * deles é necessário atualizar os códigos dos scripts automatizados; */
    })
})
