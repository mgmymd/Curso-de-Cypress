const locators = {
/* Estamos tentando centralizar os locators e usar para os outros testes, vão ser colocados dentro de variáveis e ajudam no uso de novos
 * Podemos tentar inicialmente legar o login para cá e o login tem várias propriedades dentro, vamos deixar
 * apenas a propriedade salva e não o comando inteiro para depois refatorar o arquivo;
 * Os locators e outros arquivos de suporte também devem ser importados de acordo com o caminho em que estiverem presentes
 * */
    LOGIN:{
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MESSAGE:'.toast-message',
    MENU:{
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESETAR: '[href="/reset"]'
    },
    CONTAS:{
        NOME:'[data-test=nome]',
        BTN_SETTINGS_CONTAS: '.btn',
        XP_BTN_ALTERAR: "//table//td[contains(.,'Nova conta inseridaaaa')]/..//i[@class='far fa-edit']"
    }
}

export default locators;
