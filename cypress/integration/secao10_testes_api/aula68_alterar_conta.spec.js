/// <reference types="cypress" />

import '../../support/commands.js'

describe('Testes de serviços Rest com Cypress - API', () =>{
    let token

    before(() =>{
        cy.getToken('testeteste@fakegmail.com', '987@SENHA123@')
            .then(tken => {
                token = tken
            })      })

    beforeEach(() =>{   cy.resetRest()     })

    it('Alterar conta', () => {
/* Para ver o processo, vamos inicialmente no navegador realizar o caminho até a tela de contas e escolher
 * a que desejamos alterar para observar como realizar o teste da API. Podemos observar os pacotes e os IDs
 * No caso de alterar uma conta, vamos apenas ter o número do ID como nome do pacote após alterar e salvar,
 * mas ao clicar especificamente no pacote podemos ver todo caminho e o ID da conta que foi alterada.
 * Podemos passar os parâmetros pelo header, pelo body ou por outra forma que é passando pela URL. Vamos
 * copiar a URL de requisição do pacote com o número como nome e o método de requisição do tipo PUT
 * 
 * Apenas com isso: 
 *         cy.request({ url: 'https://barrigarest.wcaquino.me/contas/2046733',
                method: 'PUT',
                headers: {Authorization: `JWT ${token}`},
                body:{
                    nome: 'Conta alterada'
                }})
            .as('response')

 *          cy.get('@response').its('status').should('be.equal', 200)
 * Vamos ter um problema, um erro 404 - Not found. Pelo fato de que toda vez que apagarmos, resetarmos, os dados
 * da conta que estamos alterando o nome, ele vai apagar todos os registros existentes e alterar, assim, os
 * IDs são alterados/trocados. Não temos como garantir que ele faça a que tenha que alterar
 * Iremos então consultar as contas através de atributos, quando a API foi criada, cada conta teve um atributo
 * distinto dado à ela, assim é possível realizar essa consulta de contas desta maneira, sem ser por ID.
 * Mas em outros casos talvez fosse necessário pensar em outra forma de realizar o assert.
 * 
 * O método a ser usado vai ser do tipo GET, porque queremos consultar um recurso e não vamos utilizar o ID
 * Podemos usar só o /contas, e usar o headers com o token de autorização. Usaremos também um atributo chamado
 * qs, e diremos o que queremos colocar na consulta, como o nome da conta,  e depois usar o .then(res=>console.log(res))
 * para poder observar o resultado 
    *                 cy.request({ method: 'GET',
                        url: '/contas',
                        headers: {Authorization: `JWT ${token}`},
                        qs: {   nome: 'Conta para alterar'  }
                    }).then(res=>console.log(res))
 * Seguindo no console do cypress o caminho: Request > {Request Body: null, Request Headers: {…}, Request URL: "https://barrigarest, Response Headers: {…}, …} > body > 0 
 * Iremos ver que o id é retornado com o que queríamos e também o status code correto. Seguindo agora
 * pelo caminho no console do cypress: allRequestResponses: Array(1) > 0 > Request URL
 * podemos observar a URL utilizada na requisição para alterar o valor: Request URL: "https://barrigarest.wcaquino.me/contas?nome=Conta%20para%20alterar"
 * Após o /contas há uma interrogação mais o atributo nome e o valor para alterar. Passamos as informações dessa forma com o /
 * Os outros caracteres são a conversão feita pelo próprio cypress para poder usar, uso de regex;
 * 
 * Agora sabemos que dentro do res temos uma propriedade que indica o que queremos alterar, a URL que iremos usar.
 * Podemos então tirar o .then(res => console.log(res)), e colocar no lugar de console.log(res) o comando
 * utilizado pela primeira vez, alterando a URL dele com o uso de interpolação e, dentro da interpolação
 * será a resposta.body[0], [0], porque esse elemento que queremos está dentro de um array e, dentro do array
 * queremos a propriedade id para poder realizar a busca na conta com o ID correto.
 * Podemos depois colocar de volta o GET @responde para verficar se a atualização está sendo feita corretamente
 * */
                cy.request({ method: 'GET',
                    url: '/contas',
                    headers: {Authorization: `JWT ${token}`},
                    qs: {   nome: 'Conta para alterar'  }
                }).then(res => cy.request({ url: `/contas/${res.body[0].id}`,
                                            method: 'PUT',
                                            headers: {Authorization: `JWT ${token}`},
                                            body:{    nome: 'Conta alterada'   }})
            .as('response'))

            cy.get('@response').its('status').should('be.equal', 200)
    });

    it('Inserir conta repetida', () =>{
/* Podemos usar como base o teste antigo de inserir conta que foi feito e modificar de forma a pedir que tente
 * inserir uma conta repetida com o mesmo nome não deve ser permitido e aparecer uma mensagem de erro, que
 * deve ser usada para validar, fazer o assert. Para indicar que estamos esperando essa mensagem de erro,
 * devemos adicionar um novo atributo chamado:  failOnStatusCode e indicar false, para que quando ele veja
 * esse status code, ele nao vai falhar o teste e deixar listar por conta.      */
        cy.request({    url: '/contas',
            method: 'POST',
            headers: {Authorization: `JWT ${token}`},
            body:{nome:"Conta mesmo nome"},
            failOnStatusCode: false
            })
        .as('response');

/* Agora com o uso do console.log, podemos ver que ele manda no body um objeto com o status de erro e a 
 * mensagem que quer ser testada: Já existe uma conta com esse nome!
 * Podemos checar o status code devolvido e também a propriedade error
 * */
        cy.get('@response').then(res =>{
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.have.equal('Já existe uma conta com esse nome!')
        });
    })

    it('Inserir movimentação', () =>{
/* No navegador web vamos realizar o caminho necessário para inserir uma movimentação, observando os pacotes
 * para ser capaz de ver as propriedades que precisam ser usadas. Vamos colocar uma descrição, um interessado,
 * um valor, escolher a conta que será a 'Conta para movimentações' e deixar como efetivado para salvar.
 * Depois de salvo é possível ver que a rota chama transacoes e é o request method POST que será usado.
 * Vamos checar o status code e alguns dados do que tiver retornado.
 * 
 * Também foi retornado a busca em contas, a rota chama contas com o método de solicitação GET, o status
 * não foi alterado será de 304 porque tinha no cache já. Também é retornado a consulta com a rota iniciada
 * em números ordenado pela data de pagamento.
 * Para montar o cy.request, na parte do body temos que enviar tudo que é apresentado no navegador na parte
 * de POST da rota transacoes (do id da conta até o final, passando valor). Apenas isso dará erro pelo fato
 * de ter usado o id que vinha e este é alterado.
 *        cy.request({    method: 'POST',
                url: '/transacoes',
                headers: {Authorization: `JWT ${token}`},
                body: {
                    conta_id: 23516,
                    data_pagamento: "02/03/2024",
                    data_transacao: "02/03/2024",
                    descricao:"qualquer",
                    envolvido:"Fulano",
                    status: true,
                    tipo:"REC",
                    valor:"123"
                }       
            })
 * Tendo em vista que o ID altera a cara limpeza, temos que realizar a busca inicial pelo nome para 
 * obter o ID correto. Podemos usar de base o código ou criar um comando, para evitar duplicação de código.
 * Na aula foi criado um método no arquivo commands.js. Este método recebe o parâmetro nome, que seria o nome
 * da conta. Vamos usar o getToken já feito anteriormente e passar para dentro o código usado para obter
 * o id da conta dentro do .then(token =>{..................})
 * E quando terminar de buscar o id com o uso do token, vamos pedir para retornar apenas o id que
 * seria o res.body[0].id.
 * 
 * Considerações: a data ele pegou do formulário e repetiu a data corrente, se for executado amanhã deixará
 * de ser correto. Será necessário usar a biblioteca moment, que dá a data atual e podemos pedir para formatar
 * no padrão esperado da API que é DIA MÊS ANO. Podemos pedir para adicionar e indicar o que queremos adicionar
 * também usando o .add() antes de format e após o moment().    */
        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {
                cy.request({    method: 'POST',
                url: '/transacoes',
                headers: {Authorization: `JWT ${token}`},
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().add().format('DD/MM/YYYY'),
                    descricao:"qualquer",
                    envolvido:"Fulano",
                    status: true,
                    tipo:"REC",
                    valor:"123"
                }  
            }).as('response')
        });

/* Na hora de realizar a validação usamos o alias dado para chamar e, o its reduz o escopo para 'status'
 * assim, não é possível usar um .and e adicionar mais parâmetros para serem validados.
 * Podemos observar pelas informações do Cypress a data também que foi enviada, com o uso do 
 *                  Cypress.moment().add({days: 1}).format('DD/MM/YYYY')
 * Foi possível ver que a data é dia 3, seguinte e não atual */
        cy.get('@response').its('status').should('be.equal', 201);
        cy.get('@response').its('body.id').should('exist');
    })
})
