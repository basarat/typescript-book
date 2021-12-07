## Числа
Всякий раз, когда вы работаете с числами в любом языке программирования, вы должны знать об особенностях обработки чисел в этом языке. Далее несколько важных моментов о числах в JavaScript, которые вы должны знать.

### Основной тип
В JavaScript есть только один числовой тип. Это 64-битный `Number` с двойной точностью. Далее мы рассмотрим его ограничения и рекомендуемые решения.

### Десятичные числа
Для тех, кто знаком с doubles / float в других языках, важно знать, что двоичные числа с плавающей запятой обрабатываются *некорректно*. Известный пример некорректной работы с числами в JavaScript:

```js
console.log(.1 + .2); // 0.30000000000000004
```

> Для корректных математических вычислений используйте `big.js`, упоминаемый ниже.

### Целые числа
Ограничения для целых чисел представлены встроенным числовым типом и составляют `Number.MAX_SAFE_INTEGER` и `Number.MIN_SAFE_INTEGER`.

```js
console.log({max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER});
// {max: 9007199254740991, min: -9007199254740991}
```

**Безопасно** в данном контексте означает, что полученное значение *не может быть результатом ошибки округления*.

Небезопасные значения находятся на расстоянии `+1 / -1` от безопасных значений и при любых сложениях/вычитаниях результат будет *округлен*.

```js
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true!
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2); // true!

console.log(Number.MAX_SAFE_INTEGER);      // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1);  // 9007199254740992 - Верно
console.log(Number.MAX_SAFE_INTEGER + 2);  // 9007199254740992 - Округлено!
console.log(Number.MAX_SAFE_INTEGER + 3);  // 9007199254740994 - Округлено - случайно корректно
console.log(Number.MAX_SAFE_INTEGER + 4);  // 9007199254740996 - Округлено!
```

Для проверки безопасности вычислений можно использовать ES6 `Number.isSafeInteger`:

```js
// Безопасное значение
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true

// Небезопасное значение
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false

// Потому что может быть округлено некорректно
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 10)); // false
```

> JavaScript в будущем будет поддерживать [BigInt](https://developers.google.com/web/updates/2018/05/bigint). Но сейчас, если вы хотите целочисленных математических вычислений произвольной точности, вы можете использовать `big.js`.

### big.js
Всякий раз, когда вы используете математику для финансовых расчетов (например, расчет налогов, деньги с центами, сложение/вычитание и тд) используйте библиотеки типа [big.js](https://github.com/MikeMcl/big.js/), которые предназначены для:
* Идеальной десятичной математики
* Безопасных вычислений нецелочисленных значений

Установка проста:
```bash
npm install big.js @types/big.js
```

Пример использования:

```js
import { Big } from 'big.js';

export const foo = new Big('111.11111111111111111111');
export const bar = foo.plus(new Big('0.00000000000000000001'));

// Получить число:
const x: number = Number(bar.toString()); // Потеря точности
```

> Не используйте эту библиотеку для вычислений на UI / тяжелых по производительности задач, например, для построения графиков и тп.

### NaN
Когда результат какого-либо вычисления не является действительным числом, JavaScript возвращает специальное значение `NaN`. Классический пример ниже:

```js
console.log(Math.sqrt(-1)); // NaN
```

Запомните: Проверка на равенство **не** работает с `NaN`. Используейте `Number.isNaN`:

```js
// Не верно
console.log(NaN === NaN); // false!!

// Верно
console.log(Number.isNaN(NaN)); // true
```

### Infinity
Внешние границы значений, представленных в Number, доступны в виде статических значений `Number.MAX_VALUE` и `-Number.MAX_VALUE`.

```js
console.log(Number.MAX_VALUE);  // 1.7976931348623157e+308
console.log(-Number.MAX_VALUE); // -1.7976931348623157e+308
```

Значения за пределами этого диапазона, где точность не изменяется, находятся в тех же пределах, например:

```js
console.log(Number.MAX_VALUE + 1 == Number.MAX_VALUE);   // true!
console.log(-Number.MAX_VALUE - 1 == -Number.MAX_VALUE); // true!
```

Значения за пределами этого диапазона, где точность изменяется, преобразуются в специальные значения `Infinity`/`-Infinity`, например:

```js
console.log(Number.MAX_VALUE + 10**1000);  // Infinity
console.log(-Number.MAX_VALUE - 10**1000); // -Infinity
```

Конечно, эти специальные значения также отображаются при вычислениях, для которых они необходимы, например:

```js
console.log( 1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
```

Вы можете использовать `Infinity` вручную или использовать статичные члены класса `Number`:

```js
console.log(Number.POSITIVE_INFINITY === Infinity);  // true
console.log(Number.NEGATIVE_INFINITY === -Infinity); // true
```

К счастью, операторы сравнения (`<` / `>`) умеют корректно работать с `Infinity` значениями:

```js
console.log( Infinity >  1); // true
console.log(-Infinity < -1); // true
```

### Бесконечно малые числа

Наименьшее ненулевое значение представлено в Number как статичный член `Number.MIN_VALUE`

```js
console.log(Number.MIN_VALUE);  // 5e-324
```

Все значения, которые меньше, чем `MIN_VALUE`, конвертируются в 0.

```js
console.log(Number.MIN_VALUE / 10);  // 0
```

> Интуитивно: Только значения, которые больше, чем `Number.MAX_VALUE`, приводятся к INFINITY, значения, которые меньше, чем `Number.MIN_VALUE`, приводятся к `0`.
