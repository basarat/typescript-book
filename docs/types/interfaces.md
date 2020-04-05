## 인터페이스

인터페이스는 자바스크립트 런타임 환경에서는 전혀 영향을 주지 않습니다. 인터페이스는 타입스크립트에서 변수의 구조로 선언됩니다

다음 두가지는 동등한 선언이며 하나는 **인라인 주석**을 사용하고 두번째는 **인터페이스**를 사용합니다.

```ts
// Sample A
declare var myPoint: { x: number; y: number }

// Sample B
interface Point {
    x: number
    y: number
}
declare var myPoint: Point
```

**Sample B**의 장점응ㄴ 누군가가 `myPoint` 라이브러리에 빌드 된 라이브러리를 작성하여 새 멤버를 추가한다는 것입니다. 기존의 `myPoint` 선언에 쉽게 추가 할 수 있습니다.

```ts
// Lib a.d.ts
interface Point {
    x: number; y: number;
}
declare var myPoint: Point;

// Lib b.d.ts
interface Point {
    z: number;
}

// Your code
var myPoint.z; // Allowed!
```

위의 코드가 허용이 되는 이유는 **타입스크립트의 인터페이스는 개방형**이기 때문입니다. 이것은 **인터페이스**를 사용하여 자바스크립트의 확장성을 모방하는 타입스크립트의 핵심 원리입니다.

## 클래스는 인터페이스를 구현할 수 있습니다.

만약 누군가가 `interface`에서 객체의 구조를 따라야 하는 **클래스**를 사용하려면 `implements` 키워드를 사용해서 호환성을 보장할 수 있습니다.

```ts
interface Point {
    x: number
    y: number
}

class MyPoint implements Point {
    x: number
    y: number // Same as Point
}
```

기본적으로 `implements`로 외부의 인터페이스를 연결한 경우 변경으로 인해 코드베이스에 컴파일 오류가 발생해도 쉽게 동기화 할 수 있습니다.

```ts
interface Point {
    x: number
    y: number
    z: number // New member
}

class MyPoint implements Point {
    // ERROR : missing member `z`
    x: number
    y: number
}
```

`implements`는 클래스 **instances**의 구조를 제한합니다.

```ts
var foo: Point = new MyPoint()
```

그리고 `foo: Point = MyPoint`와 같은 것은 다릅니다.

## 팁

### 모든 인터페이스를 쉽게 구현할 수 있는 것은 아닙니다.

인터페이스는 자바스크립트에 존재할 수 있는 임의의 구조를 선언하도록 설계되었습니다.
`new`로 무언가를 호출 할 수 있는 다음 인터페이스를 고려하십시요.

```ts
interface Crazy {
    new (): {
        hello: number
    }
}
```

기본적으로 다음과 같이 작성합니다.

```ts
class CrazyClass implements Crazy {
    constructor() {
        return { hello: 123 }
    }
}
// Because
const crazy = new CrazyClass() // crazy would be {hello:123}
```

인터페이스를 이용해서 모든 자바스크립트를 선언하고 심지어 타입스크립트에서 안전하게 사용 할 수도 있습니다. 타입스크립트 클래스를 사용하여 구현할 수 있는 것은 아닙니다.
