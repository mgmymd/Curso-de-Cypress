/// <reference types="cypress" />
// com essa linha de cima o VSCode vai entender que estamos trabalhando com o Cypress e vai dar mais sugestões
// assim, quando colocarmos novamente o it vai mostrar que já descreve um caso de teste. Sendo que o IT dá o escopo do teste
// Assim podemos usar no primeiro parâmetro o nome do TC e no segundo parâmetro, usando uma arrow function, podemos por o
// corpo do teste

it('A external test....', () => {

})

// O DESCRIBE por sua vez serve para agrupar testes, o primeiro parâmetro é o nome que vai definir o describe e o segundo
// é a função que vai compor todos os testes que vamos criar para esse grupo, como exemplo abaixo um com teste básico
    // describe('Should group tests...', () => {
    //     it('An internal test....', () => {

    //     })
    // })

// Dentro do DESCRIBE podemos ter outros grupos, ou seja, ter outros descibres
describe('Should group tests...', () => {
    describe('Should group more specific tests 1...', () => {
        it('A specific test 1.1...', () => {

        })
    })

    describe('Should group more specific tests 2...', () => {
        it('A specific test 2.1...', () => {

        })
    })

    it('An internal test...', () => {

    })
})

// Aplicando o skip, para especificar que queremos que um desses testes de cima não seja executado:
describe('Should group tests with skip now...', () => {
    describe('Should group more specific tests 1...', () => {
        it.skip('SKIP a specific test 1.1...', () => {
// Podemos ver na interface do cypress que esse teste foi pulado, ao ter um SKIP e a contagem for diferente
        })
    })

    describe('Should group more specific tests 2...', () => {
        it.only('A specific test 2.1...', () => {
    // Another way to make only this test run and the others skipped, the test will even not be displayed as skip
    //Não podemos também usar vários only, ele vai pegar sempre o último only que aparecer
                                                })
    })

    it('An internal test...', () => {

    })
})

// Podemos também dar um skip em um grupo completo de testes
describe.skip('SKIP 2 - Should group tests with skip now...', () => {
    describe('Should group more specific tests 1...', () => {
        it('SKIP a specific test 1.1...', () => {

        })
    })

    describe('Should group more specific tests 2...', () => {
        it('A specific test 2.1...', () => {

        })
    })

    it('An internal test...', () => {

    })
})
