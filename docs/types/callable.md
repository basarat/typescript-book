## Callable

다음과 같이 인터페이스의 호출이 필요한 경우 타입 지정을 할 수 있습니다.

```ts
interface ReturnString {
  (): string
}
```

이러한 인터페이스의 인스턴스는 예를 들어 문자열을 반환하는 함수입니다.

```ts
declare const foo: ReturnString
const bar = foo() // `bar`는 string으로 추론됩니다.
```

### Obvious examples

물론 이러한 호출 시 타입 지정은 필요에 따라 모든 인수 / 선택적 인수 / 나머지 인수를 지정할 수도 있습니다. 예를 들어 다음은 복잡한 예입니다.

```ts
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number
}
```

인터페이스는 함수 오버 로딩을 지정하기 위해 여러 번 호출하는 경우 타입 지정을 제공할 수 있습니다. 예를 들면:

```ts
interface Overloaded {
  (foo: string): string
  (foo: number): number
}

// example implementation
function stringOrNumber(foo: number): number
function stringOrNumber(foo: string): string
function stringOrNumber(foo: any): any {
  if (typeof foo === "number") {
    return foo * foo
  } else if (typeof foo === "string") {
    return `hello ${foo}`
  }
}

const overloaded: Overloaded = stringOrNumber

// example usage
const str = overloaded("") // `str`의 타입은 `string`으로 추론됩니다.
const num = overloaded(123) // `num`의 타입은 `number`로 추론됩니다.
```

물론, 모든 `interface`의 `body`와 마찬가지로, 호출하는 `interface`의 `body` 변수의 타입 지정을 사용할 수 있습니다. 예를 들면:

```ts
const overloaded: {
  (foo: string): string
  (foo: number): number
} = (foo: any) => foo
```

### Arrow Syntax

호출 가능한 타입을 쉽게 지정할 수 있도록 TypeScript는 화살표 구문에서도 타입 지정 사용이 가능합니다. 예를 들어, 숫자를 사용하고 문자열을 반환하는 함수에 다음과 같이 타입 지정을 할 수 있습니다.

```ts
const simple: (foo: number) => string = (foo) => foo.toString()
```

> 화살표 구문의 제한 사항 : 오버로드를 지정할 수 없습니다. 오버로드의 경우 전체 본문 { (someArgs): someReturn }구문을 사용해야 합니다.

### Newable

`new` 접두사를 사용하여 호출한 특수한 타입에도 타입 지정이 가능합니다. 즉, `new`로 호출해야 합니다. 예를 들면:

```ts
interface CallMeWithNewToGetString {
  new (): string
}
// Usage
declare const Foo: CallMeWithNewToGetString
const bar = new Foo() // `bar`의 타입은 `string`으로 추론됩니다.
```
