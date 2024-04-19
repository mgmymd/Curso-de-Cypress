///<reference types="Cypress"/>

describe("Uso de iFrames", () => {
/* Um iFrame é como se utilizasse uma parte da tela e colocasse uma segunda tela inteira dentro dela
 * Como exemplo, o site usado nos testes, o trecho inferior de Elemento Externo apresenta uma 
 * renderização de uma segunda tela inteira, esta é simples e apresenta apenas uma mensagem e sua
 * caixa de input. Mas poderia ter mais coisa se fosse mais composta.
 * A forma de se trabalhar com iFrames acaba sendo diferente até para ações básicas, como o de 
 * realizar um input em uma caixa de texto; */

    it("iFrame I: Deve preencher o campo de texto", () => {
/* O visit no caso dos iframes acaba ficando dentro do it, pelo fato de */
        cy.visit("https://wcaquino.me/cypress/componentes.html");

/* Nesse caso, o comando mais simples como: cy.get('#frame1').click().type("Teste") não funciona
 * para iframes. Se fizer um get no fram1 ele retorna um id de uma entidade e mais nada. 
 * Podemos tentar usar uma promise que retorna ifram e dentro dele usar o .contents, que traz os
 * filhos dos elementos contidos e, a partir do content, vamos pedir para pegar uma tag que é o body
 * para conseguir ter acesso a todo o corpo do iframe*/
        cy.get("#frame1").then(iframe =>{
            const body = iframe.contents().find("body");
/* Esse body não está sendo gerenciado pelo cypress, então teremos que usar o wrap para colocar
 * constante body, e, depois, no navegador procurar o id da caixa de texto que vai receber o input 
 * para poder encontrar algo cujo id sejá igual aquele valor, como tfield
 * Por último pode ser usada a assertiva de maneira encadeada, o assert não será um contain,
 * pelo fato de ser uma caixa de texto que está sendo usada e não um campo de texto normal, sendo 
 * assim, have.value será utilizado para realizar a verificação/validação */
            cy.wrap(body).find("#tfield")
                .type("funciona agora?")
                .should("have.value", "funciona agora?");
            cy.wrap(body).find("#otherButton").click();

        })
/* Contudo, o que foi feito acima acaba sendo um pouco limitado, como exemplo no caso em que clicamos
 * no botão ao lado do input do texto que faz parte do iframe e lança um alert com um OK 
 * E, nesse caso o cypress não teve um comportamento comum, não foi possível rastrear dentro do iframe.
 * A forma correta de fazer nesse caso, será levar para dentro da promise os dados do id do botão que
 * desejamos que clique e está contido no iframe, como visto na linha 31 para baixo.
 * Novamente, nesse caso do botão, o get não funcionará sozinho, será necessário usar o wrap e o body,
 * para pedir que seja feita a pesquisa pelo ID do botão;
 * Mas, não será possível executar esse teste, pelo fato de que o cypress não está rastreando
 * a mensagem que é liberada de alert após clicar no botão presente no iFrame e, o próprio clique já
 * no botão que pertence ao iframe já está travado. Essa é uma das limitações vistas até o momento 
 * quanto ao uso de cypress em testes */
    })
})
