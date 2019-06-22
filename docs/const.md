### const

`const`는 ES6와 타입스크립트에서 제공하는 매우 환영받는 추가 기능입니다. 그것은 불변성을 가지는 변수이며 불변성을 가지고 있습니다. 이것은 문서뿐만 아니라 런타임 관점에서도 매우 유용합니다. `var`를 `const`로 교체할 수 있습니다.

```ts
const foo = 123
```

> 구문은 사용자가 `let constant foo`을 입력하도록 강요하는 다른 언어보다 훨씬 뛰어납니다.

`const` 는 가독성과 유지보수성을 위한 좋은 선택이며 const 자체를 변수명으로 사용하는 것을 피해야 합니다.

```ts
// Low readability
if (x > 10) {
}

// Better!
const maxRows = 10
if (x > maxRows) {
}
```

#### const declarations must be initialized

아래의 코드는 컴파일러에서 에러를 발생시킵니다.

```ts
const foo // ERROR: const declarations must be initialized
```

#### Left hand side of assignment cannot be a constant

`const` 는 생성시점 이후에 불변입니다. 만약 당신이 새로운 값을 할당하려한다면 컴파일러가 에러를 발생시킵니다.

```ts
const foo = 123
foo = 456 // ERROR: Left-hand side of an assignment expression cannot be a constant
```

#### Block Scoped

`const` 는 블록스코프이며 그와 비슷한 [`let`](./let.md)도 있습니다.

```ts
const foo = 123
if (true) {
    const foo = 456 // Allowed as its a new variable limited to this `if` block
}
```

#### Deep immutability

`const`는 _reference_ 변수를 보호하는 객체 리터럴에서도 잘 작동합니다.

```ts
const foo = { bar: 123 }
foo = { bar: 456 } // ERROR : Left hand side of an assignment expression cannot be a constant
```

객체의 속성은 언제든지 변경이 가능합니다.

```ts
const foo = { bar: 123 }
foo.bar = 456 // Allowed!
console.log(foo) // { bar: 456 }
```

#### Prefer const

변수를 생성 이후에 변경하는게 아니라면 항상 `const` 를 사용하고 그 외에는 `let`을 사용하십시요.
