## Создание массивов

Создать пустой массив очень просто:

```ts
const foo: string[] = [];
```

Если вы хотите создать массив, предварительно заполненный некоторым содержимым, используйте ES6 `Array.prototype.fill`:

```ts
const foo: string[] = new Array(3).fill('');
console.log(foo); // ['','',''];
```

Если вы хотите создать массив определенной длины с вызовом map, вы можете использовать оператор spread:

```ts
const someNumbers = [...new Array(3)].map((_,i) => i * 10);
console.log(someNumbers); // [0,10,20];
```
