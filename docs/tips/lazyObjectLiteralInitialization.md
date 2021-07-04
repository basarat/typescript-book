## 객체 리터럴의 지연(lazy) 초기화

JavaScript 코드 베이스에는 다음과 같은 식으로 객체 리터럴을 초기화하는 경우가 매우 많습니다:

```ts
let foo = {};
foo.bar = 123;
foo.bas = "Hello World";
```

코드를 TypeScript 로 바꾸면 다음과 같은 오류들이 발생하게 됩니다:

```ts
let foo = {};
foo.bar = 123; // Error: Property 'bar' does not exist on type '{}'
foo.bas = "Hello World"; // Error: Property 'bas' does not exist on type '{}'
```

이것은 `let foo = {}` 순간 TypeScript가 `foo` 의 타입을 우변의 내용 `{}` (즉, 속성이 없는 객체)인 것으로 *추론* 하기 때문입니다. 그래서 그 객체에 새 속성을 할당하려 할 때 오류를 발생시킵니다.

### 이상적인 수정

TypeScript에서 객체를 초기화하는 *올바른* 방법은 할당과 함께 초기화하는 것입니다:

```ts
let foo = {
    bar: 123,
    bas: "Hello World",
};
```

이렇게 하면 코드 리뷰와 유지보수 모두 아주 좋습니다.

> 이어서 설명하는 빠른 수정이나 중간 수준의 *지연* 초기화 패턴은 *일부 속성의 초기화를 빼먹는 실수* 가 발생할 위험이 있습니다. 

### 빠른 수정

TypeScript로 옮겨야 할 JavaScript 코드 베이스가 크다면 이상적인 수정으로 작업하기 어려울 수 있습니다. 그런 경우 조심스럽게 *타입 표명* 을 사용하여 컴파일러를 조용히시킬 수 있습니다:

```ts
let foo = {} as any;
foo.bar = 123;
foo.bas = "Hello World";
```

### 중간 수준

물론 `any` 사용은 TypeScript의 안전성을 무효화시키는 것이니 아주 나쁩니다. 중간 수준의 수정은 `interface` 를 하나 만들어서 다음을 보장하는 방법입니다.

* 충분한 설명
* 안전한 할당

아래에 나와 있습니다:

```ts
interface Foo {
    bar: number
    bas: string
}

let foo = {} as Foo;
foo.bar = 123;
foo.bas = "Hello World";
```

여기 인터페이스 사용으로 도움을 받는 상황이 간단하게 나와 있습니다:

```ts
interface Foo {
    bar: number
    bas: string
}

let foo = {} as Foo;
foo.bar = 123;
foo.bas = "Hello World";

// 나중에 코드 베이스 다른 곳에서:
foo.bar = 'Hello Stranger'; // 오류: `bas`를 `bar`라고 잘못 적었을 것임, 문자열을 숫자에 할당할 수 없음
```
