/// <reference types="cypress"/>

describe("POP UP", () =>{
/* O cypress não interage com pop, no cypress ba parte de trade-offs podemos ver que não há suporte
 * para múltiplas abas do browser, assim, temos acesso ao trabalho com várias abas mas não tem uma razão para.
 * Se quisermos testar o conteúdo, devemos fazer como no teste acima de maneira direta, se for de 
 * modo geral, conseguimos testar apenas se a popup foi ou não chamada/invocada da forma correta
 * Para simular esse caso, há um botão que cria uma janela popup.
 * O conteúdo de um pop up deve ser testado diretamente como um iframe visto nas aulas passadas */
    it("Deve testar o popup diretamente", () => {
    // Igual a aula de iframe ii, basicamente o mesmo conteito e os mesmos objetivos
        cy.visit("https://wcaquino.me/cypress/frame.html")

        cy.get("#otherButton").click();
        cy.on("window:alert", msg => {
            expect(msg).to.be.equal("Click OK!");
        })
    })

    it("Deve verificar se o popup foi invocado", () => {
        cy.visit("https://wcaquino.me/cypress/componentes.html");
/* Abriu mas não temos o controle total sobre, vamos fazer isso a partir da criação de mocks,
 * indo para o window e criando um stub para que seja possível acompanhar e garantir a abertura de uma janela nova
 * O método usado para abrir um popup é o método window, e vamos usá-lo no stub. Depois devemos
 * também verificar que essa window nova foi aberta. Pelo cypress usando o stub a janela verifica que ele
 * realmente está sendo invocado e a janela nova para de ficar abrindo pelo cypress;
 * Podemos colocar um alias como as('winOpen') e usar ele dar para um get, realizar uma busca 
 * de maneira direta mas com um caracter especial para que ele não fique procurando eternamente, já
 * que outras tags podem ter o nome ou algum elemento e ele retornar vários*/
        cy.window().then(win => {
            cy.stub(win, "open").as("winOpen");
        })
        cy.get('#buttonPopUp').click();
/* Após usar o caracter especial @, ele consegue buscar pelo popup e retorna uma função, que seria
 * exatamente a função open. Agora, é possível fazer uma assertiva com o be.called, para verificar
 * se essa chamada foi invocada corretamente. E, para testar se foi realmente invocada, podemos comentar
 * a linha 30 e ver se assertiva está falhando. Se falhar o popup realmente não apareceu, ou seja, 
 * a função open não foi invocada*/
        cy.get('@winOpen').should('be.called');
    })
})

describe("POP UP POR LINKS", () =>{
    beforeEach(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html");
    })

    it("POP UPS ACESSO POR MEIO DE LINKS", () =>{
/* Temos um outro popup na página de testes que gera um popup novo em outra aba.
 * Inicialmente para verificar se está presente usamos o "have.prop" que é capaz de retornar a
 * própria propriedade em si, então podemos usar apenas um and.equal e colocar o caminho da popup
 * que é o link já conhecido que é a url frame.html
 * A propriedade href é o link do popup que será aberto.
 * Também temos a opção de pegar a propriedade da URL no teste e acessá-la durante o teste, não
 * deixando de forma fixa como quando usamos o "https://............", evitando problemas
 * como o de links que podem variar com o tempo/serem trocados em algum momento no futuro*/
        cy.contains("Popup2")
                    .should("have.prop", "href")
                    .and("equal", "https://wcaquino.me/cypress/frame.html")
    })
    it("It should access a popup dinamically", () =>{
/* Para obter essa URL dinâmica, vamos inicialmente extrair a URL da propriedade de maneira direta e
 * trabalhar com o que é retornado. A partir do a vamos pedir uma propriedade por meio do Jquery, que é o href,
 * e uma vez que temos ele, podemos ter essa extração de propriedades
 * Essa forma deve ser utilizada quando o link do popup que deve ser acessado é desconhecido */
        cy.contains("Popup2").then($a => {
            const href = $a.prop("href");
            cy.visit(href);
        })
/* Podemos agora pedir para que preencha o campo de texto que aparece desse popup. Nesse contexto
 * atual é possível preencher sem problemas, diferentemente de quando ele está em um iframe, tendo
 * em vista que estamos acessando diretamente */
        cy.get('#tfield').type("funcionaaaa").should("have.value", "funcionaaaa");
    })

    it("Should force link on the same page", () =>{
/* Voltando para análise do http do popup, temos o a, a propriedade href e, também temos o target
 * que indica que esse link é um popup. Quando não informamos o target, o link existente em href 
 * abre na mesma página, quando há a informação do target como nesse caso, ele abre em uma janela nova.
 * Agora, vamos tirar esse target e fazer com que o cypress abra o link indicado na mesma página,
 * de modo a dar o controle do que está ocorrendo para o cypress.
 * Inicialmente vamos obter o valor de href e usar o invoke para conseguir chamar o método direto
 * do JQuery e remover o atributo target. Essa é uma maneira diferente de fazer as linhas 66-69 acima*/
        cy.contains("Popup2").invoke("removeAttr", "target").click()
// Após remover o atributo target que faz a url abrir em uma outra janela, clicamos e a mesma página é carregada
        cy.get('#tfield').type("Funcionou na mesma página!")
            .should("have.value", "Funcionou na mesma página!")
    })
})
