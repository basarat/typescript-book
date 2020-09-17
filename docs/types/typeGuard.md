* [Type Guard](#type-guard)
* [`typeof`](#typeof)
* [`instanceof`](#instanceof)
* [`in`](#in)
* [리터럴 Type Guard](#리터럴-type-guard)
* [사용자 정의 Type Guards](#사용자-정의-type-guards)
* [User Defined Type Guards](#user-defined-type-guards)

> ✍️ **Type guard (타입 보호):** 정확한 의미 전달을 위해 "type guard"는 한글로 번역하지 않았습니다.

## Type Guard

Type Guards allow you to narrow down the type of an object within a conditional block.

Type guard는 조건문에서 객체의 타입의 범주를 좁혀나갈 수 있게 합니다.

### `typeof`

TypeScript is aware of the usage of the JavaScript `instanceof` and `typeof` operators. If you use these in a conditional block, TypeScript will understand the type of the variable to be different within that conditional block. Here is a quick example where TypeScript realizes that a particular function does not exist on `string` and points out what was probably a user typo:

TypeScript는 JavaScript의 `instanceof`나 `typeof` 연산자의 사용을 인지하고 있습니다. 만약 이것들을 조건문에 사용하면, TypeScript는 해당 조건문에 들어있는 변수의 타입은 조금 다르다는 것을 인지합니다. 아래에 좋은 예시가 있는데요, TypeScript는 `string`의 특정 메소드가 존재하지 않는다는 것을 알려줘 유저가 오타를 냈을 수도 있음을 알려줍니다.

```ts
function doSomething(x: number | string) {
    if (typeof x === 'string') { // Within the block TypeScript knows that `x` must be a string
    // 이 블록(조건문) 안에서는 TypeScript는 `x`는 백퍼 `string`이란 것을 알고 있습니다.
        console.log(x.subtr(1)); // Error, 'subtr' does not exist on `string`
        // Error: `subtr`은 `string`에 존재하지 않는 메소드입니다.
        console.log(x.substr(1)); // ㅇㅋ
    }
    x.substr(1); // Error: There is no guarantee that `x` is a `string`
    // Error: `x`가 `string`이라는 보장이 없죠.
}
```

### `instanceof`

Here is an example with a class and `instanceof`:

아래에 Class와 `instanceof`에 관한 예제가 있습니다:

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

TypeScript even understands `else` so when an `if` narrows out one type it knows that within the else *it's definitely not that type*. Here is an example:

TypeScript는 `else`도 이해하기 때문에 `if`가 하나의 타입을 좁혀낸다면, `else`문 안의 변수는 *절대로 해당 타입은 아니라는 것*을 압니다. 아래에 예시가 있습니다:

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
    else {  // 100% Bar겠군.
        console.log(arg.foo); // Error!
        console.log(arg.bar); // ㅇㅋ
    }
}

doStuff(new Foo());
doStuff(new Bar());
```

### `in`

The `in` operator does a safe check for the existance of a property on an object and can be used as a type guard. E.g.

`in` 연산자로 어떤 객체에 property가 있는지 확인하기 때문에 type guard 용으로 사용될 수 있습니다. 예를 들어:

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

You can use `===` / `==` / `!==` / `!=` to distinguish between literal values.

리터럴 값은 `===` / `==` / `!==` / `!=` 연산자를 사용해 타입을 구분할 수 있습니다.


```ts
type TriState = 'yes' | 'no' | 'unknown';

function logOutState(state:TriState) {
  if (state == 'yes') {
    console.log('사용자가 yes를 골랐습니다');
  } else if (state == 'no') {
    console.log('사용자가 no를 골랐습니다');
  } else {
    console.log('사용자는 아직 결정을 내리지 않았습니다.');
  }
}
```

This even works when you have literal types in a union. You can check the value of a shared property name to discriminate the union e.g.

이는 유니언에 리터럴 타입이 있을 경우에도 동일하게 적용됩니다.

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

### `null` and `undefined` with `strictNullChecks`

TypeScript is smart enough to rule out both `null` and `undefined` with `a == null` / `!= null` check. For example:

```ts
function foo(a?: number | null) {
  if (a == null) return;
  // a is number now.
}

```

### 사용자 정의 Type Guards

JavaScript doesn't have very rich runtime introspection support built in. When you are using just plain JavaScript Objects (using structural typing to your advantage), you do not even have access to `instanceof` or `typeof`. For these cases you can create *User Defined Type Guard functions*. These are just functions that return `someArgumentName is SomeType`. Here is an example:

```ts
/**
 * Just some interfaces
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
 * User Defined Type Guard!
 */
function isFoo(arg: any): arg is Foo {
    return arg.foo !== undefined;
}

/**
 * Sample usage of the User Defined Type Guard
 */
function doStuff(arg: Foo | Bar) {
    if (isFoo(arg)) {
        console.log(arg.foo); // OK
        console.log(arg.bar); // Error!
    }
    else {
        console.log(arg.foo); // Error!
        console.log(arg.bar); // OK
    }
}

doStuff({ foo: 123, common: '123' });
doStuff({ bar: 123, common: '123' });
```

### Type Guards and callbacks

TypeScript doesn't assume type guards remain active in callbacks as making this assumption is dangerous. e.g.

```js
// Example Setup
declare var foo:{bar?: {baz: string}};
function immediate(callback: ()=>void) {
  callback();
}


// Type Guard
if (foo.bar) {
  console.log(foo.bar.baz); // Okay
  functionDoingSomeStuff(() => {
    console.log(foo.bar.baz); // TS error: Object is possibly 'undefined'"
  });
}
```

The fix is as easy as storing the inferred safe value in a local variable, automatically ensuring it doesn't get changed externally, and TypeScript can easily understand that:

```js
// Type Guard
if (foo.bar) {
  console.log(foo.bar.baz); // Okay
  const bar = foo.bar;
  functionDoingSomeStuff(() => {
    console.log(bar.baz); // Okay
  });
}
```
