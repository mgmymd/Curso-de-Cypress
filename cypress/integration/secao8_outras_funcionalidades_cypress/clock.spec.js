///<reference types="cypress" />

describe("Outras funcionalidades do Cypress", () =>{
    before(()=>{    cy.visit("https://wcaquino.me/cypress/componentes.html");   });
    beforeEach(()=>{    cy.reload() });

    it("Clock - Going back to past", ()=>{
/* Usar o comando clock para "enganar" o sistema, em algumas páginas há o uso da data do sistema para dar
 * uma informação localizada, como a data e hora do computador ao clicar no botão Click; 
 * Há alguns testes que necessitam do uso de data e hora do sistema e, se deixar um valor fixo no teste
 * pode estar desatualizado. Em outros casos há testes que funcionam apenas em dias específicos; 
 * Usando o modo:         
 *                  cy.get('#buttonNow').click()
 *              cy.get('#resultado > span').should("contain", "09/02/2024")
 * O teste deixará de passar amanhã ou se basear na verificação do horário ele também parará de passar
 * Para ter melhor controle sobre isso, vamos usar o método cy.clock que vai sobreescrever a data ativa 
 * relacionada sobre o tempo para ser controlada através do tick */
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should("contain", "09/02/2024");
// Ao usar esse método e depois prosseguir da maneira correta, estamos garantindo que ele voltou para 31 de dez de 1969
        // cy.clock();
        // cy.get('#buttonNow').click();
        // cy.get('#resultado > span').should("contain", "31/12/1969");
/* Podemos ainda indicar qual é a data que queremos que vá ao usar o clock, criando inicialmente uma constate
 * e depois chamar novamente o clock passando qual é a data que queremos que ele assuma;
 * O clock não pode ser usado mais de duas vezes no mesmo teste para avançar, isso explica o fato de ter sido comentado acima  * */
        const dta = new Date(2012, 3, 10, 15, 23, 50);
        cy.clock(dta.getTime());
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should("contain", "10/04/2012");
    })

    it("TICK: Goes to the future", () =>{
/* Como avançar no tempo usando o tick: definindo um tempo e avançando ele de acordo com a necessidade, controlando
 * a quantidade de tempo que é avançada. Nesse teste vamos usar o botão de tempo corrido:  
 *              cy.get('#buttonTimePassed')
 * Toda vez que clicarmos nesse botão o resultado será diferente por indicar quantos milissegundos de tempo passaram
 * de agora até alguma data no futuro; O Uso de should contain vai dar erro, pelo fato de ser algo diferente, 
 * poderíamso tentar usar só os primeiros milissegundos que é algo mais estável e demora mais para ser alterado, contudo
 * em algum momento ele vai ser alterado. Para fazer a validação vamos invocar um método que dê o valor do campo,
 * que será o método text e verificar depois que esse texto que vai vir, vai ser extraído, deve ser maior que o valor que acabamos
 * de coletar, porque com certeza o próximo valor a ser dado vai ser maipor do que o valor obtido no momento em queo teste está sendo feito */
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').should('gt', '1707495155658');
/* Podemos inicialmente resetar o tempo com o uso do método clock e depois que clicar nele, quando pedir para ver
 * novamente o tempo que passar vamos executar e observar que o clock restaurou o tempo para zero e depois podemos
 * trocar para lt ou equal zero; */
        cy.clock();
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').should('lte', '0');
/* Agora, para começar a avançar o tempo para frente, vamos usar o comando tick para 5000 milissegundos sejam passados
 * O uso do comando cy.wait(5000) não altera o tempo mesmo que haja uma espera de 5000 milissegundos;
 * Com o uso do tick é possível fazer a validação da maneira correta do tempo que foi transcorrido; 
 * E, se precisar mais tempo só é necessário colocar mais ticks seguidos para avançar no tempo; */
        cy.tick(5000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').should('gte', '5000');
        cy.tick(10000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').should('gte', '15000');
    })
})
