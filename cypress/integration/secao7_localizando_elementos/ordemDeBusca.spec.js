/// <reference types="cypress"/>

describe("Localizando Elementos", ()=>{
    before(()=>{    cy.visit("https://wcaquino.me/cypress/componentes.html");   })
    beforeEach(()=>{    cy.reload() })

    it("Ordem de Busca", () => {
/* Normalmente a ferramenta do cypress já escolhe qual é a estratégia que você deve usar;
 * A disponibilidade dos atributos já é uma forma que ele usa para escolher qual estratégia estará sendo
 * usada. Mas quando temos vários campos dispon´vieis como ele vai escolher? Nesses casos podemos indicar
 * temos o ocontrole de indicar para o Cypress qual estratégias queremos usar. Na documentação
 * podemos procurar por locator selector playground, que vai indicar qual é a ordem de prioridade que 
 * o Cypress faz por padrão: Irá priorizar IDs, class e depois atributos.
 * 
 * A prioridade normal do Cypress é: 
 *      data-cy, data-test, data- testid, data-qa, id, class, tag, atributos, nth-child
 * Temos a opção de alterar a prioridade se necessário, ou manter está que já é
 * seguida pelo cypress normalmente;
 *  
 * O ID é usado para testes mas também para outras situações, algumas vezes podem ser feitas
 * manutenções que vão alterar o ID, mas as tags criadas para testes são feitas especificamente para isso
 * e são as preferências; Elas dificilmente vão ser alteradas com o tempo;
 * 
 * Podemos copiar um exemplo de código que vai mudar a prioridade e podemos usar no index.js
 * para colocar lá o comando para dar certo. Depois só dar um reload no programa para ver o funcionamento
 * 
 * Na maioria das vezes é melhor deixar que o cypress faça a busca inteira por conta quando não achar algo ele vai indo por outro;
 * Podemos também criar uma tag própria para ser usada em testes. E, devemos
 * colocar essa tag, indicar que ela existe agora no documento index para que ele reexecute o teste e reconheça esssa
 * estratégia de busca que não era antes usada e tornou-se uma possibilidade; */
    })

    it("LOCATORS USANDO JQUERY SELECTOR", () => {
/* Algumas vezes o Cypress não vai fornecer uma forma de busca apropriada, assim, podemos realizar uma alteração;
 *
 * Revisão JQUERY SELECTOR QUE PODEMOS USAR:  https://www.w3schools.com/jquery/jquery_ref_selectors.asp
 * O primeiro que ele recomenda é a #id. Ou o .class, ainda o elemento que é a tag, ou tags html, e
 * vai encontrar qualquer elemento que tem essa tag e o que dejesamos e, ele vai indo das mais específicas
 * para as mais genéricas; Como indo de talvez um id para um atributo mais genérico que está disponível;
 * Também podemos realizar buascar direto no html da página, como fazer buscas de selector
 * dentro do conteúdo que já estava na sala.
 * 
 * Por exemplo, queremos um input que está dentro de uma tabela; Muitas vezes as páginas
 * não tem um id especíico ou tags de testes que podem ser usadas para o cypress de maneira geral;
 * Nem todos os projetos colocam tags específicas para que possam ser usadas em testes, assim é necessário saber
 * outras alternativas para conseguir referenciar corretamente o elemento;
 * 
 * Ex: conseguir referenciar a tabela. Compor o caminho para tabela que apresenta um tbody que é onde está o corpo da tabela;
 * Como podemos compor esse caminho? Usamos o nome do elemento seguinte para compor o caminho;
 * Ficando inicialmente algo como: table#tabelaUsuarios tbody
 * Esse espaço entre o tabelaUsuarios e tbody indica que ele é um elemento descendente do tabelaUsuarios;
 * Outra maneira de indicar que um elemento é descendente de outro, é usando o > .Contudo, o elemento deve ser um 
 * descendente direto do elemento pai; Nesse caso o body não é um elemento direto do elemento de id tabelaUsuarios, então esse exemplo de
 * montar a busca com o uso de > não vai funcionar;
 *  
 * Voltando para a busca feita sem o uso de > e apenas de espaço, ficaria algo como: 
 *          table#tabelaUsuarios tbody
 * Podemos descer até a marcação tr para reduzir o escopo para apenas 1 linha, usando o filho direto para referenciar com >
 * e depois para conseguir o td, o terceiro td que queremos e não o primeiro, fazemos da seguinte maneira: 
 *          table#tabelaUsuarios tbody>tr td:nth-child(3)>input
 * Podemos depois copiar esse caminho que foi montado e colocar no cy.get para testar se foi feito da maneira correta */
             cy.get('table#tabelaUsuarios tbody>tr td:nth-child(3)>input');
/* Mas com essa busca houve um retorno de 5 elementos, não sendo o ideal. Para ajustar ela, podemos inserir que queremos 
 * que o tr seja igual índice 0 para indicar que o desejado era o primeiro botão de Clique aqui, ficando igual o comando abaixo: */
            cy.get('table#tabelaUsuarios tbody>tr:eq(0) td:nth-child(3)>input');

    })
})
