it('sem testes, ainda ', () => {})

// Temos esse método chamado getSomething que vai retornar o valor 10
// const getSomething = () => 10;

// Agora temos um sistema que vai utilizar esse método getSomething
// const System = () => {
//     console.log('INIT');
//     const something = getSomething();
//     console.log(`Something is ${something}`);
// }

// Usamos acima o `` para conseguir fazer a interpolação do valor da variável
// Outra forma de fazer a interpolação, maneira antiga: console.log("Something is " + something);
// Agora chamamos o sistema
// System();

// Agora, trabalhando com um assíncrono, usamos o setTimeOut e o callback, tendo em vista
// que algumas requisições ou ações levam algum tempo para serem executadas, assim, preciamos
// esperar esse tempo para dar continuidade no teste e permitir também que o node e outras ações
// continuem em funcionamento, evitando que deixem de funcionar
// const getSomething = callback => {
//     setTimeout(()=>{
//         callback(12);
//     }, 1000)
// }

// const System = () =>{
//     console.log('init');
//     getSomething(some => console.log(`Something is ${some}`));
//     console.log('end');
// }

// System();

// Para deixar agora com que o end apareça depois do callback, em vez de seguir em frente
// const System = () => {
//     console.log('init');
//     getSomething(some => {
//         console.log(`Something is ${some}`);
//         console.log('end');
//     })
// }

// System();

// USANDO AGORA AS PROMISES para evitar o callback hell iremos refatorar todo o código, sendo que as promises necessitam de 
// 2 parâmetros, o resolve e o reject, o resolve será invocado quando a promise for resolvida e o reject quando houver alguma falha, problema na promise, é a forma de indicar que houve algum problema
// A promise tem uma função que necessita destes 2 parâmetros, resolve e reject
// No lugar do callback vamos usar o resolve
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(12);
        }, 1000)
    })
}

// Agora como o sistema vai consumir a promise: o getSomething está retornando um valor
// Para indicar que é uma promise e precisa aguardar até que ela seja resolvida, usa-se o .then() até que o método
// resolve seja invocado; No then precisa-se do valor da varíavel 
const System = () => {
    console.log('init');
    const prom = getSomething(); //promise guardada nesta variável chamada prom
    prom.then(some => { // esperou que essa variável fosse resolvida e executou a função após ela ser completa 
        console.log(`Something is ${some}`);
        console.log('end');
    })
}

System();

// A forma simplificada do System acima sem o uso de uma variável para guardar o valor e apresentar depois:
// const System = () => {
//     console.log('init');
//     getSomething().then(some => {
//         console.log(`Something is ${some}`);
//         console.log('End');
//     })
// }
// System();

// A documentação do Cypress pede para evitar o uso do Async await, mas ele pode também ser usado para deixar algo mais simples:
// const getSomething = () =>{
//     return new Promise((resolve, reject) =>{
//         setTimeout(() => {
//             setTimeout(()=>{
//                 resolve(13);
//             }, 1000)
//         } )
//     })
// }

//Damos um init, pedimos para aguardar até que o valor seja resolvido com o uso de await e depois seguimos normalmente
// const System = async () => {
//     console.log('init');
//     const some = await getSomething();
//     console.log(`Something is ${some}`);
//     console.log('end');
// }

// System();
