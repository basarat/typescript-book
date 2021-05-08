## 콜러블(Callable)
콜러블은 아래와 같이 어떤 타입 또는 인터페이스의 일부가 될 때 형식을 붙일(annotate) 수 있습니다

(역주: 여기서 콜러블은 '()'를 말함)

```ts
interface ReturnString {
  (): string
}
```
이런 인터페이스의 개체는 문자열을 반환하는 함수가 될 것입니다, 예를 들면

```ts
declare const foo: ReturnString;
const bar = foo(); // bar는 문자열 타입인 것으로 추론됨
```

### 명확한 예제
물론 *콜러블*에 대한 어노테이션에는 필요한 만큼 인자 / 선택자(Optional) 인자 / 나머지(Rest) 인자를 덧붙일 수 있습니다. 예를 들면, 이건 복잡한 경우입니다:

```ts
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number;
}
```

인터페이스에 여러 개의 콜러블 어노테이션을 추가하여 함수 오버로딩을 지정할 수 있습니다. 예를 들면:

```ts
interface Overloaded {
    (foo: string): string
    (foo: number): number
}

// 예제 구현
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
    if (typeof foo === 'number') {
        return foo * foo;
    } else if (typeof foo === 'string') {
        return `hello ${foo}`;
    }
}

const overloaded: Overloaded = stringOrNumber;

// 사용 사례
const str = overloaded(''); // `str`의 타입은 `string`으로 추론됨
const num = overloaded(123); // `num`의 타입은 `number`로 추론됨
```

물론 다른 *어떤* 인터페이스의 내용과 마찬가지로, 콜러블 인터페이스의 내용을 변수에 대한 타입 어노테이션으로 사용할 수 있습니다. 예를 들면:

```ts
const overloaded: {
  (foo: string): string
  (foo: number): number
} = (foo: any) => foo;
```

### 화살표 구문
콜러블 서명(signature)을 쉽게 지정할 수 있도록 Typescript는 단순 화살표 타입 어노테이션도 허용합니다. 예를 들어, `number`를 받고 `string`을 반환하는 함수는 다음과 같이 타입을 붙일 수 있습니다:

```ts
const simple: (foo: number) => string
    = (foo) => foo.toString();
```

> 화살표 구문의 한가지 한계: 오버로딩을 지정할 수 없음. 오버로딩을 지정하려면 본문 전체를 정의하는 구문을 `{ (someArgs): someReturn }` 사용해야 함.

### 뉴어블(Newable)

뉴어블은 특별한 종류의 *콜러블* 타입 어노테이션으로, 앞에 `new`가 붙습니다. 이건 단순히 `new`를 통해 *실행*시켜야 함을 가리킵니다, 예를 들면:

```ts
interface CallMeWithNewToGetString {
  new(): string
}
// 사용법
declare const Foo: CallMeWithNewToGetString;
const bar = new Foo(); // bar는 string 타입의 변수로 추론됨
```
