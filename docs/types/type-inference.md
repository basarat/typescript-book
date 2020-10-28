* [변수 정의](#변수-정의)
* [함수 리턴 타입](#함수-리턴-타입)
* [할당 (=Assignment)](#할당-assignment)
* [구조화 (=Structuring)](#구조화-structuring)
* [비구조화 (=Destructuring)](#비구조화-destructuring)
* [타입 가드 (=Type Guards)](#타입-가드-type-guards)
* [주의사항](#주의사항)
* [`noImplicitAny`](#noimplicitany)


# TypeScript 타입 추론

TypeScript는 간단한 규칙 몇 가지를 기반으로 변수의 타입을 추론하고 검사할 수 있습니다. 이 규칙들은 꽤 간단하기 때문에 여러분들의 뇌를 안전한 코드와 그렇지 않은 코드를 구별할 수 있게 훈련시킬 수 있을 것입니다. (이런 현상은 저에게도 일어났고, 제 팀원들에게도 꽤나 빨리 일어났습니다.)

> 앞으로 이야기할 "타입 흐름"(=types flowing)이라는 것은 타입에 관한 정보의 흐름 즉, 타입을 추론하는 논리적 사고 흐름을 뜻합니다.

## 변수 정의

변수의 타입은 변수의 정의로부터 추론됩니다.

```ts
let foo = 123; // foo는 `number`입니다
let bar = "Hello"; // bar는 `string`입니다
foo = bar; // Error: `string`을 `number`에 할당할 수 없습니다.
```

위 예제는 타입 흐름이 오른쪽에서 왼쪽으로 흐르는 경우입니다.

## 함수 리턴 타입

리턴 타입은 함수 반환문에 의해 추론됩니다. 가령 아래의 함수는 `number`를 리턴하는 것으로 추론됩니다.

```ts
function add(a: number, b: number) {
    return a + b;
}
```

위 예제는 타입 흐름이 아래에서 밖으로 흐르는 경우입니다.

## 할당 (=Assignment)

함수 매개 변수와 리턴 값의 타입은 할당을 통해서도 추론이 가능합니다. 아래의 코드를 보시면 `foo`를 `Adder` 타입이라고 정의했기 때문에 `a`와 `b`의 타입은 자연스레 `number`가 되는 것이죠.

```ts
type Adder = (a: number, b: number) => number;
let foo: Adder = (a, b) => a + b;
```

이는 아래의 코드를 통해서도 확인 가능한데요, 다들 예상하셨듯이 아래 코드는 에러를 발생시킬 것입니다:

```ts
type Adder = (a: number, b: number) => number;
let foo: Adder = (a, b) => {
    a = "hello"; // Error: `string`을 `number`에 할당할 수 없습니다.
    return a + b;
}
```

위 예제는 타입 흐름이 왼쪽에서 오른쪽으로 흐르는 경우였습니다.

이와 같은 *할당 방식*의 타입 추론법은 callback 함수에게도 동일하게 적용됩니다. 즉, 결국 모든 `인수(argument) → 매개 변수(parameter)`로 가는 구조는 또 다른 형태의 변수 할당일 뿐입니다.

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

이 간단한 규칙들은 **구조화**(=객체 리터럴 생성)의 경우에도 동일하게 적용됩니다. 예를 들어 다음 코드의 경우 `foo`의 타입은 `{a: number, b: number}`로 추론됩니다.

```ts
let foo = {
    a: 123,
    b: 456
};
// foo.a = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
```

배열도 마찬가지인데요:

```ts
const bar = [1,2,3];
// bar[0] = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
```

그리고 어떠한 형태의 중첩 구조에서도 동일한 규칙이 적용됩니다:

```ts
let foo = {
    bar: [1, 3, 4]
};
// foo.bar[0] = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
```

## 비구조화 (=Destructuring)

비구조화 할당에도 앞서 살펴본 규칙은 동일하게 적용됩니다. 객체와:

```ts
let foo = {
    a: 123,
    b: 456
};
let {a} = foo;
// a = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
```

배열 모두에게 말이죠:

```ts
const bar = [1, 2];
let [a, b] = bar;
// a = "hello"; // ERROR: `string`을 `number`에 할당할 수 없습니다.
```

그리고 함수 매개 변수의 타입이 추론 가능하다면, 비구조화 할당된 property의 타입도 당연히 추론이 가능하겠죠? 아래의 예시는 함수의 인자를 `a`, `b` 멤버로 비구조화 할당하고 있습니다.

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

우리는 앞서 [타입 가드](./typeGuard.md)가 어떤 방식으로 타입을 변경하고 타입의 범주를 좁혀 나가는지를 살펴봤습니다. (특히 `union`의 경우에서 자세히 살펴보았죠.) 사실 타입 가드는 그저 또 다른 방식으로 블록 내 변수의 타입을 추론하는 형태일 뿐입니다.

## 주의사항

### 매개 변수를 주의하세요

함수 매개 변수의 타입은 할당으로 타입을 추론할 수 없는 경우에는 타입 정보가 전달되지 않을 것입니다(=타입 추론을 할 수 없습니다). 가령 아래의 경우 컴파일러가 `foo`의 타입을 모르기 때문에, `a`와 `b`의 타입 또한 추론할 수 없습니다.

```ts
const foo = (a, b) => { /* do something */ };
```

그러나 만약 `foo`의 타입이 정의되었다면, 함수 매개 변수의 타입 또한 추론이 가능했을 겁니다. (아래 예시를 보면 `a`와 `b`가 모두 `number`로 추론되는 것을 확인할 수 있습니다.)

```ts
type TwoNumberFunction = (a: number, b: number) => void;
const foo: TwoNumberFunction = (a, b) => { /* do something */ };
```

### 리턴을 주의하세요

일반적으로 TypeScript는 함수의 리턴 타입을 추론하는 편이긴 하지만 종종 여러분이 예상한 것과 다른 결과가 나올 수도 있습니다. 가령 아래의 함수 `foo`는 `any`를 리턴 타입으로 가지게 될 것입니다.

```ts
function foo(a: number, b: number) {
    return a + addOne(b);
}
// JavaScript로 만든 라이브러리의 외부 함수 addOne
function addOne(a) {
    return a + 1;
}
```

이와 같은 현상은 리턴 타입이 느슨하게 정의가 된 `addOne` 때문에 발생하는데요, `a`가 `any`이기 때문에 `addOne`의 리턴 타입도 `any`가 되고, 이는 `foo`에도 동일하게 적용되기 때문입니다.

> 저는 함수의 리턴 타입은 항상 명시적으로 선언하는 것이 가장 심플한 방법이라는 결론을 내렸습니다. 어쨌든 결국 타입 주석은 가설이고, 함수문이 증명일 테니까요.

이 외에도 더 많은 경우의 수를 생각해볼 수 있겠지만 여기서 한 가지 좋은 소식을 먼저 알려드리자면, 이러한 종류의 버그를 쉽게 잡을 수 있도록 도와주는 컴파일러 플래그가 이미 존재한다는 것입니다.

## `noImplicitAny`

`noImplicitAny`는 컴파일 도중 타입 추론이 불가능해 *암묵적으로* `any` 타입을 가지는 변수를 발견 시 에러를 발생시키도록 지시하는 플래그입니다. 이 에러를 핸들 하려면:

* `: any` 타입 주석을 추가해 *응~ 그래 나는 이 친구가 `any` 타입이길 원해~*라고 명시적으로 선언하거나
* 컴파일러가 타입을 잘 추론할 수 있게 좀 더 *정확한* 주석을 추가하는 방법이 있습니다.
