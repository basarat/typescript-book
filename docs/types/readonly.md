## readonly
TypeScript의 타입 시스템은 인터페이스 속성을 `readonly` (읽기 전용)으로 지정할 수 있게 해줍니다. 이를 통해 함수형 방식이 가능해집니다 (예상되지 않은 상태 변경은 나쁨):

```ts
function foo(config: {
    readonly bar: number,
    readonly bas: number
}) {
    // ..
}

let config = { bar: 123, bas: 123 };
foo(config);
// `config`가 변경되지 않는다고 확신할 수 있음 🌹
```

당연히 `readonly`는 `interface`와 `type` 정의에서 모두 사용할 수 있습니다, 예를 들면:

```ts
type Foo = {
    readonly bar: number;
    readonly bas: number;
}

// 초기화는 오케이
let foo: Foo = { bar: 123, bas: 456 };

// 변경은 안됨
foo.bar = 456; // 오류: 상수나 읽기 전용 속성은 대입 표현식의 좌항이 될 수 없음
```

클래스의 속성도 `readonly`로 선언할 수 있습니다. 이런 속성은 선언 시점에 초기화하거나 아래 보인 것처럼 생성자(constructor)에서 초기화할 수 있습니다:

```ts
class Foo {
    readonly bar = 1; // OK
    readonly baz: string;
    constructor() {
        this.baz = "hello"; // OK
    }
}
```

## Readonly
타입 매핑을 이용하여 `T` 타입을 받고 그 타입의 모든 속성을 `readonly`로 지정하는 `Readonly`라는 타입이 있습니다. 여기에 실제로 이걸 사용하는 데모가 나와 있습니다: 

```ts
type Foo = {
  bar: number;
  bas: number;
}

type FooReadonly = Readonly<Foo>; 

let foo: Foo = {bar: 123, bas: 456};
let fooReadonly: FooReadonly = {bar: 123, bas: 456};

foo.bar = 456; // 오케이
fooReadonly.bar = 456; // 오류: bar는 readonly임
```

### 다양한 사용 사례

#### ReactJS
불변성(immutability)을 사랑하는 라이브러리로 ReactJS가 있는데, `Props`와 `State`를 불변하는 것으로 *표시할 수 있습니다*, 예를 들면:

```ts
interface Props {
    readonly foo: number;
}
interface State {
    readonly bar: number;
}
export class Something extends React.Component<Props,State> {
  someMethod() {
    // 아래와 같은 일이 발생할 수 없음을 확신할 수 있음
    this.props.foo = 123; // 오류: (props는 불변임)
    this.state.baz = 456; // 오류: (this.setState를 사용해야 함)  
  }
}
```

하지만 React의 타입 정의가 이들을 이미 `readonly`로 표기하고 있기 때문에 직접 이렇게 할 필요는 없습니다 (내부적으로 인자로 전달된 제네릭 타입을 앞서 설명한 `Readonly` 타입으로 감쌈).

```ts
export class Something extends React.Component<{ foo: number }, { baz: number }> {
  // 아래와 같은 일이 발생할 수 없음을 확신할 수 있음
  someMethod() {
    this.props.foo = 123; // 오류: (props는 불변임)
    this.state.baz = 456; // 오류: (this.setState를 사용해야 함)  
  }
}
```

#### 편리한 불변성 지원

인덱스 서명(index signatures)도 readonly로 표기할 수 있습니다:

```ts
/**
 * 선언
 */
interface Foo {
    readonly[x: number]: number;
}

/**
 * 사용
 */
let foo: Foo = { 0: 123, 2: 345 };
console.log(foo[0]);   // 오케이 (읽기)
foo[0] = 456;          // 오류 (변경하기): readonly 임
```

이건 JavaScript 네이티브 배열을 *불변* 스타일로 사용하고자 할 때 아주 편합니다. 사실 TypeScript는 이런 일을 할 수 있도록 `ReadonlyArray<T>` 인터페이스를 이미 제공하고 있습니다:

```ts
let foo: ReadonlyArray<number> = [1, 2, 3];
console.log(foo[0]);   // 오케이
foo.push(4);           // 오류: `push`는 배열을 상태를 바꾸므로 ReadonlyArray에 존재하지 않음
foo = foo.concat([4]); // 오케이: 복사본 생성
```

#### 자동 추론
경우에 따라 컴파일러가 자동으로 특정 항목이 읽기 전용임을 추론해낼 수 있습니다. 즉, 클래스에 속성이 있지만 게터(getter)만 있고 세터(setter)가 없다면 컴파일러는 그 속성을 readonly인 것으로 간주합니다. 예를 들면:

```ts
class Person {
    firstName: string = "John";
    lastName: string = "Doe";
    get fullName() {
        return this.firstName + this.lastName;
    }
}

const person = new Person();
console.log(person.fullName); // John Doe
person.fullName = "Dear Reader"; // 오류! fullName은 readonly
```

### `const`와의 차이점
`const`

1. 변수 참조를 위한 것
1. 변수에 다른 값을 할당/대입할 수 없음.

`readonly`

1. 속성을 위한 것
1. 속성을 앨리어싱을 통해 변경될 수 있음

1을 설명하는 예제:

```ts
const foo = 123; // 변수 참조
var bar: {
    readonly bar: number; // 속성의 경우
}
```

2를 설명하는 예제:

```ts
let foo: {
    readonly bar: number;
} = {
        bar: 123
    };

function iMutateFoo(foo: { bar: number }) {
    foo.bar = 456;
}

iMutateFoo(foo); // foo 인자가 foo 파라미터에 의해 앨리어싱됨
console.log(foo.bar); // 456!
```

기본적으로 `readonly`는 *내가 속성을 변경하지 못함*을 보장하지만, 객체를 다른 사람에게 넘길 경우에는 이것이 보장되지 않고 그 다른 사람은 객체의 속성을 변경할 수 있습니다 (타입 호환성 문제 때문에 허용됨). 물론 `iMutateFoo`를 `foo.bar`를 변경하지 않는 함수로 선언했다면 아래에 보이는 것처럼 컴파일러가 올바르게 잘못을 지적할 수 있습니다:

```ts
interface Foo {
    readonly bar: number;
}
let foo: Foo = {
    bar: 123
};

function iTakeFoo(foo: Foo) {
    foo.bar = 456; // 오류! bar는 readonly
}

iTakeFoo(foo); // // foo 인자가 foo 파라미터에 의해 앨리어싱됨
```

[](https://github.com/Microsoft/TypeScript/pull/6532)
