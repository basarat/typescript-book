# TypeScript 타입 추론

TypeScript can infer (and then check) the type of a variable based on a few simple rules. Because these rules
are simple you can train your brain to recognize safe / unsafe code (it happened for me and my teammates quite quickly).

TypeScript는 간단한 규칙 몇 가지를 기반으로 변수의 타입을 추론하고 검사할 수 있습니다. 이 규칙들은 꽤나 간단하기 때문에 우리는 우리의 뇌를 안전한 코드와 안전하지 않는 코드를 구별할 수 있도록 훈련시킬 수 있습니다. (이런 현상은 저에게도 일어났고, 제 팀원들에게도 꽤나 빨리 일어났습니다.)

> The types flowing is just how I imagine in my brain the flow of type information.

> 앞으로 이야기할 "타입 흐름"(=types flowing)이라는 것은 타입에 관한 정보의 흐름, 즉, 타입을 추론하는 논리의 흐름을 사고하는 방식을 뜻합니다.

## 변수 정의

Types of a variable are inferred by definition.

변수의 타입은 변수의 정의에서 추론됩니다.

```ts
let foo = 123; // foo는 `number`입니다
let bar = "Hello"; // bar는 `string`입니다
foo = bar; // Error: `string`을 `number`에 할당할 수 없습니다.
```

This is an example of types flowing from right to left.

위 예제는 타입 흐름이 오른쪽에서 왼쪽으로 흐르는 경우 입니다.

## 함수 리턴 타입

The return type is inferred by the return statements e.g. the following function is inferred to return a `number`.

리턴 타입은 함수 반환문에 의해 추론됩니다. 가령, 아래의 함수는 `number`를 리턴하는 것으로 추론됩니다.

```ts
function add(a: number, b: number) {
    return a + b;
}
```

This is an example of types flowing bottom out.

위 예제는 타입 흐름이 아래에서 밖으로 흐르는 경우입니다.

## 할당 (=Assignment)

The type of function parameters / return values can also be inferred by assignment e.g. here we say that `foo` is an `Adder`, that makes `number` the type of `a` and `b`.

함수 매개 변수와 리턴 값의 타입은 할당을 통해서도 추론이 가능합니다. 아래의 코드를 보시면 `foo`가 `Adder` 타입이라고 정의했기 때문에, `a`와 `b`의 타입은 자연스레 `number`가 되는 것입니다.

```ts
type Adder = (a: number, b: number) => number;
let foo: Adder = (a, b) => a + b;
```

This fact can be demonstrated by the below code which raises an error as you would hope:

이는 아래의 코드를 통해서도 확인 가능한데요, 여러분들이 예상하듯 아래 코드는 에러를 발생시킬 것입니다:

```ts
type Adder = (a: number, b: number) => number;
let foo: Adder = (a, b) => {
    a = "hello"; // Error: `string`을 `number`에 할당할 수 없습니다.
    return a + b;
}
```

This is an example of types flowing from left to right.

위 예제는 타입 흐름이 왼쪽에서 오른쪽으로 흐르는 경우였습니다.

The same *assignment* style type inference works if you create a function for a callback argument. After all an `argument -> parameter`is just another form of variable assignment.

이와 같은 *할당 방식*의 타입 추론법은 callback 함수에게도 동일하게 적용됩니다. 즉, 결국 모든 `인수(argument) → 매개 변수(parameter)`로 가는 구조는 또다른 형태의 변수 할당이라는 것을 알 수 있습니다.

```ts
type Adder = (a: number, b: number) => number;
function iTakeAnAdder(adder: Adder) {
    return adder(1, 2);
}
iTakeAnAdder((a, b) => {
    // a = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
    return a + b;
})
```

## 구조화 (=Structuring)

These simple rules also work in the presence of **structuring** (object literal creation). For example in the following case the type of `foo` is inferred to be `{a:number, b:number}`

이 간단한 규칙들은 **구조화**(=객체 리터럴 생성)가 있는 경우에도 동일하게 적용됩니다. 예를 들어 다음 코드의 경우 `foo`의 타입은 `{a: number, b: number}`로 추론됩니다.

```ts
let foo = {
    a: 123,
    b: 456
};
// foo.a = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
```

Similarly for arrays:

배열도 마찬가지 인데요:

```ts
const bar = [1,2,3];
// bar[0] = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
```

And of course any nesting:

그리고 어떠한 형태의 중첩 구조에서도 마찬가지로 동일한 규칙이 적용됩니다:

```ts
let foo = {
    bar: [1, 3, 4]
};
// foo.bar[0] = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
```

## 비구조화 (=Destructuring)

And of course, they also work with destructuring, both objects:

비구조화 할당에도 위 규칙은 동일하게 적용됩니다:

```ts
let foo = {
    a: 123,
    b: 456
};
let {a} = foo;
// a = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
```

and arrays:

배열에도 마찬가지죠:

```ts
const bar = [1, 2];
let [a, b] = bar;
// a = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
```

And if the function parameter can be inferred, so can its destructured properties. For example here we destructure the argument into its `a`/`b` members.

그리고 함수 매개 변수의 타입이 추론 가능하다면, 비구조화 할당된 property의 타입도 추론이 가능하겠죠? 아래의 예시를 보시면, 함수의 인자를 `a`, `b` 멤버로 구조 분해 할당하고 있습니다.

```ts
type Adder = (numbers: { a: number, b: number }) => number;
function iTakeAnAdder(adder: Adder) {
    return adder({ a: 1, b: 2 });
}
iTakeAnAdder(({a, b}) => { // `a`와 `b`의 타입이 추론됩니다.
    // a = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
    return a + b;
})
```

## 타입 가드 (=Type Guards)

We have already seen how [Type Guards](./typeGuard.md) help change and narrow down types (particularly in the case of unions). Type guards are just another form of type inference for a variable in a block.

우리는 앞서 [타입 가드](./typeGuard.md)가 어떤 방식으로 타입을 변경하고 타입의 범주를 좁혀 나가는지를 살펴봤습니다. (특히 `union`의 경우에서 자세히 살펴보았죠.) 타입 가드는 그저 또다른 방식으로 블록 내 변수의 타입을 추론하는 형태일 뿐입니다.

## 경고

### Be careful around parameters 매개 변수를 주의하세요

Types do not flow into the function parameters if it cannot be inferred from an assignment. For example in the following case the compiler does not know the type of `foo` so it cannot infer the type of `a` or `b`.

함수 매개 변수의 타입은 할당으로 타입을 추론할 수 없는 경우, 타입 정보는 전달되지 않을 것입니다(=타입 추론을 할 수 없습니다). 가령 아래의 경우 컴파일러가 `foo`의 타입을 모르기 때문에, `a`와 `b`의 타입 또한 추론할 수 없습니다.

```ts
const foo = (a, b) => { /* do something */ };
```

However, if `foo` was typed the function parameters type can be inferred (`a`,`b` are both inferred to be of type `number` in the example below).

그러나 만약 `foo`의 타입이 정의 되었다면, 함수 매개 변수의 타입 또한 추론이 가능했을 겁니다. (아래 예시를 보시면, `a`와 `b`는 모두 `number`로 추롣되는 것을 확인할 수 있습니다.)

```ts
type TwoNumberFunction = (a: number, b: number) => void;
const foo: TwoNumberFunction = (a, b) => { /* do something */ };
```

### 리턴을 주의하세요

Although TypeScript can generally infer the return type of a function, it might not be what you expect. For example here function `foo` has a return type of `any`.

물론 보통의 경우 TypeScript는 함수의 리턴 타입을 잘 추론하는 편이긴 하지만, 가끔은 여러분이 예상한 값과 다르게 행동할 수 있습니다. 가령 아래의 함수 `foo`는 `any`를 리턴 타입으로 가집니다.

```ts
function foo(a: number, b: number) {
    return a + addOne(b);
}
// Some external function in a library someone wrote in JavaScript
// 누군가 JavaScript로 만든 라이브러리의 외부 함수
function addOne(a) {
    return a + 1;
}
```

This is because the return type is impacted by the poor type definition for `addOne` (`a` is `any` so the return of `addOne` is `any` so the return of `foo` is `any`).

그 이유는 리턴 타입이 느슨하게 타입 정의가 된 `addOne`에 영향 받았기 때문입니다. (`a`가 `any`이기 때문에 `addOne`의 리턴 타입도 `any`가 되고, 이는 `foo`에도 마찬가지로 적용이 됩니다.)

> I find it simplest to always be explicit about function returns. After all, these annotations are a theorem and the function body is the proof.

> 함수 리턴 타입에 대해서는 항상 명백하게 하는 것이 가장 간단한 방법이란 걸 알아냈습니다. 즉 이 모든 주석은 하나의 가설이고 함수문이 증거입니다.

There are other cases that one can imagine, but the good news is that there is a compiler flag that can help catch such bugs.

우리가 상상하자면 더 많은 경우의 수가 있겠지만, 여기서 좋은 소식은 이런 버그를 잡을 수 있게 도와주는 컴파일러 플래그가 있다는 것입니다.


## `noImplicitAny`

The flag `noImplicitAny` instructs the compiler to raise an error if it cannot infer the type of a variable (and therefore can only have it as an *implicit* `any` type). You can then

`noImplicitAny` 플래그는 컴파일러에게 만약 어떤 타입을 추론할 수 없어 *암묵적으로* `any` 타입을 가지는 변수가 있을 경우 에러를 발생시켜라고 지시하는 것입니다. 따라서 이 에러를 핸들하려면:

* either say that *yes I want it to be of type `any`* by *explicitly* adding an `: any` type annotation
* help the compiler out by adding a few more *correct* annotations.

* `: any` 타입 주석을 추가해 *응 나는 `any` 타입이길 원해*라고 명시적으로 선언하거나
* 좀더 *정확한* 주석을 추가해 컴파일러가 타입을 추론할 수 있게 도와줄 수 있습니다.
