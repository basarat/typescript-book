# JSX вне React

TypeScript предоставляет вам возможность использовать JSX с проверкой типов в чём-то кроме React. Ниже перечислены параметры настройки, но обратите внимание, что это для продвинутых создателей фреймворков пользовательского интерфейса:

* Вы можете отключить выдачу кода в стиле `react`, используя опцию `"jsx": "preserve"`. Это означает, что JSX передается *как есть*, а затем вы можете использовать свой собственный транспилятор для преобразования частей JSX.
* Использование глобального модуля `JSX`:
    * Вы можете контролировать, какие HTML-теги доступны и как они проверяются на типы, настраивая элементы интерфейса `JSX.IntrinsicElements`.
    * При использовании компонентов:
        * Вы можете контролировать, какой `класс` должен быть унаследован компонентами, настроив объявление по умолчанию `interface ElementClass extends React.Component<any, any> { }`.
        * Вы можете контролировать, какое свойство используется для проверки типов атрибутов (по умолчанию - `props`), настраивая `declare module JSX { interface ElementAttributesProperty { props: {}; } }` объявление.

## `jsxFactory`

Передача `--jsxFactory <имя фабрики JSX>` вместе с `--jsx react` позволяет использовать другую фабрику JSX, отличную от стандартной `React`.

Новое имя фабрики будет использоваться для вызова функций `createElement`.

### Пример

```ts
import {jsxFactory} from "jsxFactory";

var div = <div>Hello JSX!</div>
```

Скомпилировано с:

```shell
tsc --jsx react --reactNamespace jsxFactory --m commonJS
```

Результат:

```js
"use strict";
var jsxFactory_1 = require("jsxFactory");
var div = jsxFactory_1.jsxFactory.createElement("div", null, "Hello JSX!");
```

## `jsx` pragma

Вы даже можете указать разные `jsxFactory` для каждого файла, используя `jsxPragma`, например.


```js
/** @jsx jsxFactory */
import {jsxFactory} from "jsxFactory";

var div = <div>Hello JSX!</div>
```

Даже с `--jsx react` этот файл будет всё равно будет генерировать код учитывая фабрику, указанную в jsx pragma:
```js
"use strict";
var jsxFactory_1 = require("jsxFactory");
var div = jsxFactory_1.jsxFactory.createElement("div", null, "Hello JSX!");
```
