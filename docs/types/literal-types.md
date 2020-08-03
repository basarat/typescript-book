## Литералы
Литералы - это *фиксированные* значения, которые являются примитивами JavaScript.

### Строковые литералы

Вы можете использовать строковый литерал в качестве типа. Например:

```ts
let foo: 'Hello';
```

Здесь мы создали переменную с именем `foo`, которая *позволяет присваивать ей только литеральное значение `'Hello'`*. Это продемонстрировано ниже:

```ts
let foo: 'Hello';
foo = 'Bar'; // Ошибка: "Bar" нельзя назначить типу "Hello"
```

Они не очень полезны сами по себе, но могут быть собраны в тип объединение для создания мощной (и полезной) абстракции, например:

```ts
type CardinalDirection =
    | "North"
    | "East"
    | "South"
    | "West";

function move(distance: number, direction: CardinalDirection) {
    // ...
}

move(1,"North"); // Okay
move(1,"Nurth"); // Ошибка!
```

### Другие литеральные типы
TypeScript также поддерживает литеральные типы `boolean` и `number`, например:

```ts
type OneToFive = 1 | 2 | 3 | 4 | 5;
type Bools = true | false;
```

### Логический вывод
Как правило, вы получаете сообщение об ошибке: `Тип string не может быть назначен для типа "foo"`. Следующий пример демонстрирует это.

```js
function iTakeFoo(foo: 'foo') { }
const test = {
  someProp: 'foo'
};
iTakeFoo(test.someProp); // Ошибка: Аргумент типа string не может быть назначен параметру типа 'foo'
```

Это потому, что `test` подразумевает тип `{someProp: string}`. Решением в этом случае было бы использование простого утверждения типа. Для того чтобы сообщить TypeScript литерал, который вы хотите, чтобы он выводил, как показано ниже:

```js
function iTakeFoo(foo: 'foo') { }
const test = {
  someProp: 'foo' as 'foo'
};
iTakeFoo(test.someProp); // Okay!
```

или используйте описание типа, которое поможет TypeScript понять правильный тип в точке объявления:

```js
function iTakeFoo(foo: 'foo') { }
type Test = {
  someProp: 'foo',
}
const test: Test = { // Пометки - подразумевается, что someProp всегда === 'foo'
  someProp: 'foo' 
}; 
iTakeFoo(test.someProp); // Okay!
```

### Случаи использования
Возможные варианты использования для строковых литералов:

#### Тип перечисление на основе строк

[Тип перечисление в TypeScript основан на числах](../enums.md). Вы можете использовать строковые литералы вместе с объединенными типами, чтобы сымитировать перечисление на основе строки, как мы это делали в примере `CardinalDirection` выше. Вы даже можете сгенерировать структуру `Key: Value`, используя следующую функцию:

```ts
/** Утилита для создания K:V из списка строк */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
```

А затем сгенерируйте тип объединение из литеральных типов, используя `keyof typeof`. Вот полный пример:

```ts

/** Утилита для создания K:V из списка строк */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

/**
  * Пример создания типа объединение на основе строк
  */

/** Создать K:V */
const Direction = strEnum([
  'North',
  'South',
  'East',
  'West'
])
/** Создать тип */
type Direction = keyof typeof Direction;

/** 
  * Пример использования типа объединение на основе строк
  */
let sample: Direction;

sample = Direction.North; // Okay
sample = 'North'; // Okay
sample = 'AnythingElse'; // ОШИБКА!
```

#### Моделирование имеющихся JavaScript API

Например [В редакторе CodeMirror есть опция `readOnly`](https://codemirror.net/doc/manual.html#option_readOnly), которая может быть либо `boolean`, либо литеральной строкой `"nocursor"` (валидные допустимые значения `true,false,"nocursor"`). Это может быть объявлено как:

```ts
readOnly: boolean | 'nocursor';
```

#### Размеченные объединения

Мы расскажем [об этом позже в книге](./discriminated-unions.md).


[](https://github.com/Microsoft/TypeScript/pull/5185)
