### Размеченные объединения

Если у вас есть класс с [*литералами*](./literal-types.md), вы можете использовать это свойство для разметки частей объединения и их отличия.

В качестве примера рассмотрим объединение `Square` и `Rectangle`, здесь у нас есть элемент `kind`, который существует в обоих частях объединения и имеет определенный *литеральный тип*:

```ts
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
type Shape = Square | Rectangle;
```

Если вы используете стиль проверки - защита типа, а именно сравнение (`==`, `===`, `!=`, `!==`) или `switch` со *свойством отличия* (здесь `kind`), то TypeScript поймет, что объект должен иметь тип, который имеет этот конкретный литерал и уточнит для вас тип :)

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        // Теперь TypeScript *знает*, что `s` должен быть квадратом ;)
        // Так что вы можете безопасно использовать его свойства :)
        return s.size * s.size;
    }
    else {
        // Не квадрат? Что ж, TypeScript определит, что это должен быть прямоугольник ;)
        // Так что вы можете безопасно использовать его свойства :)
        return s.width * s.height;
    }
}
```

### Тщательные проверки
Довольно часто вы хотите убедиться, что у всех частей объединения есть какой-то код (действие) обрабатывающее их.

```ts
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
// Кто-то только что добавил этот новый тип `Circle`
// Мы бы хотели, чтобы TypeScript выдавал ошибку везде где это *нужно*, для её исправления
interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;
```

В качестве примера того, где что-то идет не так:

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    // Было бы здорово, если бы вы могли заставить TypeScript выдавать вам ошибку?
}
```

Вы можете сделать это, просто добавив переход к следующему условию в списке(при отсутствии совпадения) и убедившись, что предполагаемый тип в этом блоке совместим с типом never. Например, если вы добавите тщательную проверку, вы получите красивую ошибку:

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    else {
        // ОШИБКА: `Circle` нельзя присвоить `never`
        const _exhaustiveCheck: never = s;
    }
}
```

Это заставляет вас обработать этот новый вариант:

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    else if (s.kind === "circle") {
        return Math.PI * (s.radius **2);
    }
    else {
        // Okay еще раз
        const _exhaustiveCheck: never = s;
    }
}
```


### Switch
СОВЕТ: конечно, вы также можете сделать это помощью инструкции `switch`:

```ts
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
        default: const _exhaustiveCheck: never = s;
    }
}
```

[references-discriminated-union]:https://github.com/Microsoft/TypeScript/pull/9163

### strictNullChecks

При использовании *strictNullChecks* и выполнении тщательных проверок TypeScript может пожаловаться, что "не все пути кода возвращают значение". Вы можете отключить это, просто вернув переменную `_exhaustiveCheck` (типа `never`). Вот так:

```ts
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
        default:
          const _exhaustiveCheck: never = s;
          return _exhaustiveCheck;
    }
}
```

### Добавьте тщательные проверки
Вы можете написать функцию, которая принимает `never` (и поэтому может быть вызвана только с переменной, которая логически выводится как `never`), а затем выбрасывает ошибку, если ее тело когда-либо выполняется:

```ts
function assertNever(x:never): never {
    throw new Error('Неожиданное значение. Не должно было быть never.');
}
```

Пример использования с функцией вычисления площади:

```ts
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
type Shape = Square | Rectangle;

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        // Если во время компиляции добавлен новый кейс, вы получите ошибку компиляции
        // Если новое значение появится во время выполнения, вы получите ошибку во время выполнения
        default: return assertNever(s);
    }
}
```

### Ретроспективное управление версиями
Допустим, у вас есть структура данных в форме:

```ts
type DTO = {
  name: string
}
```
И после того, как у вас есть куча таких `DTO`, вы понимаете, что `name` было плохим выбором. Вы можете добавить управление версиями ретроспективно, создав новое *объединение* с *литеральным номером* (или строкой, если хотите) для DTO. Отметьте версию 0 как `undefined`, и если у вас включен *strictNullChecks*, это сработает:

```ts
type DTO = 
| { 
   version: undefined, // версия 0
   name: string,
 }
| {
   version: 1,
   firstName: string,
   lastName: string, 
}
// Ещё позднее
| {
    version: 2,
    firstName: string,
    middleName: string,
    lastName: string, 
} 
// И так далее
```

Пример использования такого DTO:

```ts
function printDTO(dto:DTO) {
  if (dto.version == null) {
      console.log(dto.name);
  } else if (dto.version == 1) {
      console.log(dto.firstName,dto.lastName);
  } else if (dto.version == 2) {
      console.log(dto.firstName, dto.middleName, dto.lastName);
  } else {
      const _exhaustiveCheck: never = dto;
  }
}
```

### Redux

Популярная библиотека, которая использует это - redux.

Вот [*суть redux*](https://github.com/reactjs/redux#the-gist) с добавленными описаниями типов TypeScript:

```ts
import { createStore } from 'redux'

type Action
  = {
    type: 'INCREMENT'
  }
  | {
    type: 'DECREMENT'
  }

/**
 * Это редюсер, чистая функция с сигнатурой (состояние, действие) => состояние .
 * Он описывает, как действие преобразует состояние в следующее состояние.
 *
 * Форма состояния зависит от вас: это может быть примитив, массив, объект,
 * или даже структура данных Immutable.js. Единственная важная часть - вы должны
 * не изменять объект состояния, а возвращать новый объект, если состояние изменяется.
 *
 * В этом примере мы используем оператор switch и строки, но вы можете использовать хелпер, который
 * следует другому соглашению (например, маппинг функций), если это имеет смысл для вашего
 * проекта.
 */
function counter(state = 0, action: Action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

// Создаем хранилище Redux, в котором хранится состояние вашего приложения.
// Его API: {subscribe, dispatch, getState}.
let store = createStore(counter)

// Вы можете использовать subscribe() для обновления пользовательского интерфейса в ответ на изменения состояния.
// Обычно вы бы использовали библиотеку привязки представления (например, React Redux), а не subscribe() напрямую.
// Однако также может быть удобно сохранить текущее состояние в localStorage.

store.subscribe(() =>
  console.log(store.getState())
)

// Единственный способ изменить внутреннее состояние - отправить действие.
// Действия могут быть сериализованы, залогированы или сохранены, а затем воспроизведены.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

Использование redux с TypeScript обеспечивает защиту от опечаток, повышенную способность к рефакторингу и самодокументируемый код.
