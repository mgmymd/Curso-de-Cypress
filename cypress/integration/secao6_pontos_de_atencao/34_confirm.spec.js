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
/* Também é da família do alert e parecido com ele. 
*/

    })
})
