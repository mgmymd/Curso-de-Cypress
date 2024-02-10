/// <reference types="cypress"/>

describe('Testes dinâmicos', () =>{
    before(()=>{    cy.visit("https://wcaquino.me/cypress/componentes.html");   });
    beforeEach(()=>{    cy.reload() });

    const foodList = ['Carne', 'Frango', 'Pizza', 'Vegetariano'];
/* Para cada um dos registros agora podemos realizar ações utilizando o forEach e dentro teremos um laço, que vai realizar
uma execução para cada um dos valores e é nesse ponto que iremos variar a comida, obtendo 4 testes variados para os 4 tipos de sabores existentes. */
    foodList.forEach(food => {
    it(`Cadastro com comida ${food}`, ()=>{
/* Vamos criar um array contendo os 4 valores de comidas, o foodList e reaproveitar o código que temos de 
 * fixtures; E, a comida, poderíamos passar o que está na fixture ou usar o value, mas o que foi criado no
 * foodList não é o value e sim com o label, pelo label queremos chegar nos botões e nesse caso vamos usar o XPath.*/
            cy.get('#formNome').type('Usuário');
            cy.get('[data-cy=dataSobrenome]').type('Qualquer');
            cy.get('[name=formSexo][value=F').click();
/* Em vez de usar o cypress vamos usaro XPATH e //label[contains(., 'Carne')]/preceding-sibling::input
 * Queremos também deixar isso dinâmico, e vamos fazer uso da label e da lista declarada acima*/
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click();
            cy.get('[data-test=dataEscolaridade]').select('Doutorado');
            cy.get('[data-testid=dataEsportes]').select('Corrida');
            cy.get('#formCadastrar').click();
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!');
        });
    });

    it('Aula 48: EACH, deve selecionar todos com o uso de EACH', ()=>{
/* Agora queremos aproveitar a aula passada e clicar em todas as comidas ao mesmo tempo, não mais clicar
 * em apenas 1 comida a cada vez que atualizar. Uma forma de encontrar todos é através do name, não vamos
 * mais fazer a busca por XPATH mas por cypress. Name=valor e, no click iremos pedir para que ele
 * clique em todos, com o uso de {multiple:true} usando as {} para indicar um objeto */
        cy.get('#formNome').type('Usuário');
        cy.get('[data-cy=dataSobrenome]').type('Qualquer');
        cy.get('[name=formSexo][value=F').click();
/* Uma característica aqui é que não há como marcar carne e vegetariano ao mesmo tempo, então, para fazer 
 * apenas esse teste funcionar. Para evitar marcar a opção vegetariano, vamos usar o each e definir o que 
queremos no bloco de código */
        //cy.get('[name=formComidaFavorita]').click({multiple:true});

        cy.get('[name=formComidaFavorita]').each($el =>{
/* Vamos usar um método do Jquery para retornar o VAL, value, de cada elemento e, como queremos excluir
 * a opção de vegetariano, o value dele é Vegetariano. Usamos a lógica: se o value for diferente de vegetariano,
 * pode clicar, quando for igual a vegetariano não é possível clicar; 
 * Nessa forma irá funcionar em vez de usar apenas o multiple:true, porque não haverá a possibilidade de ter
 * uma contradição que lance a mensagem de erro */
            if($el.val()!='vegetariano'){
                cy.wrap($el).click()
            }
        })

        cy.get('[data-test=dataEscolaridade]').select('Doutorado');
        cy.get('[data-testid=dataEsportes]').select('Corrida');
        cy.clickAlert('#formCadastrar', 'Tem certeza que você eh vegetariano?');
    })
});
