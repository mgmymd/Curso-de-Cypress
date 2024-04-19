/// <reference types="cypress"/>

describe("Adicionando plugins", () => {
/* Agora usando o localizador Xpath, mas ele não é um dos padrões no cypress, vamos adicioná-lo por plugin
 * Podemos adicionar um plugin usando o próprio site da documentação do cypress
 * Cypress-xpath não é mais suportado:
 * @cypress/xpath has been deprecated and is no longer supported.
 * https://docs.cypress.io/plugins 
 * Se quiser instalar mesmo assim: npm install cypress-xpath*/

    before(()=>{    cy.visit("https://wcaquino.me/cypress/componentes.html");   })
    beforeEach(()=>{    cy.reload() })

    it("Using cypress-xpath: instalação", () => {
        cy.xpath('//input')
    })

    it('Xpath', () => {
/* O xpath foi criado para fazer buscas por meio de caminhos XML, mas pela linguagem de marcação em
 * http com a abertura e fechamento de tags também podemos usá-lo
 * O plugin não é tão integrado como a busca normal do CYpress, atualmente está depreciado.
 * Se procurarmos comum //input ele vai encontrar o primeiro input da tela no código html, no cypress
 * o uso de input:eq(0) ele vai devolver o primeiro botão do html, que é o clique me!
 * 
 * Como funciona o Xpath? Ele funciona por navegação, onde a barra vai indicar o próximo nível. Uma barra s[o
 * queremos dizer qual elemento que queremos encontrar. O elemento nesse caso é a TAG do html.
 * Quando colocamos uma única barra e estamos no início do documento, a única coisa que podemos procurar é o
 * html. Se for procurar o head, ele não encotnratrá, mas se colocar um html ele vai encontrar. Depois de realizar
 * a busca por html podemos descer o nível e ir para o body e dentro dele ir para o div, form, etc; 
 * Podemos ir navegando até chegar no h3 ou nos inputs;
 * Para mais detalhes do XPath há a documentação: XPath Rosetta Stone; Esse documento tem uma tabela que apresenta
 * vários locators do XPath que podem ser usados. Por exemplo: o /hmtl pode ir continuando para o body...
 * 
 * A barra única / é o que define cada etapa da busca que é feita pelo XPath
 * 
 * O barra barra (//) Para chegar no h0 de uma vez podemos usar só //input, ele vai descer automaticamente até
 * encontrar o primeiro input que deseja-se procurar. Ele pula essa navegação manual até achar o primeiro 
 * Ele só vai procurar o input dentro desse body;
 * Podemos também usar atributos para realizar a busca. Como u os de @ por exemplo
 * 
 * Podemos usar: (//input[@type='button'][@value='Clique aqui']). Para deixar essa busca mais específica ainda,
 * podemos usar números, contudo, por estar sendo procurado uma tabela e o fato de tabelas serem dinâmicas,
 * é mais interessante utilizar a busca por valores,propriedades, tipos sem o uso de números, ficando:
 * (//input[contains(@onclick, 'Francisco')]) retornando uma consulta única que econtrou apenas o elemento Francisco */
        cy.xpath("//input[contains(@onclick, 'Francisco')]");

/* Para realizar uma busca mais trabalhosa, para chegar no mesmo elemento: podemos vir pela tabela, 
 * cuja propriedade id seja igual ao id da tabela: 
 *              //table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]
 * Esse caso queremos chegar automaticamente no td que é o primeiro exemplo na tabela, e que contenha o texto
 * 'Francisco', como esse não tem propriedade podemos usar um ponto e depois a vírgula com o texto. Para chegar
 * agora no botão 'Clique aqui' devemos lembrar que o  Francisco não está em nível hierárquico, mas é um irmão.
 * Podemos usar agora o following-sibling::td/input <-Que queremos um td que abaixo dele tenha um irmão. Ficando:
 *          //table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/following-sibling::td/input
 * 
 * Outra forma de realizar essa busca para chegar no input: //table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/
 * Depois adicionamos outra barra / e pedimos para subir o nível com o uso de um pónto,como:
 * //table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input
 * E uma vez que já estamos no nível da linha podemos usar apenas o input após a barra  */
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/following-sibling::td/input");
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input");

/* Agrora, seguindo o exemplo acima, mas para o exemplo ca caixa de texto da tabela com o título INPUT:
 * Sabemos que deve conter doutorado:
 *      //table[@id='tabelaUsuarios']//td[contains(., 'Doutorado')](2)/..//input(@type='text') */
       // cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Doutorado')](2)/..//input(@type='checkbox')")

/* Agora, queremos chegar no campo de texto da tabela, na coluna Input, cujo nome da primeira coluna seja "Usuario A"
 * e a segunda coluna seja Escolaridade="Mestrado" e depois escrever neste campo de texto disponível.
 * //td[contains(., 'Usuario A')] E uma vez que esse usuario A foi encontrado, queremos o seu irmão que é Mestrado
 * usando o: /following=sibling::td[contains(., 'Mestrado')] e, agora vamos subir o nível com um /.. E
 * depois para descer no nível que queremos usamos o: /..//input[@type='text']   */
    cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']")
        .type('XPATHHH')

    })
})
