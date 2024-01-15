/// <reference types="cypress"/>

describe('Helpers II', () => {
    before(() => { cy.visit("https://wcaquino.me/cypress/componentes.html") })
    beforeEach(() => { cy.reload() })

    it('Invoke I', () =>{
/* Diferente do Its, o invoke não trabalha com as propriedades mas sim com as funções. 
 * Inicialmente criamos uma função que vai retornar 1 e vamos colocá-la como uma das propriedades de 
 * um objeto e usar com o wrap para executar. Uma vez que temos um objeto com essa função, podemos chamar
 * o método INVOKE. Com o INVOKE vamos indicar o que queremos executar, que não será a função getValue,
 * mas sim a propriedade funcao que recebe essa função getValue.
 * quando chamar o funcao teremos o resultado 1 e poderemos fazer uma assertiva assim*/
        const getValue = () => 1;
        cy.wrap({funcao:getValue}).invoke('funcao').should('be.equal', 1).debug()

/* Agora com outra função, mas de soma, ela vai ter 2 parâmetros, a e b e dará sua soma como retorno.
 * Quando usar o INVOKE para chamar a função soma que está dentro da propriedade funcao2 temos que passar
 * os valores dos parâmetros a e b; O invoke executa a função e a assertiva ocorre normalmente. */
        const soma = (a,b) => a+b;
        cy.wrap({funcao2: soma}).invoke('funcao2', 2,5).should('be.equal', 7)
    })
    it ('Invoke II', () =>{
/* Temos que lembrar que quando é um objeto do jquery não podemos usar com o cypress, mas se for um objeto do
 * cypress podemos usar também como um jquery;
 * Agora podemos tentar usar o Jquery para conseguir o valor. Usando o get no formulário de nome e, uma vez que o temos
 * ele é um objeto do cypress mas também podemos usar como um objeto do Jquery, então podemos fazer um invoke no 
 * método val deste objeto passando também o parâmetro que é um texto/string para ser escrito na caixa de texto  
 * do campo formNome usando o INPUT.
 * Em vez de fazer diretamente, ainda temos um pouco rastreabilidade */
        cy.get('#formNome').invoke('val','Texto via INVOKE e JQUERY')

/* Usando agora os métodos da API do cypress: o método window vai trazer o objeto window que existe em toda
 * página que dá controle nesta página e vamos chamar/executar um alert que passa a mensagem que queremos que
 * funcione como parâmetro. No cypress não vamos ver a janela de alerta, mas no histórico haverá o registro
 * que foi possível pegar um alert com aquele texto.
 * Conseguimos ter controle na janela de aplicação a ponto de executar um script nela */
        cy.window().invoke('alert', 'Método window com alerta por meio do invoke')
    })

    it('Invoke III', () =>{
/* Usar o id agora para procurar/fazer os testes. Nesse caso, procurar por alguma coisa que tenha o id resultado
 * e usar o método do jquery chamado HTML. Esse método permite imbutir um código html dentro, podendo ver
 * que o texto é inserido ao final como a forma de um botão */
        cy.get('#resultado').invoke('html', '<input type="button" value ="hacked!" />')
    })
})
