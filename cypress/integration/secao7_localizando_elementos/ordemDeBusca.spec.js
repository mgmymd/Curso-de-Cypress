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
 * 
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
             cy.get('table#tabelaUsuarios tbody > tr td:nth-child(3) > input');

/* Mas com essa busca houve um retorno de 5 elementos, não sendo o ideal. Para ajustar ela, podemos inserir que queremos 
 * que o tr seja igual índice 0 para indicar que o desejado era o primeiro botão de Clique aqui, ficando igual o comando abaixo:
 * O click será para receber o alerta "Francisco" que aparece no cypress */
            cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input').click()

/* Mas há uma forma mais rápida de chegar neste elemento. Pelo código http, podemos observar que ele
 * o value "Clique aqui", que pode ir diretamente pelo value usando os colchetes, ficando:
 *          [value="Clique aqui"]       que retorna 5 valores
 * 
 * Melhorando a situação usando outra propriedade, o oncliclk:
 *          [onclick='alert('Francisco\')']     Mas não é uma boa estratégia se for um código muito grande
 * após o =, podemos então fazer com que procure uma parte da frase ou uma palavra apenas, colocanod um *
 * após o onclick:      [onclick*='Francisco']      e com isso vai encontrar apenas 1 valor. Para colocar
 * agora com um comando do cypress, precisamos colocar um caracter de escape, a barra, para poder 
 * usar as aspas internas e externas existentes: */
            cy.get('[onclick*=\'Francisco\']')
// Ou fazer ainda uso de aspas duplas e depois de aspas simples para que o cypress aceite
            cy.get("[onclick*='Francisco']")

/* Agora, queremos chegar no primeiro registro da tabela cuja escolaridade seja "Doutorado". Para
 * isso usa-se a busca por um td que contenha o valor 'Doutorado', ficando:
            td:contains('Doutorado')        Mas apenas isso não é possível que encontre a linha correta
 * 
 * Podemos reduzir o escopo através de tabela, usando o id da tabela, colocando que a table cujo id
 * seja tabelaUsuarios e tenha o td que contenha o valor Doutorado: table:tabelaUsuario td:contains('Doutorado')
 * inserido no cypress para ver se é capaz de encontrar;
 * Também podemos usar apenas o id da tabela, irá funcionar sem a necessidade de indicar table#tabelaUsuarios
 * ficando: #tabelaUsuarios td:contains('Doutorado'), mas irá retornar 3 valores distintos  */
            cy.get("table#tabelaUsuarios td:contains('Doutorado')")
            cy.get("#tabelaUsuarios td:contains('Doutorado')")

// Para reduzir mais o escopo do que será encontrado, podemos pedir que o índice seja igual a zero
            cy.get("#tabelaUsuarios td:contains('Doutorado'):eq(0)")
            
/* Agora, queremos chegar no input desta linha que apresenta pela primeira vez o valor Doutorado de
 * escolaridade. Assim, queremos chegar em seu irmão. Pelo código http e usando o w3school 
 * podemos checar qual comando jquery podemos usar: como o ~ para chegar em algum td específico, 
 * que será o td referente ao input, nesse caso o td 3 e dentro deste td3 queremos seu input */
            cy.get("#tabelaUsuarios td:contains('Doutorado'):eq(0) ~ td:eq(3) > input")

/* Isso pode ser usado quando não há uma tag, um id específico para ser usado para testes
 * Podemos também usar outra busca, ao invés de buscar um td que contenha 'Doutorado', vamos pedir que encontre
 * uma linha tr que tenha Doutorado e o índice seja zero e depois um td igual a 6 e dentro dele o input
 * Nessa estratégia navegamos até a linha que apresente pela primeira vez o "Doutorado" e depois
 * nos filhos desta linha vamos até o input */
            cy.get("#tabelaUsuarios tr:contains('Doutorado'):eq(0) td:eq(6) input")

    })
})
