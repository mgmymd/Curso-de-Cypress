/// <reference types="cypress"/>

import '../../support/commandsContas.js'

/* Testes ao nível de integração, de API rest. Uma API REST é na verdade uma padronização em cima do protocolo HTTP,
 * onde conseguimos fazer uma série de requisições com alguns atributos padronizados, como verbos, status code, etc
 * A aplicação que usamos, https://barrigareact.wcaquino.me, é a aplicação em react que usa um backend que é o barrigarest.wcaquino.me.
 * 
 * Como uma URL se comporta? O protocolo é o HTTP, o domínio da aplicação é o barrigarest.wcaquino.me que também
 * pode ser chamado de URL base e, o /contas é o recurso da aplicação que estamos pedindo. Quando colocamos 
 * a URL com /contas, estamos pedindo as contas desta aplicação sobre o protocolo HTTP e há ainda outras informações
 * que estão sendo imbutidas, com o GET que é o verbo da requisição que está sendo pedido. Podemos usar o mozilla
 * rest verbs para ver os métodos de requisição HTTP mais usados. Contudo, os mais comuns são o get (busca, pedir um
 * recurso), delete (url com o verbo delete que deve ser enviado para que seja possível deletar apenas o
 * que é desejado e não todos os registros que constam), put (para alterar um determinado recurso, como 
 * exemplo no /contas/1, queremos alterar um recurso que seria contas e com o identificar 1 que seria 
 * apenas essa conta 1 que seria o identificador do que queremos que seja alterado: A CONTA DE NUMERO 1 e,
 *  também enviar no corpo da requisição o que queremos alterar), post (submeter alguma entidade, como 
 * fazer um post na url /contas e enviar os dadosda conta que queremos inserir dentro de um objeto que
 * seria o corpo da requisição e outros dados necessários para inserir)
 * 
 * Temos que enviar os recursos e os ids dependendo do verbo a ser usado e o propósito/ação que queremos
 * Poderíamos também ter na url alguma porta antes do recurso a ser usado.
 * Para o GET temos as duas formas de realizar uma requisiçaõ URL, podemos usar o identificador ou não usá-lo
 * dependerá do contexto; Podemos enviar os dados via cabeçalho ou pela própria URL
 * 
 * Uma vez que fizemos uma requisição, eça vao responder e, na resposta vem junot um atributo muito importante
 * que é o STATUS CODE. Os STATUS CODE são as respostas das APIs como 400, 404, 200, 201. O padrão não é obrigatório
 * mas interessante de ser seguido. Os mais comuns são os iniciados em 2 que indicam sucesso, os da série 4 que
 *  indicam ao cliente que alguma requisição foi inválida, ou ainda da série 5 que houve algum erro no 
 * servidor. Os mais comuns são os: 200, 201, 204, 400, 401, 403, 404.
 * 
 * Atrelado a resposta há o status code e um cabeçalho (header) que podemos tirar algumas informações, há
 * também o corpo (body) que vai dar algumas informações que podemos coletar. No curso iremos enviar os dados pelo body;
 * Uma ferramenta boa para documentação de APIs é o SWAGGER: Ele dá uma interface que facilita a documentação,
 * como: get /pet/id etcm quais parâmetros que devemos criar e o que é esperado de resposta; 
 * 
 * Podemos também estudar as rotas e requisições para entender como fazer os testes; 
 * Podemos também escutar as requisiç~eos que a aplicação, API faz, para ter mais informações; Nesse caso
 * a aplicação em uso é feita em react, quando fazemos a requisição no react para o projeto, temos na parte
 * de network informações da rota, mostrando em general a URL, a requisição usada, o que recebeu e o que foi enviado
 * Podemos verainda informações como: URL de solicitação, método de solicitação, rota que fez a busca, código
 * de status, endereço remoto, se enviou alguma informação no body, etc;
 * Uma vez que fizemos uma requisição, a API vai verificar se a requisição existe ou não, o que deve retornar,
 * ele indica no F12 na parte de network as informações já dittas, e também mostra como resposta o que foi dado
 * O Token é o que vem criptografado e também tem o id, e enviando esse token a api vai aplicar automaticamente,
 * Na resposta podemos ver o id do usuário, nome e o token, e o token garante que seu valor é este usuário 
 * devolvido na resposta, para garantir/ verificar; é uma forma de mostrar que está criptogrado;    */

describe('API REST - BACKEND - Testes a nível de integração', () =>{
    it('Aula 64: LOGIN', ()=>{
/* Para fazer o login ele envia uma requisição do tipo POST para essa url: 
 * https://barrigarest.wcaquino.me/signin   sobre o recurso /signin e para fazer isso, ele está enviando o 
 * objeto email que pode ser visto na aba CONTEÚDO ao lado da aba de CABEÇALHO, no body, contendo email, 
 * senha e redirecionamento. Traz como resposta depois o id do usuário, o nome do usuário e o token que 
 * entra nas direções das rotas que são protegidas. Rotas que se não for enviado o token junto, há o 
 * recebimento de um código de erro, de um status code de erro.
 *
 * O objetivo agora é realizar este login vendo os dados do cabeçalho, status code e resposta
 * com o uso do cypress, sem uma interface gráfica.
 * Nesse caso não vamos utilizar os locators, porque os locators são usados apenas para identificar elementos
 * na tela, como não realizaremos tais testes em telas, não precisamos deles sendo importados.
 * 
 * Temos dois tipos de sigin, um do tipo OPTIONS e outro do tipo POST que vamos inicialmente replicar, e 
 * depois foi feita uma requisição, GET, do saldo que foi para trazer as contas do usuário assim que ele 
 * se loga e, precisa das contas para exibir, e depois uma reguição do tipo OPTION ao final.
 * 
 * A requisição que deve ser feita é para o caminho https://barrigarest.wcaquino.me/signin  usada com o 
 * comando cy.request que apresenta mais de uma maneira de passar parâmetros para dentro, a mais fácil e
 * que será usada nas aulas é passar um objeto inteiro com suas propriedades dentro usando chaves {}, dentro
 * do objeto passamos o método, e, devemos também passar o body como um objeto que pode ser copiado do navegador.
 * Da linha 78 até a 83 será uma caracterização de requisição API parecida com ao método POST. 
 * O método pode ser do tipo POST, GET, PUT, DELETE que são as mais comuns, há ainda outras que podem ser usadas.
 * Essa requisição é uma requisição do tipo API feita.
 * Usando o then podemos ver a resposta e inicialmente como não sabemos o que tem dentro da resposta,
 * vamos apenas pedir para registrar no log do console a resposta */
            cy.visit("https://barrigareact.wcaquino.me");
            cy.request({ method: 'POST', 
                url: 'https://barrigarest.wcaquino.me/signin', 
                body: {email: "testeteste@fakegmail.com", 
                        redirecionar: false, 
                        senha:"987@SENHA123@"}})
                .then(res => console.log(res));

/* Para pegar uma resposta usamos o .then(). E como não sabemos o que vem inicialmente, podemos pedir para
 * que a resposta seja apresentada no console, o que será retornado é o console.log(res), a resposta. 
 * Esses testes, de rotas e de APIs, são normalmente executados mais rapidamente do que os testes 
 * de interface; Ao ir no console do Cypress, conseguimos observar que há impresso o Status Code, o cabeçalho
 * no formado de Headers, e, o BODY, além de outras informações como do requestBody etc.
 * 
 * Vendo no body conseguimos ter o id, o nome e o token, que são as propriedades que usaremos para fazer as
 * próximas requisições; 
 * Dentro da resposta temos a propriedade body e, dentro dela a propriedade token. Assim, conseguimos 
 * trocar o then por um its e usar um should para indicar que não pode ser vazio e deve estar povoado. */
        cy.request({ method: 'POST', 
            url: 'https://barrigarest.wcaquino.me/signin', 
            body: {email: "testeteste@fakegmail.com", 
                redirecionar: false, 
                senha:"987@SENHA123@"}
        }).its('body.token').should('not.be.empty');
    })
})
