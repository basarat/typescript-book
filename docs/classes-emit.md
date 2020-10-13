#### Что случилось с IIFE
JS код, сгенерированный для класса, мог бы быть таким:
```ts
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.add = function (point) {
    return new Point(this.x + point.x, this.y + point.y);
};
```

Причина, по которой он обернут в Немедленно Вызываемое Функциональное Выражение (IIFE), например:

```ts
(function () {

    // тело функции

    return Point;
})();
```

связана с наследованием. Это позволяет TypeScript захватить базовый класс как переменную `_super`:

```ts
var Point3D = (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z) {
        _super.call(this, x, y);
        this.z = z;
    }
    Point3D.prototype.add = function (point) {
        var point2D = _super.prototype.add.call(this, point);
        return new Point3D(point2D.x, point2D.y, this.z + point.z);
    };
    return Point3D;
})(Point);
```

Обратите внимание, что IIFE позволяет TypeScript легко захватить базовый класс `Point` в переменной `_super` и последовательно использовать в теле класса.

### `__extends`
Вы заметите, что как только унаследуете класс, TypeScript сгенерирует следующий код:

```ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
```
Здесь `d` относится к дочернему классу и `b` относится к базовому. Эта функция делает 2 вещи:
1. копирует статичные члены базового класса в дочерний класс:  `for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];`
1. устанавливает прототип функции дочернего класса на опциональный поиск членов родительского `proto`, то есть фактически `d.prototype.__proto__ = b.prototype`

Люди редко имеют проблемы с пониманием 1, но многие испытывают сложности с 2. Разберемся по порядку.

#### `d.prototype.__proto__ = b.prototype`

Я нашел самое простое объяснение этой темы в процессе обучения многих людей. Сначала мы объясним почему код из `__extends` эквивалентен `d.prototype.__proto__ = b.prototype`, и потом почему эта строка важна сама по себе. Чтобы понять все это, вам нужно знать следующее:

1. `__proto__`
1. `prototype`
1. влияние `new` на `this` внутри вызываемой функции
1. влияние `new` на `prototype` и `__proto__`

Все объекты в JavaScript содержат `__proto__`. Этот член часто недоступен в старых браузерах (иногда документация ссылается на это магическое свойство как `[[prototype]]`). Оно имеет одну цель: если какое-то свойство не найдено на объекте во время поиска (например `obj.property`), тогда поиск будет осуществлен по `obj.__proto__.property`. Если и там не найдется нужное свойство, то  продолжится в `obj.__proto__.__proto__.property` до тех пор, пока: *не будет найдено* или *последний `.__proto__` не будет равен null*. Это объясняет почему про JavaScript говорят, что он поддерживает *прототипное наследование* из коробки. Это продемонстрировано в следующем примере, который вы можете запустить в консоли Хрома или Node.js:

```ts
var foo = {}

// задаем разные значения свойства bar на foo и на foo.__proto__
foo.bar = 123;
foo.__proto__.bar = 456;

console.log(foo.bar); // 123
delete foo.bar; // удаляем bar с объекта
console.log(foo.bar); // 456
delete foo.__proto__.bar; // удаляем bar c foo.__proto__
console.log(foo.bar); // undefined
```

Теперь вы поняли `__proto__`. Другой полезный факт состоит в том, что все `function` в JavaScript имеют свойство `prototype`, а `prototype` в свою очередь имеет `constructor`, указывающий на саму `function`. Как показано ниже:

```ts
function Foo() { }
console.log(Foo.prototype); // {} т.е. prototype существует и не равен undefined
console.log(Foo.prototype.constructor === Foo); // Имеет член с именем `constructor`, ссылающийся на саму функцию
```

Теперь посмотрим как *влияет `new` на `this` внутри вызываемой функции*. По сути `this` внутри вызываемой функции указывает на созданный объект, который будет возвращен функцией. Это легко увидеть, если изменить значение какого-нибудь свойства на `this` внутри функции:

```ts
function Foo() {
    this.bar = 123;
}

// вызов с new оператором
var newFoo = new Foo();
console.log(newFoo.bar); // 123
```

Теперь единственное, что вам нужно знать, это то, что вызов `new` для функции присваивает `prototype` этой функции на `__proto__` нового созданного объекта, который функция возвращает как результат вызова. Далее код, который можно запустить для большего понимания:

```ts
function Foo() { }

var foo = new Foo();

console.log(foo.__proto__ === Foo.prototype); // True!
```

Вот и все. Теперь посмотрим на `__extends`. Я пронумеровал строки:

```ts
1  function __() { this.constructor = d; }
2   __.prototype = b.prototype;
3   d.prototype = new __();
```

Обратное чтение этой функции `d.prototype = new __()` в 3 строке фактически означает, что `d.prototype = {__proto__ : __.prototype}` (из-за влияния `new` на `prototype` и `__proto__`), комбинируя его с предыдущей строкой (строка 2 `__.prototype = b.prototype;`), вы получаете `d.prototype = {__proto__ : b.prototype}`.

Но подождите, мы же хотели `d.prototype.__proto__`, т.е. просто изменить proto и сохранить старый `d.prototype.constructor`. Вот где значение первой строки (`function __() { this.constructor = d; }`) вступает в силу.  Здесь мы будем фактически иметь `d.prototype = {__proto__ : __.prototype, constructor : d}` (из-за влияния `new` на `this` внутри вызываемой функции). Итак, поскольку мы восстанавливаем `d.prototype.constructor`, единственное, что мы действительно мутировали это `__proto__`, следовательно `d.prototype.__proto__ = b.prototype`.

#### `d.prototype.__proto__ = b.prototype` значение

Это значение и есть то, что позволяет добавлять члены-функции к дочернему классу и наследовать другие от базового класса. Это показано на следующем примере:

```ts
function Animal() { }
Animal.prototype.walk = function () { console.log('walk') };

function Bird() { }
Bird.prototype.__proto__ = Animal.prototype;
Bird.prototype.fly = function () { console.log('fly') };

var bird = new Bird();
bird.walk();
bird.fly();
```

По сути `bird.fly` будет найден в `bird.__proto__.fly` (помните, что вызов `new` присвоит `bird.__proto__` все содержимое `Bird.prototype`) и `bird.walk` (унаследованный член) будет найден в `bird.__proto__.__proto__.walk` (как `bird.__proto__ == Bird.prototype` и `bird.__proto__.__proto__` == `Animal.prototype`).
