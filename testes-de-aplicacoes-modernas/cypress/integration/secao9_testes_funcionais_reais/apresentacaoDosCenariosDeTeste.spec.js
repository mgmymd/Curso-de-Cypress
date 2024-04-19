/// <reference types="cypress"/>

describe("Instructions and should test at a functional level the webpage", ()=>{
/* Para essa página feita em react é melhor realizar o acesso sem o /login, e criar uma conta com email
 * Podemos usar também o site: https://seubarriga.wcaquino.me/login que foi usado no curso de cucumber e selenium
 * Vamos testar 6 cenários diferentes em 3 distintos contextos;
 * Os cenários são: 1. Inserir Conta; Colocar o email e senha para login, se for a primeira vez que entrar na aplicação n]ao terá conta nem nada, o usuário
 * está com o banco limpo, então para inserir vamos em contas e inserimos outras contas para salvar. Validar a mensagem é o primeiro cenário
 *                  2. Alterar Conta; - Vamos na conta, clicamos em editar e trocamos o nome dela para outro e depois validar a mensagem e o nome;
 *                  3. Inserir Conta repetida; - Vamos alguma conta que já existe repetida, e validar a 
 * mensagem de conta repetida, devemos checar se está aparecendo a mensagem de conta repetida
 *                  4. Inserir Movimentação; - Vamos na opção de movimentação, preencher data da conta, pagamento, descrição, pagamento e a conta que estiver associada; 
 * Indicando também seu status se está ou não paga e se é uma conta de despesa ou de receita, onde temos também a indicação da página de hsitóirico
 *                  5. Cálculo de saída; - O saldo está logo na página inicial e conseguimos observar, aparecem só as 
 * contas que já tem alguma movimentação, então é um teste dependente dos testes anteiores; Uma vez que temos a conta alterada, podemos decidir
 * se queremos que ela tinha o conta e valor. Ou podemos validar também com a criação de uma nova movimentação do tipo receita na mesma conta e 
 * algo já pago para suertir um efeito no saldo, evitando deixar inalterado;
 * Isto é: podemos criar um saldo ou associar a alguma movimentação e ver se foi calculado automaticmaente;
 *                  6. Remover movimentação; - Vamos remover a movimentação na tela de histórico, uma vez que encontramos a conta que queremos remover, podemos clicar em remoção
 * e depois validar o saldo, se ele foi alterado com a remoção da conta;
 * No primeiro módulo serão os cenários ao nível funcional e são as formas mais comuns de testes, No segundo
 * coontexto serão testes a nível de APIs e no terceiro cenário, serão testes a nível de interfacem o backend será
 * mockado e vamos usar apenas a nível de visual, não vamos nos preocupar com gerenciamento de bancos e dados */

before(() => {  
        cy.visit("https://barrigareact.wcaquino.me");

        cy.get('[data-test=email]').type("testeteste@fakegmail.com").should('have', "testeteste@fakegmail.com");
        cy.get('[data-test=passwd]').type("987@SENHA123@");
        cy.get('.btn').click();

// Irá aparecer um toast dizendo "Bem vindo, Meg" e usaremos para verificar se foi feito um login de erro ou de sucesso
        cy.get('.toast-message').should('exist');
        cy.get('.toast-message').should('contain', 'Bem vindo, Meg!');
// Apenas para resetar os dados esta primeira vez
        cy.wait(1500);
        cy.get('[data-test=menu-settings]').click();
        cy.get('[href="/reset"]').click();
        });

    it('Cenário 1: Inserir uma nova conta', () =>{
// Clicar para seguir até a página de contas
        cy.wait(2000);
        cy.get('[data-test=menu-settings]').click();
        cy.get('[href="/contas"]').click();

// Inserir uma nova conta
        cy.get('[data-test=nome]').type('Nova conta inseridaaaa');
        cy.get('.btn').click();

// Validar a inserção correta da conta
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso!');
        cy.get(':nth-child(7) > :nth-child(1)').should('contain', 'Nova conta inseridaaaa');
    })

    it("Cenário 2: Alterar conta", () =>{
// Navegando até a página de contas
    cy.get('[data-test=menu-settings]').click();
    cy.get('[href="/contas"]').click();

// Selecionando a conta a ser alterada e trocando seu nome
        cy.wait(2000);
/* O xpath será utilizado no lugar do cy.get tradicional por ser uma opção mais robusta de busca do que pelo cypress que apresenta um locator que pode variar a posição com o tempo
 * A outra opção disponível pelo cypress é: */
        cy.xpath("//table//td[contains(.,'Nova conta inseridaaaa')]/..//i[@class='far fa-edit']").click();
        cy.get('[data-test=nome]')
                .clear()
                .type("ALTERADOOOOOOO");
        cy.get('.btn').click();

// Validando se a alteração foi feita com sucesso
        cy.get('.toast-message').should('have.text', 'Conta atualizada com sucesso!');
        cy.wait(2000)
        //cy.get(':nth-child(7) > :nth-child(1)').should('have.text', 'ALTERADOOOOOOO');
        cy.xpath("//table//td[contains(.,'ALTERADOOOOOOO')]").should('exist');
    })

    it('Cenário 3: Inserir Conta repetida', ()=>{
// Navegando até a página de contas
        cy.wait(2000)
        cy.get('[data-test=menu-settings]').click();
        cy.get('[href="/contas"]').click();

// Tentando inserir uma conta com o mesmo nome já existente
        cy.get('[data-test=nome]').type('Conta mesmo nome');
        cy.get('.btn').click();

// Validar a não adição de um item repetido
        cy.get('.toast-message')
                .should('have.text', 'Erro: Error: Request failed with status code 400');
    })

    it("Cenário 4: Inserir Movimentação", ()=>{
// Ir para o menu de movimentação a fim de inserir uma nova
        cy.get('[data-test=menu-movimentacao]').click();
        cy.get('[data-test=conta]').should('exist');

// Preencher os conteúdos da nova movimentação
        cy.get('[data-test=descricao]').type('Adicionando uma movimentação aqui');
        cy.get('[data-test=valor]').type('1000000000');
        cy.get('[data-test=envolvido]').type('Fulano');
        cy.get('[data-test=status]').click();
        cy.get('[data-test=conta]').select('Conta com movimentacao');
        cy.get('.btn-primary').click();

// Validar a movimentação inserida
        cy.get('.toast-message').should('have.text', 'Movimentação inserida com sucesso!');
        cy.get('[alt="Filtrar por contas a receber"]').should('exist');

// Validar no histórico se a movimentação inserida está presente
        cy.get(':nth-child(6) > .btn').should('exist').click();
        cy.get(':nth-child(7) > .row > .col-12 > :nth-child(1) > span')
                .should('have.text', 'Adicionando uma movimentação aqui');
    })

    it('Cenário 5: Cálculo de saída', ()=>{
// Voltando para Home
        cy.get('[data-test=menu-home]').click();
// Validando o valor do saldo alterado para a Conta com movimentação
        cy.get('tbody > :nth-child(2) > :nth-child(2)').should('contain', '999.998.500,00');
    })

    it('Cenário 6: Remover movimentação', ()=>{
// Indo para o extrato e removendo
        cy.get('[data-test=menu-extrato]').click();
        cy.get(':nth-child(6) > .btn').click();
        cy.get(':nth-child(1) > .row > .col > [href="#"] > .far').click();
        
// Validando a remoção
        cy.get('.toast-message').should('have.text', 'Movimentação removida com sucesso!')
    })
})
