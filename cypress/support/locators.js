const locators = {
/* Estamos tentando centralizar os locators e usar para os outros testes, vão ser colocados dentro de variáveis e ajudam no uso de novos
 * Podemos tentar inicialmente legar o login para cá e o login tem várias propriedades dentro, vamos deixar
 * apenas a propriedade salva e não o comando inteiro para depois refatorar o arquivo;
 * Os locators e outros arquivos de suporte também devem ser importados de acordo com o caminho em que estiverem presentes
 * A forma de importar os arquivos para usar como locators seguindo o padrão page objects:
 *              import loc from '../../support/locators.js'         */
    LOGIN:{
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MESSAGE:'.toast-message',
    MENU:{
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESETAR: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        HOME: '[data-test=menu-home] > .fas'
    },
    CONTAS:{
        NOME:'[data-test=nome]',
        BTN_SETTINGS_CONTAS: '.btn',
        XP_BTN_ALTERAR: "//table//td[contains(.,'Nova conta inseridaaaa')]/..//i[@class='far fa-edit']"
    },
    MOVIMENTACAO:{
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        BTN_STATUS_CONTA: '[data-test=status]',
        BTN_SALVAR_MOVIMENTACAO: '.btn-primary'
    },
    EXTRATO:{
        LINHAS:'.list-group li',
        XPATH_EXTRATO: "//span[contains(., 'AAAAAAAAAAAA')]/following-sibling::small[contains(., '123')]"
    }
}

export default locators;
