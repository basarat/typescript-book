## Вызываемые элементы
Вы можете описывать вызываемые элементы как часть типа или интерфейса следующим образом

```ts
interface ReturnString {
  (): string
}
```
Экземпляр такого интерфейса мог бы быть функцией, которая возвращает строку, например:

```ts
declare const foo: ReturnString;
const bar = foo(); // bar подразумевается как строка
```

### Понятные примеры
Конечно, такое описание *вызываемых* элементов может также указывать любые параметры / необязательные параметры / остальные параметры по мере необходимости. Например вот комплексный пример:

```ts
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number;
}
```

Интерфейс может предоставлять несколько описаний вызываемых элементов для определения перегрузки функций. Например:

```ts
interface Overloaded {
    (foo: string): string
    (foo: number): number
}

// пример реализации
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
    if (typeof foo === 'number') {
        return foo * foo;
    } else if (typeof foo === 'string') {
        return `hello ${foo}`;
    }
}

const overloaded: Overloaded = stringOrNumber;

// пример использования
const str = overloaded(''); // тип `str` подразумевает `строку`
const num = overloaded(123); // тип`num` подразумевает `число`
```

Конечно, как и тело *любого* интерфейса, вы можете использовать тело интерфейса с вызываемыми элементами как описание типа для переменной. Например:

```ts
const overloaded: {
  (foo: string): string
  (foo: number): number
} = (foo: any) => foo;
```

### Стрелочный синтаксис
Чтобы упростить использование сигнатур с вызываемыми элементами, TypeScript также допускает описание типа с помощью простых стрелок. Например, функция, которая принимает `число` и возвращает `строку`, может быть описана как:

```ts
const simple: (foo: number) => string
    = (foo) => foo.toString();
```

> Единственное ограничение синтаксиса стрелки: Вы не можете указать перегрузки. Для перегрузок вы должны использовать полный синтаксис `{ (someArgs): someReturn }`.

### Newable синтаксис

Newable - это просто специальный способ описания вызываемого типа с префиксом `new`. Он означает, что вам нужно *вызвать* его с помощью `new`, например

```ts
interface CallMeWithNewToGetString {
  new(): string
}
// Использование
declare const Foo: CallMeWithNewToGetString;
const bar = new Foo(); // подразумевается, что bar имеет тип string
```
