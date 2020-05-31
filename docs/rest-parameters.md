### Rest параметры
Rest параметры (обозначаются как `...argumentName` для последнего аргумента) позволяют быстро принимать несколько аргументов в функции и получать их в виде массива. Как на примере ниже:

```ts
function iTakeItAll(first, second, ...allOthers) {
    console.log(allOthers);
}
iTakeItAll('foo', 'bar'); // []
iTakeItAll('foo', 'bar', 'bas', 'qux'); // ['bas','qux']
```
Rest параметры могут быть использованы в любой функции, будь то `function`/`()=>`/`class member`.
