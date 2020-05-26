### Деструктурирование

TypeScript поддерживает следующие формы деструктурирования (буквально названо в честь де-структурирования, т.е. разбиения структуры):

1. деструктурирование объектов
1. деструктурирование массивов

Проще всего представить деструктурирование как обратное от *структурирования*. Метод *структурирования* в JavaScript - это объект:

```ts
var foo = {
    bar: {
        bas: 123
    }
};
```
Без потрясающей поддержки *структурирования* в JavaScript, создание новых объектов на лету было бы очень громозким. Деструктурирование обеспечивает тот же уровень удобства для извлечения данных из структуры.

#### Деструктурирование объектов
Деструктурирование полезно, потому что позволяет в одну строку выполнить то, что обычно требует нескольких строк кода.
Destructuring is useful because it allows you to do in a single line, what would otherwise require multiple lines. Рассмотрим следующий случай:

```ts
var rect = { x: 0, y: 10, width: 15, height: 20 };

// деструктурирование
var {x, y, width, height} = rect;
console.log(x, y, width, height); // 0,10,15,20

rect.x = 10;
({x, y, width, height} = rect); // присваивание существующим переменным, используя внешние скобки
console.log(x, y, width, height); // 10,10,15,20
```
При отсутствии деструктурирования вам придется выбирать `x,y,width,height` по одному из `rect`.

Чтобы присвоить извлеченную переменную новой переменной, вы можете сделать следующее:

```ts
// структурирование
const obj = {"some property": "some value"};

// деструктурирование
const {"some property": someProperty} = obj;
console.log(someProperty === "some value"); // true
```

Дополнительно вы можете получить *глубокие* данные из структуры, используя деструктурирование. Это показано на следующем примере:

```ts
var foo = { bar: { bas: 123 } };
var {bar: {bas}} = foo; // Фактически `var bas = foo.bar.bas;`
```

#### Деструктурирование объекта с rest параметрами
Вы можете выбрать любое количество элементов из объекта и получить *объект* из оставшихся элементов, используя деструктурирование объекта с rest параметром.

```ts
var {w, x, ...remaining} = {w: 1, x: 2, y: 3, z: 4};
console.log(w, x, remaining); // 1, 2, {y:3,z:4}
```
Распространенный вариант использования - это игнорирование определенных свойств. Например:
```ts
// Пример функции
function goto(point2D: {x: number, y: number}) {
  // Представим что внутри код, который не может быть выполнен
  // если мы передадим объект
  // с болшим количеством свойств
}
// Значения, которые мы получаем откуда-то
const point3D = {x: 1, y: 2, z: 3};
/** Используем rest параметр для удаления лишних свойств */
const { z, ...point2D } = point3D;
goto(point2D);
```

#### Array Destructuring
A common programming question: "How to swap two variables without using a third one?". The TypeScript solution:

```ts
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2,1
```
Note that array destructuring is effectively the compiler doing the `[0], [1], ...` and so on for you. There is no guarantee that these values will exist.

#### Array Destructuring with rest
You can pick up any number of elements from an array and get *an array* of the remaining elements using array destructuring with rest.

```ts
var [x, y, ...remaining] = [1, 2, 3, 4];
console.log(x, y, remaining); // 1, 2, [3,4]
```

#### Array Destructuring with ignores
You can ignore any index by simply leaving its location empty i.e. `, ,` in the left hand side of the assignment. For example:
```ts
var [x, , ...remaining] = [1, 2, 3, 4];
console.log(x, remaining); // 1, [3,4]
```

#### JS Generation
The JavaScript generation for non ES6 targets simply involves creating temporary variables, just like you would have to do yourself without native language support for destructuring e.g.

```ts
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2,1

// becomes //

var x = 1, y = 2;
_a = [y,x], x = _a[0], y = _a[1];
console.log(x, y);
var _a;
```

#### Summary
Destructuring can make your code more readable and maintainable by reducing the line count and making the intent clear. Array destructuring can allow you to use arrays as though they were tuples.
