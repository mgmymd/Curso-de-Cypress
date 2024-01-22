///<reference types="cypress"/>

describe('Pontos de Atenção', () => {
    before(() => { cy.visit("https://wcaquino.me/cypress/componentes.html") })
    beforeEach(() => { cy.reload() })

    it('Mocks and Alerts', () => {
/* Bem usado em testes unitários, podemos fazer algumas intervenções nas páginas com ele;
 * Mock: temos um método e em sua execução ele faz algumas chamadas em um método B externo ou uma API externa.
 * ou seja, toda vez que invocamos o método A, ele chama um método B ou API externa e toda vez que for
 * fazer um teste, precisa montar todo o cenário que tem acesso ao método B ou à API dos correios, por ex;
 * Não queremos construir tudo para recriar o comportamento do método A, queremos apenas isolar;
 * Para não ficar chamando eles a todo momento, podemos usar estruturas chamadas de MOCK.
 * O MOCK é um objeto falso, genérico que é colocado como se fosse a chamada da API ou o método B e, por
 * padrão ele vai retornar a chamada daquele método toda vez que chamarmos o método A;
 * Ex: podemos pedir para que a API do correio retorne sempre um mesmo endereço e não precisamos ter um acesso
 * direto à API dos correios. Não precisamos nos preocupar com todas as dependências;
 * O teste é mais rápido e confiável por não precisar buscar e chamar tudo, evita lentidão também da API e,
 * possíveis retornos errados, podemos ainda cortar a chamada e fazer parar todo o funcionamento por não estar
 * chamando verdadeiramente a API e os outros métodos externos
 * Também podemos simular alguns eventos mais complicados, como por ex, uma API fora do ar e lançar um erro;
 * Vamos injetar as estruturas do método B e APIs falsas e ter o poder de dizer o que vão retornar, além de
 * monitorar tais chamadas e fazer inferências do que estão sendo retornadas */

/* Um ALERT é aquela caixa ou pop up que estoura no navegador quando abrimos ou clicamos em algo e ele trava todo navegador.
 * Clicamos e ocorreu um alert, agora que clicamos temos que validar que esse alert realmente ocorreu
 * E o alert é um evento que ocorreu a partir do window, no window.alert podemos mandar uma mensagem qualquer
 * através do console do cypress, mas o cypress não irá rastrear; Se for pelo código ele conseguirá identificar e rastrear
 * Esse alert é um evento e sabemos que ele vem do window, o cypress consegue usar o cy.on, o on é para pegar
 * eventos que ocorrem na tela e pedir para que ele verifique o evento, como o evento alert;
 * Após ter a mensagem podemos usar o expect para validar a mensagem;
 * Não há um método próprio para trabalhar com o cypress no alert e eventos, mas podemos usar as expectativas e ON para fazer */
        cy.get('#alert').click();
        cy.on('window:alert', msg=>{
            console.log(msg);
            expect(msg).to.be.equal('Alert Simples');
        });
    })

    it('Alert com mock', () => {
/* Segunda forma de realizar a verificação do que desejamos, vai ser parecida com a anterior mas agora usando o conceito do MOCK
 * Vamos criar inicialmente um objeto e pedir para que o cypress crie esse objeto stub e também armazene o
 * comportamento, além de controlar e guardar as interações para verificar se o método A chamou a API ou o método B;
 * Assim, de forma resumida, o stub vai substituir o método que havia sido criado acima do mgs=>{console.log(msg);expect(msg).to.be.equal....}
 * Isto é, o stub vai substituir o método usado e depois de substituir o stub, toda vez que o evento alert
 * surgir na janela, o método stub é automaticamente invocado e com o parâmetro msg que era usado no método acima*/
        const stub = cy.stub()
        cy.on('window:alert', stub);
        cy.get('#alert').click();

/* Após a execução, já é mostrado que um stub foi criado na interface do Cypress, e esse stub foi invocado uma vez
 * Podemos ver por último também que tem o stub sendo chamado logo após o evento alert.
 * O stub 1 recebeu essa chamada de Alert com o texto do alert.
 * Podemos também dar nomes usando o método: as('Alerta') e quando executar vai mostrar que existe esse stub
 * mas agora o stub tem um nome chamado Alerta e quando for invocado vai msotrar que o alerta que foi invocado */
        const stub2 = cy.stub().as('Alerta!')
        cy.on('window:alert', stub2);

/* Para fazer a checagem após o click e de maneira sincronizada, vamos usar o then() para sincronizar
 * validação após o click e usar também o getCall() para conseguir pegar a chamada que foi feita, sendo que
 * podemos ter várias chamadas diferentes, para conseguir a primeira usamos a chamada inicial em 0 como se
 * fosse um array indexado */
        cy.get('#alert').click().then(()=>{
            expect(stub2.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })
})
