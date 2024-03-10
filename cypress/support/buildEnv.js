const buildEnv = () =>{

    cy.server()
    cy.route({
        method: 'POST',
        url: '/signin',
        response: { id: 1000, nome: 'usuario falso', token: 'String token falso'    }
        }).as('signin')

    cy.route({
        method: 'GET',
        url: '/saldo',
        response:[{  "conta_id": 666, "conta": "Carteira", "saldo": "1000" },
                {"conta_id": 999, "conta": "Banco","saldo": "1000000000000000000"   }
        ]}).as('saldo')

    cy.route({
        method:'GET',
        url: '/contas',
        response:[{"id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1},
                {"id": 2, "nome": "Banco", "visivel": true, "usuario_id": 2}]
        }).as('listar conta');

}

export default buildEnv
