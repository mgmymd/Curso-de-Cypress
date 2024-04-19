/// <reference types="cypress"/>

import '../../support/commandsContas.js'

describe('Seção 10 - Testes API', () =>{
    it('Cenário 1: Inserir uma nova conta', ()=>{
/* Para inserir conta precisamos estar na tela de Contas e inserimos uma conta. Recebemos 4 requisições que
* podem ser vistas com F12 na tela, na parte de network, cabeçalhos.
* 1 req do tipo options, 2 do tipo post para criar uma conta e receber o status 201 de criado com sucesso 
* na qual foi enviado os dados da conta e recebidos com sucesso os dados da conta que acabou de ser inserida,
* como sendo o id, nome, visível e usuario_id da conta que acabou de ser inserida. E, a 3 req que é do tipo
* GET em contas que criou uma listagem nova com a conta que acabara de ser inserida. Vamos tentar replicar essa requisição. 
* 
* Pelo fato da primeira requisição ser do tipo POST, temos que enviar o método, a url, o body. No body 
* vamos passar apenas o nome da conta. Capturar depois a resposta com o uso do .then() para imprimir
* no console e depois realizar os ajustes necessários. Ao fazer a requisição apenas com o nome no body,
* sem o envio do token há uma mensagem de ação não autorizada. Na mensagem de erro é possível observar
* que não há nenhum token na resposta recebida de volta nesse caso.
* 
             cy.request({method: 'POST',
                url: 'https://barrigarest.wcaquino.me/contas',
                 body:{nome:"aaaaa"}
             }).then(resposta => console.log(resposta)); 
* 
* Enviando apenas isso, há a mensagem de erro pela ausência do token e para isso precisamos do login, para
* evitar o erro. Para conseguir adicionar uma conta associada a um usuário, precisamos inicialmente resgatar
* o header do nosso login que informa o nosso token.
* Vamos trabalhar com o then para tal, recebendo o token, usando o should para verificar e, a requisição de adicionar
* uma nova conta ficara dentro do then para poder criar a conta por requisião API.
* Para usar o request de criar uma conta, vamos usar uma nova propriedade chamada headers, usando a proprie
* dade Authorization com uma string e interpolação. A estratégia de login é com o uso do login JWT + o token
* Essa notação é antiga, as versões mais recentes não usam mais o JWT, precisa usar bearer agora para usar 
* Precisa colocar um expect agora no lugar do then, e o cy. usado para inserir conta pode ser dado um alias
              
             cy.request({   method: 'POST', 
                url: 'https://barrigarest.wcaquino.me/signin', 
                body: {email: "testeteste@fakegmail.com", 
                        redirecionar: false, 
                        senha:"987@SENHA123@"}  })
                .its('body.token').should('not.be.empty')
                .then(token => {
                    cy.request({    url: 'https://barrigarest.wcaquino.me/contas',
                            method: 'POST',
                            headers: {Authorization: `JWT ${token}`},
                            body:{nome:"aaaaa"},
                             })
                        .then(resposta => console.log(resposta)) })
*/
        cy.request({   method: 'POST', 
                url: 'https://barrigarest.wcaquino.me/signin', 
                body: {email: "testeteste@fakegmail.com", 
                        redirecionar: false, 
                        senha:"987@SENHA123@"}  })
        .its('body.token').should('not.be.empty')
        .then(token => {
            cy.request({    url: '/contas',
                    method: 'POST',
                    headers: {Authorization: `JWT ${token}`},
                    body:{nome:"aaaaa"},
                    })
                .as('response');
            })
/* O ALIAS ée dado como .as(response) e qualquer coisa após pode ser usado como um cy.get("@response") e, assim
* o cy.get vai esperar até que qualquer requisição com @response seja concluída
* Após o uso do cy.get('@response') podemos usar um .then(res =>{ }), mostrando que temos uma resposta, e 
* queremos que o status code dessa resposta e temos que nos restringir a ideia de que ele retonou algum id
* não somos capazes de saber exatamente qual no momento.
* Outra propriedade que podemos esperar é a do body conter a propriedade 'nome' e que esse nome seja o mesmo
* da conta que pedimos para inserir, estamostambém checando o status code 
*/      
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'aaaaa')
        });
    })
})
    