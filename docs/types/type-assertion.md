## 타입 표명(Type Assertion)

TypeScript에서는 시스템이 추론 및 분석한 타입 내용을 우리가 원하는 대로 얼마든지 바꿀 수 있습니다. 이때 "타입 표명(type assertion)"이라 불리는 메커니즘이 사용됩니다. TypeScript의 타입 표명은 프로그래머가 컴파일러에게 내가 너보다 타입에 더 잘 알고 있고, 나의 주장에 대해 의심하지 말라고 하는 것과 같습니다.

타입 표명은 JavaScript 코드를 TypeScript으로 포팅할 때 많이 쓰입니다. 예를 들어 다음과 형태를 보세요:

```ts
var foo = {};
foo.bar = 123; // 오류: 속성 'bar'가 `{}`에 존재하지 않음
foo.bas = 'hello'; // 오류: 속성 'bar'가 `{}`에 존재하지 않음
```

위 코드는 에러를 발생시키는데 그 이유는 `foo`가 `{}`, 즉 속성이 하나도 없는 빈 객체로 타입 추론이 되었기 때문입니다. 그러므로 `bar`나 `bas`같은 속성을 `foo`에 추가할 수 없는 것입니다. 이런 문제는 `as Foo`라는 타입 표명을 사용해서 간단히 해결할 수 있습니다:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

### `as foo` vs. `<foo>`

원래 타입 표명으로 추가되었던 구문은 `<foo>`와 같은 꺽쇠였습니다. 아래에 나와 있듯이:

```ts
var foo: any;
var bar = <string> foo; // 이제 bar의 타입은 "문자열"입니다
```

그러나 꺽쇠 스타일(`<foo>`)의 구문을 사용하면 JSX에서 문법적으로 모호한 경우가 발생했습니다:

```ts
var foo = <string>bar;
</string>
```

그래서 현재는 일관성을 위해 `as foo`와 같은 형식으로 타입 표명을 사용하는 것이 권장됩니다.

### 타입 표명 vs. 캐스팅(Casting)

타입 표명을 "타입 캐스팅(type casting)"이라 부르지 않는 이유는 일반적으로 *캐스팅*이란 말은 실행 시간에 어떤 동작이 일어날 것임을 내포하기 때문입니다. 하지만 "타입 표명(type assertions)"은 순수하게 컴파일 시간 구성물이고 당신의 코드가 어떤 식으로 분석되길 원하는지 컴파일러에게 힌트를 제공하는 수단입니다.

### 타입 표명은 해롭댜고 간주됨

많은 경우 타입 표명을 사용하면 레거시 코드를 마이그레이션할 때 (심지어 다른 코드 샘플을 복사해서 내 코드베이스로 붙여넣을 때) 쉽게 넘어갈 수 있습니다. 그렇지만 타입 표명은 조심해서 사용해야 합니다. 우리의 원래 코드를 예로 삼아서, 컴파일러는 당신이 깜빡해서 "약속한 속성을 추가하지 않은 경우"에도 당신을 보호해주지 않습니다:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
// 아.. 뭐 잊은 거 없나요?
```

그리고 타입 표명을 *자동 완성*을 얻는 수단으로만 여기는 통념도 있습니다. 예를 들면:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = <Foo>{
    // 컴파일러는 Foo의 속성에 대해 자동완성으로 지원할 것입니다.
    // 하지만 이렇게 하면 개발자가 속성을 추가하는 일을 깜빡하기도 쉽습니다.
    // 또, Foo가 리팩토링(예: 새 속성 추가)되면 바로 망가질 것습니다.
};
```

이 경우에도 위험은 동일하며, 속성을 추가하는 것을 깜빡해도 컴파일러가 불평하지 않습니다. 아래와 같이 하는 것이 좋습니다.:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo: Foo = {
    // 컴파일러는 여전히 Foo의 property에 대한 자동 완성을 지원할 것입니다
};
```

이렇게 하다 보면 임시 변수를 추가해야 경우도 생기겠지만, 당신이 (아마도 지키지 못할) 약속을 남발하는 일은 없을 것이고 자동으로 타입을 확인해주는 타입 추론 시스템을 활용할 수 있게 될 것입니다.

### 이중 표명(Double assertion)

앞서 살펴봤듯이 타입 표명에는 다소 위험성이 있지만 *완전히 해로운" 것만은 아닙니다. 예를 들어, 다음은 아주 정당한 사용 사례이며 (즉, 사용자가 전달된 이벤트에 대해 좀더 명확한 정보를 알고 있음) 타입 표명 구문이 의도한대로 동작합니다.

```ts
function handler (event: Event) {
    let mouseEvent = event as MouseEvent;
}
```

하지만, 아래는 오류일 가능성이 높으며 사용자가 타입 표명을 하더라도 TypeScript는 아래 보이는 것처럼 불평할 것입니다:

```ts
function handler(event: Event) {
    let element = event as HTMLElement; /// Error: Neither 'Event' nor type 'HTMLElement' is assignable to the other
}
```

그럼에도 불구하고 *해당 타입을 반드시 사용하고 싶은 경우*, double assertion(이중 타입 주장)을 사용하시면 됩니다. 하지만 그전에 모든 타입에 호환 가능한 `unknown` (또는 `any`)로 type assertion을 먼저 진행해야만 컴파일러가 에러를 더 이상 발생시키지 않을 것입니다:

```ts
function handler(event: Event) {
    let element = event as unknown as HTMLElement; // ㅇㅋ!
}
```

#### TypeScript가 single type assertion으로는 충분하지 않음을 판단하는 방법

기본적으로 `S`에서 `T`로의 type assertion은 1) `S`가 `T`의 하위 타입이거나 2) `T`가 `S`의 하위 타입인 경우에 가능합니다. 그래야만 type assertion을 하더라도 좀 더 안전하게 사용할 수 있기 때문입니다… 완전히 와일드한 type assertion을 사용하는 건 매우 위험한 일이고, 불안전한 type assertion을 하려면 `unknown`(또는 `any`)을 사용하면 됩니다.
