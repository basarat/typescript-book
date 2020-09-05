* [Защита типа](#type-guard)
* [Защита типа, определяемая пользователем](#user-defined-type-guards)

## Защита типа
Защита типа позволяет уточнить тип объекта внутри блока условия.


### typeof

TypeScript знает об использовании JavaScript-операторов `instanceof` и `typeof`. Если вы используете их в блоке условия, TypeScript поймет, что тип переменной будет отличаться в этом блоке условия. Вот небольшой пример, где TypeScript понимает, что конкретной функции не существует в `string`, и указывает, что это, вероятно, было опечаткой пользователя:

```ts
function doSomething(x: number | string) {
    if (typeof x === 'string') { // Внутри блока TypeScript знает, что `x` должно быть строкой
        console.log(x.subtr(1)); // Ошибка, 'subtr' не существует для `string`
        console.log(x.substr(1)); // OK
    }
    x.substr(1); // Ошибка: Нет гарантии, что `x` является `строкой`
}
```

### instanceof

Вот пример с классом и `instanceof`:

```ts
class Foo {
    foo = 123;
    common = '123';
}

class Bar {
    bar = 123;
    common = '123';
}

function doStuff(arg: Foo | Bar) {
    if (arg instanceof Foo) {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Ошибка!
    }
    if (arg instanceof Bar) {
        console.log(arg.foo); // Ошибка!
        console.log(arg.bar); // OK
    }

    console.log(arg.common); // OK
    console.log(arg.foo); // Ошибка!
    console.log(arg.bar); // Ошибка!
}

doStuff(new Foo());
doStuff(new Bar());
```

TypeScript даже понимает `else`, поэтому, когда `if` уточняет один тип, он знает, что внутри else *это определенно уже другой тип*. Вот пример:

```ts
class Foo {
    foo = 123;
}

class Bar {
    bar = 123;
}

function doStuff(arg: Foo | Bar) {
    if (arg instanceof Foo) {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Ошибка!
    }
    else {  // ДОЛЖЕН БЫТЬ Bar!
        console.log(arg.foo); // Ошибка!
        console.log(arg.bar); // OK
    }
}

doStuff(new Foo());
doStuff(new Bar());
```

### in 

Оператор `in` выполняет безопасную проверку существования свойства объекта и может использоваться в качестве защиты типа. Например.

```ts
interface A {
  x: number;
}
interface B {
  y: string;
}

function doStuff(q: A | B) {
  if ('x' in q) {
    // q: A
  }
  else {
    // q: B
  }
}
```

### Литерал защиты типа

Когда у вас есть литералы типов в объединении, вы можете различить их, например:

```ts
type Foo = {
  kind: 'foo', // Литерал типа
  foo: number
}
type Bar = {
  kind: 'bar', // Литерал типа
  bar: number
}

function doStuff(arg: Foo | Bar) {
    if (arg.kind === 'foo') {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Ошибка!
    }
    else {  // ДОЛЖЕН БЫТЬ Bar!
        console.log(arg.foo); // Ошибка!
        console.log(arg.bar); // OK
    }
}
```

### Защита типа, определяемая пользователем 
JavaScript не имеет встроенной поддержки интроспекции. Когда вы используете простые объекты JavaScript (используя структурную типизацию себе на пользу), у вас даже нет доступа к `instanceof` или `typeof`. Для этих случаев вы можете создавать *функции для защиты типа, определяемой пользователем*. Это просто функции, которые возвращают `какойТоПараметрФункции - КакогоТоТипа`. Вот пример:
```ts
/**
 * Просто несколько интерфейсов
 */
interface Foo {
    foo: number;
    common: string;
}

interface Bar {
    bar: number;
    common: string;
}

/**
 * Определяемая пользователем защита типа!
 */
function isFoo(arg: any): arg is Foo {
    return arg.foo !== undefined;
}

/**
 * Простой пример использования защиты типа, определяемой пользователем
 */
function doStuff(arg: Foo | Bar) {
    if (isFoo(arg)) {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Ошибка!
    }
    else {
        console.log(arg.foo); // Ошибка!
        console.log(arg.bar); // OK
    }
}

doStuff({ foo: 123, common: '123' });
doStuff({ bar: 123, common: '123' });
```

### Защита типа и колбэки

TypeScript не предполагает, что защиты типов остаются активными в колбэках, поскольку делать такое предположение опасно. Например

```js
// Пример
declare var foo:{bar?: {baz: string}};
function immediate(callback: ()=>void) {
  callback();
}


// Защита типа
if (foo.bar) {
  console.log(foo.bar.baz); // Okay
  functionDoingSomeStuff(() => {
    console.log(foo.bar.baz); // TS ошибка: Возможно объект 'undefined'
  });
}
```

Для исправления просто достаточно сохранить значение в локальной переменной, автоматически гарантируя, что оно не будет изменено извне, и TypeScript легко сможет это понять:

```js
// Защита типа
if (foo.bar) {
  console.log(foo.bar.baz); // Okay
  const bar = foo.bar;
  functionDoingSomeStuff(() => {
    console.log(bar.baz); // Okay
  });
}
```
