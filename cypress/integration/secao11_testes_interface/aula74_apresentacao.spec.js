///<reference types="cypress"/>

import '../../support/commands.js'
import loc from '../../support/locators.js'

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
        cy.visit('https://barrigareact.wcaquino.me')
        cy.server()
        cy.route({
            method: 'POST',
            url: '/signin',
            response: { id: 1000, nome: 'usuario falso',token: 'String token falso'}
            }).as('signin')
/* Vai gerar um erro 401 que ocoorre quando não enviamos um token ou quando mandamos um token
 * que ele não reconhece. Temos também temos um componente novo chamado routes, relacionada com a url signin,
 * tem um stub relacionado a ela e foi invocado 1 vez apenas.
 * 
 * A outra rota que está gazendo é o /contas que mostra que retornou vazio, depois de fazer a busca em saldo.
 * No navegador copiamos a resposta de /contas e colocamos como o retorno esperado.
 * Será definido como uma outra rota, com o método get para a url /saldo.
 * Após a execução dela é possível ver 2 routes marcados no cypress, cada um executado 1 vez, com alias e strub
 * No before all ele faz o login com sucesso, e é possívelver os momentos em que o signin e o saldo são invocados
 * e o momento em que o saldo é retornado.   */

        cy.route({
            method: 'GET',
            url: '/saldo',
            response:[{"conta_id": 666,"conta": "Carteira",  "saldo": "1000"},
                    { "conta_id": 999, "conta": "Banco",  "saldo": "1000000000000000000"}
            ]
        }).as('saldo')

        cy.login('fake@email', 'senhaErrada')

/* Nesses tipos de testes estamos tendo que definir manualmente os retornos que devem ser 
 * obtidos para cada tipo de teste e requisição, por estamos testando de forma mockada e isolada,
 * apenas o frontend da aplicação, e não fazendo testes funcionais dela. */
    })

    beforeEach(() =>{
        cy.get(loc.MENU.HOME).click()
    })

    after(() =>{
        cy.clearLocalStorage();
    })

    it('Inserir conta', () => {
/* Executando no navegador o passo a passo de inserir uma conta, a primeira que temos no /conta é do
 * tipo get e como resposta tem um array com todas as contas que devem ser exibidas na tela e queremos
 * ver. */
        cy.route({
            method:'GET',
            url: '/contas',
            response:[{"id": 1, "nome": "Carteira", "visivel": true,"usuario_id": 1},
                    { "id": 2,"nome": "Banco", "visivel": true, "usuario_id": 2}]
            }).as('inserir conta');

            cy.route({
                method:'POST',
                 url: '/contas',
                 response:[{"id":3,"nome":"Conta de teste","visivel":true,"usuario_id":3}]
            }).as('listar conta');

/* Pegou as contas, escreveu conta de testes, mandou salvar, foi aceita e retornou a mensagem de 
 * conta inserida com sucesso. Mas no get final para mostrar a lista atualizada ele trás apenas 
 * duas contas. Podemos redefinir a rota, mas num momento mais oportuno e depois queremos ver 
 * a rota atualizada, então iremos deixar após o cy.route('post') os comandos de acesso ao menu de contas
 * Uma vez que acessou  o menu de rotas,iremos redefinir a rota get após acessar o MENU CONTAS,
 * adicionado o registro para conta recém adicionada, a Conta de Teste
 * 
    // Clicar para seguir até a página de contas */
        cy.wait(4000);
        cy.acessarMenuContas();

    // Redefinindo para que possa ser apresentado na interface gráfica a presença desta terceira conta:
        cy.route({
            method:'GET',
            url: '/contas',
            response:[{"id": 1,"nome": "Carteira","visivel": true,"usuario_id": 1},
                    { "id": 2, "nome": "Banco", "visivel": true,"usuario_id": 2},
                {"id": 3,"nome": "Conta de teste","visivel": true,"usuario_id": 3}]
            }).as('contasSave');

    // Inserir uma nova conta
        cy.inserirConta('Conta de teste');

    // Validar a inserção correta da conta
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!');
    })

    it('Alterar conta', () =>{
/* No navegador podemos realizar o processo manual de alterar uma conta e ver todas as etapas que 
 * são realizadas. Primeiro precisa recuperar as contas GET que dão todas as contas */
        cy.server()
        cy.route({
            method:'GET',
            url: '/contas',
            response:[{ "id": 1,"nome": "Carteira","visivel": true,"usuario_id": 1},
                    {"id": 2,"nome": "Banco","visivel": true,"usuario_id": 2}]
            }).as('contas');

/* Agora selecionamos qual conta deverá ser alterada, a conta Carteira, e então por ser a de id 1,
 * ela que deve ser a alterada ao final. 
 * Para isso deve-se criar uma rota para ela agora, com base no que pode ser visto no navegador usando
 * o PUT que fez a alteração. Podemos na response copiar e colá-la, alterando para os dados da conta
 * de id igual a 1. Será usado uma url /contas/1 para indicar que é o elemento de 1 que queremos alterar
 * No lugar do 1, também é possível colocar dois asteriscos, **, após o /contas, ficando:
 * /contas/** para que ele aceite qualquer coisa após os * */
            cy.route({
                method:'PUT',
                url:'/contas/1',
                response: {"id":1,"nome":"Conta de teste","visivel":true,"usuario_id":1}
            })

    // Navegando até a página de contas
    cy.acessarMenuContas();

    // Selecionando a conta a ser alterada e trocando seu nome
            cy.wait(4000);
            cy.xpath("//table//td[contains(.,'Carteira')]/..//i[@class='far fa-edit']").click();
            cy.get(loc.CONTAS.NOME)
                    .clear()
                    .type("Carteira");
            cy.get(loc.CONTAS.BTN_SETTINGS_CONTAS).click();

    // Validando se a alteração foi feita com sucesso
            cy.get(loc.MESSAGE).should('exist');
            cy.get(loc.MESSAGE).should('have.text', 'Conta atualizada com sucesso!');
    })
})
