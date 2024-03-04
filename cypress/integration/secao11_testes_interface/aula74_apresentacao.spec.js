///<reference types="cypress"/>

import '../../support/commands.js'

describe('Testes mockados do frontend', ()=>{
/* Nessa seção os testes serão feitos sobre outra visão, parecem os testes funcionais, mas iremos isolar
 * o frontend da aplicação. Vamos acessar a mesma URL mas não queremos que o barrigareact acesse a API REST
 * é como se fosse um "teste" unitário. Precisamos também ter conceitos e onhecimento de como funcionam as 
 * aplicações. Há outras formas de testar unitariamente com outras ferramentas, mas ainda conseguimos usar
 * o cypress para isolar uma camada de aplicação completa das outras camadas para conseguir fazer os testes
 * 
 * ARQUITETURA: 
 * APLICAÇÃO    ========>   BACKEND     ========>    BANCO DE DADOS
 * (Barriga React)          (Barriga Rest)
 * 
 * A aplicação envia as requisições de salvar, alterar, deletar, etc, para o BACKEEND (BARRIGA REST), dele
 * para o Banco de dados. No primeiro módulo foi testado o barriga react, no segundo o barriga rest e agora,
 * será testado diretamente no barriga react sem se preocupar com a ligação com o barriga test.
 * 
 * Toda vez que fazemos o teste no cypress, temos o runner onde faz vários controles e dentro dele a aplicação
 * está rodando, é como se o cypress tivesse uma camada externa e na interna a aplicação roda dentro.
 * Ele consegue ver os eventos que partem da aplicação, e o cypress também consegue ver as requisições externas
 * que estão sendo feitas, e ele cosnegue pegar essas requisições e redirecionar para outros locais.
 * 
 * No cypress há uma ferramenta chamada SERVER. Vamos criar um servidor, um MOCK que responde como API, e todas
 * as requisições que forem feitas o cypress vai redirecionar para o servidor. E dentro do servidor, podemos
 * definir a rota e o que vai retornar. Conseguimos definir virtualmente todos os dados que serão apresentados[
 * na aplicação. Dessa forma os testes serão focados apenas na interface, temos um gerenciamento de massa mais
 * simples, não vamos levar mais tempo para executar como é levado pelo módulo 1 de testes funcionais.
 * 
 * São testes de camada de apresentação, parecido com os testes funcionais. Se o front end está funcionando,
 * se os dados que são retornados são os corretos etc. 
 * 
 * Vamos usar o cy.route para mockar as requisições, vamos pedir para que o cypress capture as requisições e 
 * envie para o servidor ou retorne o que pedimos. Quando a aplicação pedir para fazer o método POST na url,
 * como resposta queremos que ele devolva o objeto X.
 * 
 * MAS ATUALMENTE O MÉTODO CY.ROUTE NÃO EXISTE MAIS, AGORA É O CY.INTERCEPT QUE PODE SER CONSULTADO NA DOCUMENTAÇÃO
 * E PODEMOS USAR ESSE BASICAMENTE NOS MAIS NOVOS.
 * NO INTERCEPT mandamos como objeto apenas o método, a url e, depois criamos um outro parâmetro que será resposta
 * O status code seraá também retornado no segundo parâmetro. O primeiro parâmetro é apenas o objeto uqe envia os
 * parâmetros para realizar as ações desejadas de acordo com o método enviado.
 * 
 * Como dito anteriormente, os testes agora não acessarão mais o backend da API, vamos fazer operações que 
 * façam com que seja simulado o acesso ao backend com a criação do servidor. 
 * Usando o cy.server e também definir uma rota que simule o comportamento da API. 
 * Vamos fazer isso no navegador inicialmente observando as rotas usadas para ter uma noção de como é
 * feita a rota. Como exemplo na rota signin é do tipo POST e devolve um resultado específico.
 * Para enviar a rota, após consultar no navegador, usamos o método cy.route() e passamos os parâmetros
 * desejados, enviamos quase os mesmos parâmetros que devem ser enviados. Ao invés de dizer o que vai no body,
 * vamos dar a resposta. Colocamos o method, url, response com id, nome, token que é o que deve ser respondido,
 * em vez de ir para a API ele irá agora para o servidor.   
 */

    before(()=>{
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: {
                id: 1000,
                nome: 'usuario falso',
                token: 'String token falso'
                }
            })
        cy.login('testeteste@fakegmail.com', '987@SENHA123@')
    })


    it('LOGIN', () => {


    })
})
