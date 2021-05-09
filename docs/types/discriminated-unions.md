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

### 빠짐없는 검사(Exhaustive Check)
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

만약 *strictNullChecks*를 사용하고 완전 검사를 사용한다면, TypeScript가 "not all code paths return a value"라는 오류를 발생시킬 수 있습니다. 이건 간단히 `_exhaustiveCheck` (`never` 타입) 변수를 반환하면 해결됩니다, 이렇게:

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

### 완전 검사헤서 Throw
`never` 타입을 받는 함수 (따라서 변수의 타입이 `never`로 추론될 때만 호출되는 함수)를 만들고 함수 본문이 실행될 때 오류를 던질(throw) 수 있습니다: 

```ts
function assertNever(x:never): never {
    throw new Error('Unexpected value. Should have been never.');
}
```

면적 계산 함수에서 사용하는 예제: 

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
		// 컴파일 시간이 새로운 케이스가 추가되면 컴파일 오류가 발생함
		// 실행 시간에 새로운 값이 발생하면 런타임 오류가 발생함
        default: return assertNever(s);
    }
}
```

### 회고적 버전 관리(Retrospective Versioning)
이런 형태으 자료 구조가 있다고 하고: 

```ts
type DTO = {
  name: string
}
```
이 `DTO`를 잔뜩 만든 다음에 `name`이란 선택이 마음에 들지 않게 될 수 있습니다. 이런 경우 *리터럴 숫자(원한다면 문자열도 가능)*로 된 새로운 *유니온*을 만들어서 DTO의 버전을 식별할 수 있습니다. 버전 0을 `undefined`로 표기하고 *strictNullChecks*를 활성화시키면 그냥 됩니다:

```ts
type DTO = 
| { 
   version: undefined, // 버전 0
   name: string,
 }
| {
   version: 1,
   firstName: string,
   lastName: string, 
}
// 다음에 또 추가
| {
    version: 2,
    firstName: string,
    middleName: string,
    lastName: string, 
} 
// 계속 추가
```

 이렇게 DTO를 사용하는 예제:

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

이 기능을 활용하는 유명 라이브러리가 redux 입니다.

이것은 [*리덕스의 주요 내용*](https://github.com/reactjs/redux#the-gist)에 TypeScript 타입 어노테이션이 추가된 모습입니다:

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
 * 이것은 리듀서(reducer)로, (state, action) => state 서명을 갖는 순수 함수임.
 * 이것은 액션이 현재 상태(state)를 다음 상태로 어떻게 전환시키는지 나타냄.
 *
 * 상태(state)의 형태는 마음대로: 기본 타입, 배열, 객체 사용 가능,
 * 아니면 Immutable.js 자료 구조도 사용할 수 있음.
 * 한가지 중요한 점은 상태 객체를 직접 변경하면 안되고,
 * 상태가 변경된 새로운 객체를 반환해야 한다는 것.
 *
 * 이 예제에 우리는 `switch` 문과 문자열을 사용했지만 프로젝트 성격에 맞게
 * 다른 방식을 따르는 도우미 함수(함수 맵 같은 것)도 사용할 수 있음.
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

// 앱의 상태를 보관하는 Redux 스토어 생성.
// API는 { subscribe, dispatch, getState }.
let store = createStore(counter)

// 변경에 대해 subscribe() 하여 상태 변경에 따라 UI를 바꿔줄 수 있음.
// 보통은 subscribe()를 직접 사용하지 않고 뷰 바인딩 라이브러리
// (예를 들면, React Redux)를 사용함.
// 하지만, 현재의 상태를 localStorage에 저장하는 것도 한 방법.

store.subscribe(() =>
  console.log(store.getState())
)

// 내부 상태를 바꾸는 유일한 방법은 액션을 디스패치하는 것임.
// 액션일 시리얼라이즈 할 수 있고 로그로 출력하거나 저장했다가 나중에
// 재실행할 수 있음.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

TypeScript를 사용하면 오타로 인한 오류를 방지할 수 있고 리팩터링 편의성이 향상되며 코드가 좀더 자체 문서화되게 할 수 있습니다.

