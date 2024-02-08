///<reference types="cypress"/>

describe("Outras funcionalidades do Cypress: FIXTURE", ()=>{
    before(()=>{    cy.visit("https://wcaquino.me/cypress/componentes.html");   });
    beforeEach(()=>{    cy.reload() });

    it("Get data from fixture file", function () {
/* Usar dados externos para povoar nossos testes com o uso de fixtures. Há uma pasta chamada fixture, e
 * nela que ficam os dados dos testes. Já há um exemplo de um objeto json. Agora, vamos criar um
 * para povar o formulário, criando um nome arquivo chamado: userData.jason e criar um objeto com a
 * abertura e fechamento de chaves.
 * Para pegar os valores do dataUser.json que é uma fixture, usamos o método do cypress chamado fixture e
 * vamos chamar de usuario e colocar em uma promise com o uso de then
 * 
 * Para nome e sobrenome, queremos apenas escrever algo, usando: */
    cy.fixture('dataUser').as('usuario').then(() => {
        cy.get('#formNome').type(this.usuario.nome);
        cy.get('[data-cy=dataSobrenome]').type(this.usuario.sobrenome);
/* Para sexo e comida, temos que pedir para clicar, mas como clicar no correto? Podemos tentar compor com
 * os parâmetros disponíveis algo que indique qual é o que deve ser clicado, como: 
 *      [name=formSexo][value=F] no lugar de #formSexoMasc
 * Por ser um click nao vamos colocar nada dentro, mas por estar compondo o próprio ID temos que usar 
 * um recurso de colocar a string entre aspas e no lugar do valor da variável*/
        cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click();
        cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click();
/* Para os combos, vamos apenas usar o select algum valor*/
        cy.get('[data-test=dataEscolaridade]').select(this.usuario.escolaridade);
        cy.get('[data-testid=dataEsportes]').select(this.usuario.esportes);
// Ao final de tudo vamos clicar no botão "Cadastrar"
        cy.get('#formCadastrar').click();
// Recebendo a mensagem de texto "Cadastrado!" e outras informações que foram anteriormente selecionadas
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!');
        });
// O click e a mensagem de texto de "Cadastrado!" também poderia estar fora da promise, porque todos os comandos são do cypress
    })
})
