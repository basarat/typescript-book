## Генераторы

`function *` - это синтаксис, используемый для создания *функции генератора*. Вызов функции генератора возвращает *объект генератора*. Объект генератора просто реализует интерфейс [iterator][iterator] (а именно функции `next`, `return` и `throw`).

Существуют 2 основные причины использовать функции генератора:

### Ленивые итераторы

Функции генератора могут использоваться для создания ленивых итераторов, например следующая функция возвращает **бесконечный** список целых чисел по запросу:

```ts
function* infiniteSequence() {
    var i = 0;
    while(true) {
        yield i++;
    }
}

var iterator = infiniteSequence();
while (true) {
    console.log(iterator.next()); // { value: xxxx, done: false } бесконечно
}
```

Конечно, если итератор завершится, вы получите результат `{done: true}`, как показано ниже:

```ts
function* idMaker(){
  let index = 0;
  while(index < 3)
    yield index++;
}

let gen = idMaker();

console.log(gen.next()); // { value: 0, done: false }
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { done: true }
```

### Внешнее контролируемое исполнение
Это та роль генераторов, которая действительно восхищает. По сути, это позволяет функции приостановить выполнение и передать управление оставшейся части функции вызывающей стороне.

Функция генератора не выполняется при вызове. Она просто создает объект генератора. Рассмотрим следующий пример вместе с примером выполнения:

```ts
function* generator(){
    console.log('Выполнение началось');
    yield 0;
    console.log('Выполнение возобновлено');
    yield 1;
    console.log('Выполнение возобновлено');
}

var iterator = generator();
console.log('Запуск итерации'); // Это будет выполнено до того, как выполнится что-либо в теле функции генератора
console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

Если вы запустите это, вы получите следующий вывод:

```
$ node outside.js
Запуск итерации
Выполнение началось
{ value: 0, done: false }
Выполнение возобновлено
{ value: 1, done: false }
Выполнение возобновлено
{ value: undefined, done: true }
```

* Функция начинает выполнение только после вызова `next` объекта-генератора.
* Функция *делает паузу*, как только встречается оператор yield.
* Функция *возобновляется* при вызове `next`.

> Так что, по сути, выполнение функции генератора контролируется объектом генератора.

Наше общение с использованием генератора было в основном односторонним, когда генератор возвращал значения для итератора. Одна чрезвычайно мощная особенность генераторов в JavaScript состоит в том, что они допускают двустороннюю связь!

* Вы можете контролировать результирующее значение выражения `yield`, используя `iterator.next(valueToInject)`
* вы можете бросить исключение в выражении `yield`, используя `iterator.throw(error)`

В следующем примере демонстрируется `iterator.next(valueToInject)`:

```ts
function* generator() {
    var bar = yield 'foo';
    console.log(bar); // bar!
}

const iterator = generator();
// Начинаем выполнение и получим первое значение yield
const foo = iterator.next();
console.log(foo.value); // foo
// Возобновляем выполнение, вводя bar
const nextThing = iterator.next('bar');
```

В следующем примере демонстрируется `iterator.throw(error)`:

```ts
function* generator() {
    try {
        yield 'foo';
    }
    catch(err) {
        console.log(err.message); // bar!
    }
}

var iterator = generator();
// Начинаем выполнение и получим первое значение yield
var foo = iterator.next();
console.log(foo.value); // foo
// Возобновляем выполнение, бросив исключение 'bar'
var nextThing = iterator.throw(new Error('bar'));
```

Итак, вот резюме:
* `yield` позволяет функции генератора приостанавливать выполнение и передавать управление внешней системе
* внешняя система может передать значение в тело функции генератора
* внешняя система может бросить исключение в тело функции генератора

И чем это может быть полезно? Перейдите к следующему разделу [**async/await**][async-await] и узнайте.

[iterator]:./iterators.md
[async-await]:./async-await.md
