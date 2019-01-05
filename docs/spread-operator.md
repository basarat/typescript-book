### Operador de Propagação (Spread Operator)

O principal objetivo do operador spread é *espalhar/propagar* os elementos de um array ou objeto. Isto é melhor explicado com exemplos.

#### Aplicar (Apply)
Um caso de uso comum é espalhar uma matriz nos argumentos da função. Anteriormente você precisaria usar `Function.prototype.apply`:

```ts
function foo(x, y, z) { }
var args = [0, 1, 2];
foo.apply(null, args);
```

Agora você pode fazer isso simplesmente prefixando os argumentos com `...` como mostrado abaixo:

```ts
function foo(x, y, z) { }
var args = [0, 1, 2];
foo(...args);
```

Aqui nós estamos *propagando* a matriz de `args` em `argumentos` posicionais.

#### Desestruturação (Destructuring)
Já vimos um uso disso em *desestruturação*:

```ts
var [x, y, ...remaining] = [1, 2, 3, 4];
console.log(x, y, remaining); // 1,2,[3,4]
```
A motivação aqui é simplesmente facilitar a captura dos elementos remanescentes de um array durante a desestruturação.

#### Atribuição de Matriz (Array assignment)
O operador de propagação permite que você coloque facilmente uma *versão expandida* de uma matriz em outra matriz. Isso é demonstrado no exemplo abaixo:

```ts
var list = [1, 2];
list = [...list, 3, 4];
console.log(list); // [1,2,3,4]
```

Você pode colocar a matriz expandida em qualquer posição e obter o efeito esperado:

```ts
var list = [1, 2];
list = [0, ...list, 4];
console.log(list); // [0,1,2,4]
```

#### Objecto de propagação (Object spread)
Você também pode espalhar um objeto em outro objeto. Um caso de uso comum é simplesmente adicionar uma propriedade a um objeto sem alterar o original:

```ts
const point2D = {x: 1, y: 2};
/** Cria um novo objeto usando todos os pontos do point2D juntamente com z */
const point3D = {...point2D, z: 3};
```

Para objetos, a ordem de onde você coloca o spread/propagação é importante. Isso funciona como `Object.assign` e faz o que você espera: o que vem primeiro é 'substituído' pelo que vem depois:

```ts
const point2D = {x: 1, y: 2};
const anotherPoint3D = {x: 5, z: 4, ...point2D};
console.log(anotherPoint3D); // {x: 1, y: 2, z: 4}
const yetAnotherPoint3D = {...point2D, x: 5, z: 4}
console.log(yetAnotherPoint3D); // {x: 5, y: 2, z: 4}
```

Outro caso de uso comum é uma extensão simples e superficial:

```ts
const foo = {a: 1, b: 2, c: 0};
const bar = {c: 1, d: 2};
/** Mesclando foo e bar */
const fooBar = {...foo, ...bar};
// fooBar é agora {a: 1, b: 2, c: 1, d: 2}
```

#### Summary
`apply` é algo que você costuma usar em JavaScript, então é bom ter uma sintaxe melhor onde você não tem aquele feio `null` para o argumento `this`. Também tendo uma sintaxe dedicada para mover arrays de (desestruturação) ou para (atribuição) outros arrays fornece uma sintaxe nítida para quando você está fazendo o processamento de arrays em arrays parciais.


[](https://github.com/Microsoft/TypeScript/pull/1931)
