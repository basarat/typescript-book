### 구별된 유니온(Discriminated Union)

[*리터럴 멤버 속성*](./literal-types.md)이 있는 클래스가 있다면 그 속성으로 유니온 구성원을 구별할 수 있습니다.

예제로 `Square` 타입과 `Rectangle` 타입의 유니온을 생각해봅시다. 여기에 `kind`라는 멤버 속성이 있는데, 이 속성은 모든 유니온 구성원에 존재하는 *리터럴 타입*입니다:

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

이런 경우, *구별 속성(여기선 `kind`)*에 대해 타입 가드 스타일의 검사 (`==`, `===`, `!=`, `!==`) 또는 `switch`를 사용하면 TypeScript가 특정한 리터럴을 가진 객체를 대상으로 한다는 것을 알아채고 알아서 타입 좁히기를 실행해줍니다 :)

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        // 이것으로 TypeScript가 `s`가 `Square`임을 알게 됨 ;)
        // 그러므로 `Square`의 멤버를 안전하게 사용할 수 있음 :)
        return s.size * s.size;
    }
    else {
        // `Square`가 아님? 그러면 TypeScript는
        // 이것이 `Rectangle`일 수 밖에 없음을 알게 됨 ;)
        // 그러므로 `Rectangle`의 멤버를 안전하게 사용할 수 있음 :)
        return s.width * s.height;
    }
}
```

### 빠짐없는 검사
매우 자주 유니온의 모든 구성원들이 어떤 코드(동작)를 가지고 있음을 보장하고 싶어집니다.

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

// 누가 새로운 타입 `Circle`을 추가함
// 이 새로운 타입에 대한 *처리가 필요한* 곳에서 TypeScript가 오류를 발생시켜주길 바람
interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;
```

예를 들어 조치가 필요한 부분:

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    // 여기서 TypeScript가 오류를 발생시켜주면 얼마나 좋을까?
}
```

간단하게, 조건에 걸리지 않는 블럭을 하나 추가하고 그 블럭에서 추론된 타입이 `never` 타입과 호환되는 것으로 정의하면 됩니다. 예제처럼 완전(exhaustive) 검사를 추가하면 보기좋게 오류가 발생합니다:

```ts
function area(s: Shape) {
    if (s.kind === "square") {
        return s.size * s.size;
    }
    else if (s.kind === "rectangle") {
        return s.width * s.height;
    }
    else {
        // ERROR : `Circle` is not assignable to `never`
        const _exhaustiveCheck: never = s;
    }
}
```

그러면 새로 추가된 경우를 처리하며 됩니다: 

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
        // 오케이, 한번 더
        const _exhaustiveCheck: never = s;
    }
}
```


### Switch
팁: 당연히 `switch` 문에서 동일하게 할 수 있습니다:

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

If using *strictNullChecks* and doing exhaustive checks, TypeScript might complain "not all code paths return a value". You can silence that by simply returning the `_exhaustiveCheck` variable (of type `never`). So:

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

### Throw in exhaustive checks
You can write a function that takes a `never` (and therefore can only be called with a variable that is inferred as `never`) and then throws an error if its body ever executes: 

```ts
function assertNever(x:never): never {
    throw new Error('Unexpected value. Should have been never.');
}
```

Example use with the area function: 

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
		// If a new case is added at compile time you will get a compile error
		// If a new value appears at runtime you will get a runtime error
        default: return assertNever(s);
    }
}
```

### Retrospective Versioning
Say you have a data structure of the form: 

```ts
type DTO = {
  name: string
}
```
And after you have a bunch of `DTO`s you realize that `name` was a poor choice. You can add versioning retrospectively by creating a new *union* with *literal number* (or string if you want) of DTO. Mark the version 0 as `undefined` and if you have *strictNullChecks* enabled it will just work out: 

```ts
type DTO = 
| { 
   version: undefined, // version 0
   name: string,
 }
| {
   version: 1,
   firstName: string,
   lastName: string, 
}
// Even later 
| {
    version: 2,
    firstName: string,
    middleName: string,
    lastName: string, 
} 
// So on
```

 Example usage of such a DTO:

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

A popular library that makes use of this is redux.

Here is the [*gist of redux*](https://github.com/reactjs/redux#the-gist) with TypeScript type annotations added:

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
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
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

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However, it can also be handy to persist the current state in the localStorage.

store.subscribe(() =>
  console.log(store.getState())
)

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

Using it with TypeScript gives you safety against typo errors, increased refactor-ability and self documenting code.

