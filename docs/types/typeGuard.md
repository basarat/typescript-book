* [Type Guard](#type-guard)
* [`typeof`](#typeof)
* [`instanceof`](#instanceof)
* [`in`](#in)
* [리터럴 Type Guard](#리터럴-type-guard)
* [`null`과 `undefined` (`strictNullChecks`)](#null과-undefined-strictnullchecks)
* [사용자 정의 Type Guards](#사용자-정의-type-guards)
* [Type Guard와 Callback](#type-guard와-callback)

> ✍️ **Type guard (타입 보호):** 정확한 의미 전달을 위해 "type guard"는 한글로 번역하지 않았습니다.

## Type Guard

Type guard를 사용하면 조건문에서 객체의 타입을 좁혀나갈 수 있습니다.

### `typeof`

TypeScript는 JavaScript의 `instanceof`, `typeof` 연산자를 이해할 수 있습니다. 즉 조건문에 `typeof`와 `instanceof`를 사용하면, TypeScript는 해당 조건문 블록 내에서는 해당 변수의 타입이 다르다는 것(=좁혀진 범위의 타입)을 이해한다는 것이죠. 아래 예시를 보시면 TypeScript는 특정 메소드(`String.prototype.substr`)가 `string`에 존재하지 않는다는 사실을 인식해 사용자 오타가 있을 수 있음을 지적하고 있습니다.

```ts
function doSomething(x: number | string) {
  if (typeof x === 'string') { // TypeScript는 이 조건문 블록 안에 있는 `x`는 백퍼 `string`이란 걸 알고 있습니다.
  console.log(x.subtr(1)); // Error: `subtr`은 `string`에 존재하지 않는 메소드입니다.
  console.log(x.substr(1)); // ㅇㅋ
  }
  x.substr(1); // Error: `x`가 `string`이라는 보장이 없죠.
}
```

### `instanceof`

아래는 Class와 `instanceof`에 관한 예제입니다:

```ts
class Foo {
  foo = 123;
  common = '123';
}

class Bar {
  bar = 123;
  common = '123';
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo); // ㅇㅋ
    console.log(arg.bar); // Error!
  }
  if (arg instanceof Bar) {
    console.log(arg.foo); // Error!
    console.log(arg.bar); // ㅇㅋ
  }

  console.log(arg.common); // ㅇㅋ
  console.log(arg.foo); // Error!
  console.log(arg.bar); // Error!
}

doStuff(new Foo());
doStuff(new Bar());
```

TypeScript는 `else` 또한 이해하기 때문에 우리가 `if`문으로 타입을 하나 좁혀내면, `else`문 안의 변수 타입은 *절대 동일한 타입이 될 수는 없음*을 인지합니다. 아래 예시를 살펴보겠습니다:

```ts
class Foo {
  foo = 123;
}

class Bar {
  bar = 123;
}

function doStuff(arg: Foo | Bar) {
  if (arg instanceof Foo) {
    console.log(arg.foo); // ㅇㅋ
    console.log(arg.bar); // Error!
  }
  else {  // 백퍼 Bar겠군.
    console.log(arg.foo); // Error!
    console.log(arg.bar); // ㅇㅋ
  }
}

doStuff(new Foo());
doStuff(new Bar());
```

### `in`

`in`은 객체 내부에 특정 property가 존재하는지를 확인하는 연산자로 type guard로 활용할 수 있습니다. 가령:

```ts
interface A {
  x: number;
}
interface B {
  y: string;
}

function doStuff(q: A | B) {
  if ('x' in q) {
  // q: A
  }
  else {
  // q: B
  }
}
```

### 리터럴 Type Guard

리터럴 값의 경우 `===` / `==` / `!==` / `!=` 연산자를 사용해 타입을 구분할 수 있습니다.


```ts
type TriState = 'yes' | 'no' | 'unknown';

function logOutState(state:TriState) {
  if (state == 'yes') {
  console.log('사용자가 yes를 골랐습니다');
  } else if (state == 'no') {
  console.log('사용자가 no를 골랐습니다');
  } else {
  console.log('사용자가 아직 결정을 내리지 않았습니다.');
  }
}
```

이는 `union` 타입에 리터럴 타입이 있는 경우에도 동일하게 적용됩니다. `union` 타입의 공통 property 값을 비교해 `union` 타입을 구분할 수 있습니다. 가령:

```ts
type Foo = {
  kind: 'foo', // 리터럴 타입
  foo: number
}
type Bar = {
  kind: 'bar', // 리터럴 타입
  bar: number
}

function doStuff(arg: Foo | Bar) {
  if (arg.kind === 'foo') {
  console.log(arg.foo); // ㅇㅋ
  console.log(arg.bar); // Error!
  }
  else {  // 백퍼 Bar겠군.
  console.log(arg.foo); // Error!
  console.log(arg.bar); // ㅇㅋ
  }
}
```

### `null`과 `undefined` (`strictNullChecks`)

TypeScript는 `a == null` / `!= null`로 `null`과 `undefined` 모두 걸러낼 만큼 똑똑한 친구입니다. 가령:

```ts
function foo(a?: number | null) {
  if (a == null) return;
  // 이제부터 a는 무조건 number입니다.
}
```

### 사용자 정의 Type Guards

JavaScript 언어는 풍부한 런타임 내부 검사(=runtime introspection support)를 지원하진 않습니다. 일반 JavaScript 객체(구조적 타입 _structural typings_ 활용)를 사용할 때에는 `instanceof`나 `typeof`와 같은 연산자를 액세스 조차 할 수 없습니다. 하지만 TypeScript에서는 *사용자 정의 Type Guard 함수*를 만들어 이를 해결할 수 있습니다. *사용자 정의 Type Guard 함수*란 단순히 `어떤 인자명은 어떠한 타입이다`라는 값을 리턴하는 함수일 뿐입니다. 아래에 예시를 보겠습니다:

```ts
/**
 * 일반적인 인터페이스 예
 */
interface Foo {
  foo: number;
  common: string;
}

interface Bar {
  bar: number;
  common: string;
}

/**
 * 사용자 정의 Type Guard!
 */
function isFoo(arg: any): arg is Foo {
  return arg.foo !== undefined;
}

/**
 * 사용자 정의 Type Guard 사용 예시
 */
function doStuff(arg: Foo | Bar) {
  if (isFoo(arg)) {
    console.log(arg.foo); // ㅇㅋ
    console.log(arg.bar); // Error!
  }
  else {
    console.log(arg.foo); // Error!
    console.log(arg.bar); // ㅇㅋ
  }
}

doStuff({ foo: 123, common: '123' });
doStuff({ bar: 123, common: '123' });
```

### Type Guard와 Callback

TypeScript는 콜백 함수 내에서 type guard가 계속 유효하다고 여기지 않습니다. 이는 매우 위험하기 때문입니다. 가령:

```js
// Example Setup
declare var foo:{bar?: {baz: string}};
function immediate(callback: () => void) {
  callback();
}

// Type Guard
if (foo.bar) {
  console.log(foo.bar.baz); // ㅇㅋ
  functionDoingSomeStuff(() => {
    console.log(foo.bar.baz); // TS error: 해당 객체는 'undefined'일 가능성이 있습니다.
  });
}
```

해결법은 아주 간단합니다. 로컬 변수를 선언하고 그 안에 값을 담아 타입 추론이 가능하도록 만드는 것이죠. 이는 해당 변수의 타입이 외부 요인으로 인해 바뀔 가능성이 없다는 걸 자동으로 보장하고, TypeScript 또한 이를 쉽게 이해할 수 있습니다:

```js
// Type Guard
if (foo.bar) {
  console.log(foo.bar.baz); // ㅇㅋ
  const bar = foo.bar;
  functionDoingSomeStuff(() => {
  console.log(bar.baz); // ㅇㅋ
  });
}
```
