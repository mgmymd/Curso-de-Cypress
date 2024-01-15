it('nada agora', function() { })

/* Uma função simples de somar como exemplo de estrutura de função
 function soma(a,b) {
     return a + b;
} */

/* Sintaxe de imprimir no log do console
 console.log(soma(1,4)) */

/* Uma variação da função acima, desta vez usando uma função anônima que será jogada dentro de 
de uma variável chamada soma */
const multi = function (c, d) {
    return c * d;
}

console.log(multi(2,5))

/* Estrutura de ARROW FUNCTION básico, usando =>:
 const subt = (e, f) => {
    return e - f;
 }

 Estrutura de ARROW FUNCTION reduzida: */
const subt = (e, f) => e - f

console.log(subt(7,3))

// Uma arrow function que use apenas 1 parâmetro não é necessário colocar entre ()
const soma = a => a + a
console.log(soma(1))

// Sem parâmetros também é necessário usar parênteeses
const divis = () => 5/5
console.log(divis())

// Function com this, o this referencia aquilo que ele invoncou,
// referência para o escopo que está sendo executado
it('a function test....', function() {
    console.log('Function', this)
})

// O resultado que temos:
// Function 
// Context {_runnable: Test, test: Test}
// test: undefined
// _runnable: undefined
// __proto__: Context

// Agora usando o mesmo exemplo acima mas com uma arrow function ele não consegue reconhecer o contexto
it('an arrow test...', () => {
    console.log('Arrow', this)
})

// Temos como resultado: Arrow undefined
