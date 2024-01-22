/// <reference types="cypress"/>

describe("Desafio: Validar mensagens", () => {
    before(() => { cy.visit("https://wcaquino.me/cypress/componentes.html") })
    beforeEach(() => { cy.reload() })

    it("Recuperar mensagens após cadastrar", () =>{
// Primeira etapa: clicar em cadastrar, capturar a mensagem;
/* Por serem vários alerts que serão trabalhados nesse caso, é necessário criar um stub que 
 * vai receber o alert, o stub facilita o trabalho com os alerts, não sendo necessário trabalhar
 * com promises nessas situações, por serem mais complicadas de gerenciar e ajustar */
        const stub = cy.stub().as('alerta');
        cy.on("window:alert", stub);
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith("Nome eh obrigatorio")
        })
    
// 2: preencher o nome, clicar em cadastrar novamente e pegar a mensagem
/* Para os alerts abaixo, após o primeiro, vamos começar a pegar as outras chamadas, não serão mais índice
zero, mas sim 1 e depois 2, por serem chamadas posteriores */
        cy.get('#formNome').should("exist").type("Oiii");
        cy.get('#formNome').should("have.value", "Oiii");
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith("Sobrenome eh obrigatorio")
        })

// 3: sobrenome, cadastrar e mensagem
        cy.get('[data-cy=dataSobrenome]').type("HEYYY").should("have.value", "HEYYY");
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(2)).to.be.calledWith("Sexo eh obrigatorio")
        })

//4: Escolher o sexo e ter apenas o evento do click
        cy.get('#formSexoFem').click()
        cy.get('#formCadastrar').click()

// 5: Validar as mensagens que vão aparecer após o cadastro correto no final da tela
        cy.get('#resultado > :nth-child(1)').should("contain", "Cadastrado");

    })
})
