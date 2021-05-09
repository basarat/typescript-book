# 타입 이동하기

TypeScript의 타입 시스템은 놀랍도록 강력하며 다른 어떤 언어에서도 불가능한 수준으로 타입 이동과 타입 분할을 지원합니다.

이것은 TypeScript가 *고도로 동적인* 언어인 JavaScript와 이음새 없이 매끄럽게 같이 사용돌 수 있도록 설계되었기 때문입니다. 이 단원에서는 TypeScript에서 타입을 이동하는 몇가지 트릭을 다룰 것입니다.

핵심 동기는 이것입니다 : 잘 설계된 제약조건 시스템처럼 하나를 바꾸면 다른 모든 것이 저절로 업데이트되고 무언가가 망가졌을 때는 보기좋게 오류가 발생하게 하는 것입니다.

## 타입 + 값 둘 다 복사하기

클래스를 이동하고 싶을 때 아래처럼 하고 싶을 것입니다:

```ts
class Foo { }
var Bar = Foo;
var bar: Bar; // 오류: 'Bar' 이름을 찾을 수 없음
```

이것은 `var`가 `Foo`를 *변수* 선언 공간으로만 복사했기 때문에, `Bar`를 타입 어노테이션으로 사용할 수 없기 때문입니다. 올바른 방법은 `import` 키워드를 사용하는 것입니다. 다만 `import`는 *네임스페이스* 또는 *모듈* (잠시 뒤 다룸)을 사용할 때처럼 사용해야만 한다는 점을 참고하세요:

```ts
namespace importing {
    export class Foo { }
}

import Bar = importing.Foo;
var bar: Bar; // Okay
```

이 `import` 트릭은 *타입이면서 동시에 변수인* 경우에만 사용할 수 있습니다.

## 변수의 타입 캡쳐하기

실은 `typeof` 연산자를 사용하면 변수를 타입 어노테이션 용으로 사용할 수 있습니다. 이것은 컴파일러에게 한 변수가 다른 변수와 동일한 타입임을 알려주는 것입니다. 이것을 보여주는 예제:

```ts
var foo = 123;
var bar: typeof foo; // `bar`는 `foo`와 같은 타입 (여기서는 `number`)
bar = 456; // 오케이
bar = '789'; // 오류: 타입 `string`은 타입 `number`에 할당할 수 없음
```

## 클래스 멤버의 타입 캡쳐하기

널이 아닌 어떤 객체라도 내용을 뒤져서 속성의 타입을 찾아낼 수 있습니다:

```ts
class Foo {
  foo: number; // 우리가 타입을 캡쳐하고 싶은 어떤 멤버
}

let bar: Foo['foo']; // `bar`는 `number` 타입이 됨
```

다른 방법으로, 변수의 타입을 캡쳐할 때처럼, 순전히 타입 캡쳐의 목적으로 변수를 하나 선언해도 됩니다:

```ts
// 순전히 타입 캡쳐를 위한 것
declare let _foo: Foo;

// 전과 동일
let bar: typeof _foo.foo; // `bar`는 `number` 타입이 됨
```

## 매직 문자열의 타입 캡쳐하기

다수의 JavaScript 라이브러리 및 프레임워크들을 JavaScript 문자열을 생으로 사용합니다. `const` 변수를 사용하여 그것들의 타입을 캡쳐할 수 있습니다, 예를 들면:

```ts
// 매직 문자열의 *타입* 그리고 *값* 둘 다 캡쳐:
const foo = "Hello World";

// 캡쳐된 타입 사용:
let bar: typeof foo;

// bar에는 `Hello World`만 할당 가능
bar = "Hello World"; // 오케이!
bar = "anything else "; // 오류!
```

이 예제에서 `bar`는 리터럴 타입 `"Hello World"`가 됩니다. 이에 대해서는 [리터럴 타입 섹션](./literal-types.md)에서 자세히 다룹니다.

## 키 이름 캡쳐하기

`keyof` 연사자는 어떤 타입의 키 이름을 캡쳐할 수 있게 해줍니다. 즉, 먼저 `typeof`을 써서 변수의 타입을 캡쳐한 다음 이걸 써서 변수의 키 이름을 캡쳐할 수 있습니다:

```ts
const colors = {
  red: 'reddish',
  blue: 'bluish'
}
type Colors = keyof typeof colors;

let color: Colors; // 우측과 동일 let color: "red" | "blue"
color = 'red'; // 오케이
color = 'blue'; // 오케이
color = 'anythingElse'; // 오류: 타입 '"anythingElse"'는 타입 '"red" | "blue"'에 할당할 수 없음
```

이걸 이용하면 위 예제에서 볼 수 있듯이 문자열 열거형 + 상수를 아주 쉽게 다룰 수 있습니다.
