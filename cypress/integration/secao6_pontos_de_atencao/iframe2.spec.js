///<reference types="Cypress"/>

describe("Uso de iFrames", () => {
        it("iFrame II: Deve preencher o campo de texto", () => {
            cy.visit("https://wcaquino.me/cypress/componentes.html")
    
    /* Nesse caso, o comando mais simples como: cy.get('#frame1').click().type("Teste") não funciona
     * para iframes. Se fizer um get no fram1 ele retorna um id de uma entidade e mais nada. 
     * Podemos tentar usar uma promise que retorna ifram e dentro dele usar o .contents, que traz os
     * filhos dos elementos contidos e, a partir do content, vamos pedir para pegar uma tag que é o body
     * para conseguir ter acesso a todo o corpo do iframe*/
            cy.get("#frame1").then(iframe =>{
                const body = iframe.contents().find("body");
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
     * Uma forma de conseguir monitorar é trazer o iframe para o escopo principal. Podemos inicialmente
     * testar o escopo externo da url e depois o interno pela url como no teste abaixo.
     * Por estarmos acessando a url do frame diretamente não vai ser mais necessário usar o body*/
        })
        it("iFrame II: Deve testar o frame diretamente", () => {
            cy.visit("https://wcaquino.me/cypress/frame.html");

            cy.get("#otherButton").click();
            cy.on("window:alert", msg => {
                expect(msg).to.be.equal("Click OK!");
            })
    })
})
