/// <reference types="cypress"/>

describe('Pontos de atenção II', () =>{
    before(() => { cy.visit("https://wcaquino.me/cypress/componentes.html") })
    beforeEach(() => { cy.reload() })

    it('Confirm', () => {
/* Também faz parte da família do alert; É o evento de confirme. É a mensagem como o alert e que apresenta
 * As opções de cancelar e ok/aceitar. Ele traz dois botões que devem ser clicados para que o navegador deixe de estar travado
 * O evento que vamos testar é o de clicar no botão, verificar a mensagem de confirme, e também confirmar inicialmente
 * o confirm e depois clicar no negar,pegando as duas mensagens que aparecem;
 * Vamos criar um método baseado na aula anterior de mockar o alert.
 * Ele vai pegar dois eventos, o primeiro que é o evento de confirme que vem a mensagem principal com os 2
 * botões e, o segundo evento que ele vai pegar é o alert com a mensagem CONFIRMADO após apertar OK. */
        const stub = cy.stub().as('Confirm!!')
        cy.get('#confirm').click()
/* Podemos ver o comportamento padrão do cypress, quando aparece a mensagem do tipo confirm ele já dá o ok
 * se maneira automatica, não dá a negativa, então não precisa nesse momento interagir, só validar as mensagens
 * necessárias, que são os eventos de confirm e de alert.
 * Quando vem um evento de confirme, ele vem por padrão com uma mensagem então queremos que esta seja verificada */
        cy.on('window:confirm', msg =>{
            expect(msg).to.be.equal('Confirm Simples')
        })

// Quando vier a mensagem de alert queremos que ela também seja validada, ou seja, que seja Confirmado
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
/* Poderíamos também inverter a ordem, cadastrando inicialmente as promises esperadas que são de:
        cy.on('window:confirm', msg =>{
            expect(msg).to.be.equal('Confirm Simples')
        })
                cy.on('window:confirm', msg =>{
            expect(msg).to.be.equal('Confirm Simples')
        })
 * E, depois fazer a ação, click(), que vai disparar os eventos de confirm e alert é uma maneira mais lógica
        cy.get('#confirm').click()
*/
        })
    })

    it('Not Confirm', ()=>{
/* Agora, como segundo cenário, vamos negar o evento confirm que é feito de maneira diferente do anterior
 * Para fazer que o cypress clique no cancelar, no evento de confirm, vamos mandar um return false
 * Dentro da função usada pelo window:confirm
 * */
        cy.on('window:confirm', msg =>{
            expect(msg).to.be.equal('Confirm Simples');
            return false;
        })
        cy.on('window:alert', msg =>{
            expect(msg).to.be.equal('Negado');
        })
        cy.get('#confirm').click()
    })
    it('Prompt', () => {
/* Também é da família do alert e parecido com ele. O Prompt é a caixa de mensagem que parece o alert
 * e tem uma mensagem, uma caixa de texto para preenchimento e os botões de Ok e cancelar;
 * Depois de inserir a mensagem podemos enviar ou cancelar o envio.
 * O cenário de teste é clicar no prompt, inserir um número, confirmar e obter a carinha feliz; 
 * Vamos usar o cypress para mockar o método prompt do window, usar uma promise e fazer retornar
 *  o objeto window da página, que é o objeto que está gerenciando toda a página. Na promise, 
 * then, vamos passar o nome do objeto e o parâmetro que queremos abaixo há o stub para
 *  o método prompt. O stub cria um método próximo do comportamento real, mas para evitar
 * o retorno undefinied devemos passar um comportamento para que ele retorne, temos que usar
 * o .returns(42) para indicar que queremos que ele retorne o 42 nesse método */

        cy.window().then(win => {
            cy.stub(win, 'prompt').returns("42");
        });

/* Depois de ter utilizado a promise e o stub é possível realizar as confirmações abaixo*/
        cy.on("window:confirm", msg => {
            expect(msg).to.be.equal("Era 42?");
        });
        cy.on("window:alert", msg => {
            expect(msg).to.be.equal(":D");
        });
        cy.get('#prompt').click();

    })
})
