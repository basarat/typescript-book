### let

`var` Variáveis em JavaScript são *escopo de função*. Isto é diferente de muitas outras linguagens (C # / Java etc.) onde as variáveis são *escopo de bloco*. Se você trouxer uma mentalidade *escopo de bloco* para JavaScript, você esperaria que o seguinte imprima `123`, em vez disso, ele irá imprimir `456`:

```ts
var foo = 123;
if (true) {
    var foo = 456;
}
console.log(foo); // 456
```
Isto é porque `{` não cria um novo *escopo de variável*. A variável `foo` é a mesma dentro do *bloco if*, pois está fora do bloco if. Esta é uma fonte comum de erros na programação JavaScript. É por isso que o TypeScript (e o ES6) introduz a palavra-chave `let` para permitir que você defina variáveis com verdadeiro *escopo de bloco*. Isto é, se você usar `let` ao invés de` var`, você terá um elemento verdadeiramente único desconectado do que você pode ter definido fora do escopo. O mesmo exemplo é demonstrado com `let`:

```ts
let foo = 123;
if (true) {
    let foo = 456;
}
console.log(foo); // 123
```

Outro lugar onde `let` salvaria você de erros é em loops.
```ts
var index = 0;
var array = [1, 2, 3];
for (let index = 0; index < array.length; index++) {
    console.log(array[index]);
}
console.log(index); // 0
```
Com toda a sinceridade, achamos melhor usar `let` sempre que possível, pois isso leva a menores surpresas para desenvolvedores multilíngues novos e existentes.

#### Funções criam um novo escopo
Desde que mencionamos, gostaríamos de demonstrar que as funções criam um novo escopo de variável em JavaScript. Considere o seguinte:

```ts
var foo = 123;
function test() {
    var foo = 456;
}
test();
console.log(foo); // 123
```
Isso se comporta como você esperaria. Sem isso, seria muito difícil escrever código em JavaScript.

#### JS gerado
O JS gerado pelo TypeScript é simples renomear a variável `let` se um nome similar já existir no escopo ao redor. O seguinte exemplo é gerado como está com uma simples substituição de `var` por` let`:

```ts
if (true) {
    let foo = 123;
}

// torna-se //

if (true) {
    var foo = 123;
}
```
No entanto, se o nome da variável já tiver sido usado pelo escopo ao redor, um novo nome de variável será gerado, conforme mostrado (aviso `foo_1`):

```ts
var foo = '123';
if (true) {
    let foo = 123;
}

// torna-se //

var foo = '123';
if (true) {
    var foo_1 = 123; // renomeado
}
```

#### Switch
Você pode encapsular seus corpos `case` em `{}` para reutilizar nomes de variáveis de forma confiável em diferentes declarações `case` como mostrado abaixo:

```ts
switch (name) {
    case 'x': {
        let x = 5;
        // ...
        break;
    }
    case 'y': {
        let x = 10;
        // ...
        break;
    }
}
```

#### let em closures
Uma questão comum em uma entrevista de programação para um desenvolvedor de JavaScript é o que é o log desse arquivo simples:

```ts
var funcs = [];
// cria um monte de funções
for (var i = 0; i < 3; i++) {
    funcs.push(function() {
        console.log(i);
    })
}
// chama-as
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```
Seria de esperar que fosse "0,1,2". Surpreendentemente, ele será `3` para todas as três funções. A razão é que todas as três funções estão usando a variável `i` do escopo externo e no momento em que as executamos (no segundo loop) o valor de `i` será `3` (essa é a condição de terminação para o primeiro loop).

Uma correção seria criar uma nova variável em cada loop específico para essa iteração de loop. Como aprendemos antes, podemos criar um novo escopo de variável criando uma nova função e imediatamente a executando (isto é, o padrão IIFE das classes `(function () {/*body*/})();`) como mostrado abaixo:

```ts
var funcs = [];
// cria um monte de funções
for (var i = 0; i < 3; i++) {
    (function() {
        var local = i;
        funcs.push(function() {
            console.log(local);
        })
    })();
}
// chama-as
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```
Aqui as funções se fecham (portanto chamada `closure`) da variável *local* (convenientemente chamada `local`) e usam isso em vez da variável de laço `i`.

> Observe que os fechamentos vêm com um impacto no desempenho (eles precisam armazenar o estado ao redor).

A palavra-chave ES6 `let` em um loop teria o mesmo comportamento do exemplo anterior:

```ts
var funcs = [];
// criar um monte de funções
for (let i = 0; i < 3; i++) { // Observe o uso do let
    funcs.push(function() {
        console.log(i);
    })
}
// chamando-as
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```

Usando um `let` em vez de `var` cria uma variável `i` exclusiva para cada iteração de loop.

#### Resumo
`let` é extremamente útil para a grande maioria dos códigos. Ele pode melhorar muito a legibilidade do código e diminuir a chance de um erro de programação.



[](https://github.com/olov/defs/blob/master/loop-closures.md)
