/// <reference types="cypress" />

///<reference types="cypress"/>

import '../../support/commands.js'
import loc from '../../support/locators.js'
import buildEnv from '../../support/buildEnv.js'

describe('Testes mockados do frontend - Gerenciamento de massas', ()=>{
    before(()=>{
        cy.visit('https://barrigareact.wcaquino.me');
        buildEnv()
        cy.login('fake@email', 'senhaErrada');  })

    beforeEach(() =>{   cy.get(loc.MENU.HOME).click();   })

    after(() =>{    cy.clearLocalStorage(); })

    it('layout', () =>{
/* Vamos agora testar o layout, nesse caso de cores diferentes das pagas e não pagas da tela de 
 * extrato. Vamos usar o retorno de 4 contas com o cy.route, temos no final 4 contas, duas pagas e
 * 2 não pagas. Queremos agora chegar nelas e validar as cores, vermelhas para não pagas;efetivadas
 * e verdes para as efetivadas  */
        cy.server()
        cy.route({
            method:'GET',
            url: '/extrato/**',
            response:[{
                    "conta": "Receita paga", "id": 1929928,
                    "descricao": "Receita paga", "envolvido": "AAA",
                    "observacao": null,"tipo": "REC",
                    "data_transacao": "2024-03-10T03:00:00.000Z", "data_pagamento": "2024-03-10T03:00:00.000Z",
                    "valor": "-1500.00","status": true, "conta_id": 2058645, "usuario_id": 47637,
                    "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Receita pendente",
                    "id": 1929929, "descricao": "despesa pendente",
                    "envolvido": "BBB",  "observacao": null,"tipo": "DESP",
                    "data_transacao": "2024-03-10T03:00:00.000Z", "data_pagamento": "2024-03-10T03:00:00.000Z",
                    "valor": "-1500.00", "status": false, "conta_id": 2058646,"usuario_id": 47637,
                    "transferencia_id": null,"parcelamento_id": null},
                {"conta": "Receura paga 2","id": 1929930,"descricao": "Receita paga",
                    "envolvido": "CCC", "observacao": null,"tipo": "REC",
                    "data_transacao": "2024-03-10T03:00:00.000Z", "data_pagamento": "2024-03-10T03:00:00.000Z",
                    "valor": "3500.00", "status": true, "conta_id": 2058647,"usuario_id": 47637,
                    "transferencia_id": null,"parcelamento_id": null},
                {"conta": "Receita pendente 2",
                    "id": 1929931, "descricao": "despesa pendente", "envolvido": "DDD",
                    "observacao": null, "tipo": "DESP",
                    "data_transacao": "2024-03-10T03:00:00.000Z", "data_pagamento": "2024-03-10T03:00:00.000Z",
                    "valor": "-1000.00", "status": false,
                    "conta_id": 2058647,"usuario_id": 47637, "transferencia_id": null, "parcelamento_id": null}    ]
            }).as('listar conta');

        cy.get(loc.MENU.EXTRATO).click()
/* Como descobrir a classe, vamos criar um xpath, usando o navegador junto para entender o caminho
 * Justificar se esse elemento apresenta a classe que queremos, que é a classe de pago com o .should
 * ('have.class', 'receitaPendente')
 * */
        cy.xpath(loc.EXTRATO.FN_XPATH_LINHA('Receita paga'))
                .should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XPATH_LINHA('Receita paga'))
                .should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XPATH_LINHA('despesa pendente'))
                .should('have.class', 'Receita pendente 2')
    })
})
