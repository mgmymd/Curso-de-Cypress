/// <reference types="cypress"/>

import '../../support/commands.js'

describe('Testes de serviços Rest com Cypress - API', () =>{
    let token

    before(() =>{
        cy.getToken('testeteste@fakegmail.com', '987@SENHA123@')
            .then(tken => {
                token = tken
            })      })

    beforeEach(() =>{   cy.resetRest()     })

    it('Saldo', () =>{
/* O cenário mais comum é ir na home e checar o calor da conta 'Conta para saldo'. Para isso voltamos para
 * a home pelo navegador com a API aberta, clicamos na rota de saldo, na aba de Visualização podemos ver
 * o conteúdo deste GET, mostrando a Conta para saldo como uma e seu index, além de outras informações, como
 * id da conta, o saldo e o nome.
 * Para criar o cenário, fazemos uma busca em /saldo com o método de requisição do tipo GET.
 *         cy.request({ url: '/saldo',
                        method: 'GET',
                        headers: {Authorization: `JWT ${token}`}
                }).then(res => console.log(res))
 * Usamos o .then(res => console.log(res)) para tentar observar o que volta como resposta. Nesse caso será
 * um array de quatro elementos.
 * 
 * Para resolver, podemos criar um método e, dentro do método podemos fazer um laço coom res.body.forEach() e
 * onde, para cada conta, vamos executar um bloco de comandos (para cada linha do array de todas as contas)
 * O bloco de comandos será c.conta ==='Conta para saldo', lembrando de declarar antes a variável para 
 * receber o valor. Depois usamos um if para confirmar o nome e verificar se está correto */
        cy.request({ url: '/saldo',
                method: 'GET',
                headers: {Authorization: `JWT ${token}`}
        }).then(res => {
            let saldoConta = null;
            res.body.forEach(c => {
                if(c.conta=='Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        });
    })

    it('Saldo - Cenário avançado', () =>{
/* Agora num cenário mais avançado, vamos fazer uma movimentação e depois verificar o saldo, voltamos na API
 * pelo navegador para observar os detalhes de cada rota que iremos atuar. Voltamos para o extrato, procuramos
 * a movimentação inserida na conta Conta para saldo, pedindo para alterar a conta pedente para efetivada e,
 * depois, voltamos para a página inicial do saldo para verificar.
        cy.request({ url: '/saldo',
                method: 'GET',
                headers: {Authorization: `JWT ${token}`}
        }).then(res => {
                let saldoConta = null;
                res.body.forEach(c => {
                    if(c.conta=='Conta para saldo') saldoConta = c.saldo
                })
            expect(saldoConta).to.be.equal('534.00')
            });
 
 * TRANSAÇÕES - será um PUT porque queremos alterar o estado da transação para efetivado e, o que vamos pedir
 * para alterar será apenas o status. E nessa requisição vamos verificar apenas o status que deve ser alterado
 * com sucesso tendo um status code de 200.
 *             cy.request({    method:'PUT',
                        url:'/transacoes/id',
                        headers: {Authorization: `JWT ${token}`},
                        body:{      status: true        }    })
                .its('status').should('be.equal', 200)
 * 
 * Como sabemos que o id é resetado a cada execução, temos que fazer uma busca de ID da conta como foi
 * feito nos outros testes e deve ser feito antes do request acima. Usando o method GET, a url de transações
 * e também a query string (qs), para depois poder ter uma resposta que vai retornar um array, e vamos usar
 * o array e a partir dele pegamos o id*/
            cy.request({ method:'GET',
                    url: '/transacoes',
                    headers: {Authorization: `JWT ${token}`},
                    qs: {   descricao:'Movimentacao 1, calculo saldo'  }
            }).then(res =>{
/* Iremos logar primeiro o res.body para saber todo o conteúdo que carrega pelo console do cypress para
 * poder colocar os outros parâmetros pendentes, além do status presente no body, e evitar o erro na 
 * execução do teste */
                console.log(res.body);
                cy.request({
                        url:`/transacoes/${res.body[0].id}`,
                        method: 'PUT',
                        headers: {Authorization: `JWT ${token}`},
                        body:{      status: true,
                                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                                    descricao: res.body[0].descricao,
                                    envolvido: res.body[0].envolvido, 
                                    valor: res.body[0].valor,
                                    conta_id: res.body[0].conta_id
                        }    
                }).its('status').should('be.equal', 200)
            })

            cy.request({ url: '/saldo',
                    method: 'GET',
                    headers: {Authorization: `JWT ${token}`}
                }).then(res => {
                    let saldoConta = null;
                    res.body.forEach(c => {
                        if(c.conta=='Conta para saldo') saldoConta = c.saldo
                })
            expect(saldoConta).to.be.equal('4034.00')
            });
    })

    it('Remover movimentação', () =>{
/* No navegador da API fazemos o caminho de exclusão da conta Movimentação para Exclusão e pela rota dada em número,
 * Podemos observar o status 204 e o método DELETE. Precisamos descobrir o id da conta deletada que é 
 * indicado após a / de transações. Podemos reutilizar parte do código usado nas transações acima para encontrar
 * o valor do id após a barra, utilizando inicialmente o GET para realizar a busca e depois, criamos a 
 * requisição para excluir a conta */
        cy.request({ method:'GET',
                url: '/transacoes',
                headers: {Authorization: `JWT ${token}`},
                qs: {   descricao:'Movimentacao para exclusao'  }
        }).then(res =>{
            cy.request({url: `/transacoes/${res.body[0].id}`,
                    method:'DELETE',
                    headers: {Authorization: `JWT ${token}`}
                }).its('status').should('be.equal', 204)
        })
    })
})
