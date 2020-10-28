## Type Assertion

> ✍️ **Type assertion (타입 주장/단언):** 정확한 의미 전달을 위해 "type assertion"은 한글로 번역하지 않았습니다.

우리는 TypeScript가 타입 추론으로 파악한 타입을 원하는 형태의 타입으로 얼마든지 덮어 씌울 수 있습니다. 이를 "type assertion"이라고 합니다. type assertion은 컴파일러에게 "해당 타입은 작성자가 더 정확하게 파악하고 있으니 이에 대해 의문을 품지 말라"고 알리는 것과 같습니다.

type assertion은 JavaScript 코드를 TypeScript 코드로 옮기는 때 사용되는 것이 일반적입니다. 예를 들어 아래의 패턴을 한번 생각해봅시다:

```ts
var foo = {};
foo.bar = 123; // Error: 'bar'는 {}에 존재하지 않습니다.
foo.bas = 'hello'; // Error: 'bas'는 {}에 존재하지 않습니다.
```

위 코드는 에러를 발생시키는데 그 이유는 `foo`가 `{}`, 즉 property가 하나도 없는 빈 객체로 타입 추론이 되었기 때문입니다. 그러므로 `bar`나 `bas`같은 property를 `foo`에 추가할 수 없는 것이죠. 이러한 문제를 우리는 `as Foo`라는 type assertion을 사용해서 해결할 수 있습니다:

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

처음 type assertion으로 추가된 syntax는 아래 코드에 나와있듯 `<foo>`와 같이 꺽쇠를 사용하는 방식였습니다:

```ts
var foo: any;
var bar = <string> foo; // 이제 bar의 타입은 "문자열"입니다
```

그러나 꺽쇠를 사용한(`<foo>`) 스타일의 syntax는 JSX에서 문법적으로 모호한 부분이 있다는 문제가 있었습니다:

```ts
var foo = <string>bar;
</string>
```

그래서 현재는 일관성을 위해 `as foo`와 같은 형식으로 type assertion을 하는 것이 권장됩니다.

### Type Assertion vs. Casting

type assertion을 "type casting(타입 캐스팅)"이라고 부르지 않는 이유는 *캐스팅*이란 단어는 일반적으로 런타임을 지원한다는 의미를 내포하기 때문입니다. 그러나 *type assertion*은 순수하게 컴파일 타임에만 구성되는 요소이자 코드가 어떠한 방식으로 타입 검증이 되어야 하는지를 개발자가 직접 컴파일러에게 힌트를 제공하는 방법일 뿐입니다.

### type assertion은 위험합니다

많은 경우에 type assertion은 레거시 코드를 쉽게 TypeScript 코드로 옮길 수 있도록 돕습니다. (심지어 코드의 일부를 단순 복붙 하는 것도 가능하게 합니다.) 하지만 type assertion을 사용할 때는 항상 주의하셔야 합니다. 아래 예시가 보여주듯, 설령 우리가 TypeScript에게 *약속한 property*를 깜빡 잊고 제공하지 않는다 하더라도, 컴파일러는 그런 상황에서부터 당신을 보호할 수 없습니다(=에러를 발생시키지 않습니다):

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
// 오호랑이.... 뭐 잊은 거 없니?
```

그리고 type assertion을 순전히 *자동 완성*을 위한 수단으로만 여기는 일반적인 통념도 있습니다. 가령:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = <Foo>{
    // 컴파일러는 Foo의 property를 자동완성으로 지원할 것입니다.
    // 하지만 개발자들은 필요한 property 중 일부를 빼먹기 일수죠.
    // 또한 이러한 방식은 Foo를 리팩토링(ex. 새 property 추가)할 때 쉽게 망가질 수 있는 위험이 있습니다.
};
```

but the hazard here is the same, if you forget a property the compiler will not complain. It is better if you do the following:

하지만 작성자가 특정 property를 잊었다 하더라도 컴파일러가 이에 불평하지 않을 것이기에 위험은 마찬가지입니다. 따라서 다음의 방식으로 type assertion을 하는 것이 더 좋습니다:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo: Foo = {
    // 컴파일러는 여전히 Foo의 property에 대한 자동 완성을 지원할 것입니다
};
```

특정 상황에서는 임시로 변수를 선언 하되, 타입 약속(=타입 정의)은 따로 하지 않고 (물론 이 경우 틀릴 수도 있겠죠) TypeScript의 타입 추론에만 의존해 타입을 확인해야 하는 경우도 있습니다.

### Double assertion

앞서 살펴봤듯 type assertion은 분명 위험 요소가 따릅니다. 그러나 그렇다고 완전히 *배제시킬 만한 것은 아닙니다.* 가령, 아래 코드는 매우 유효한 type assertion 사용 사례(ex. 작성자가 함수에 전달된 event는 단순히 event라고 하는 것보다 좀 더 구체적으로 정의될 수 있다고 여긴 경우)이고 type assertion 또한 우리가 예상한 대로 잘 작동할 것입니다:

```ts
function handler (event: Event) {
    let mouseEvent = event as MouseEvent;
}
```

그러나 아래의 경우에는 사용자가 type assertion을 사용했음에도 불구하고 TypeScript는 에러를 띄울 것입니다:

```ts
function handler(event: Event) {
    let element = event as HTMLElement; // Error: 'Event' 타입과 'HTMLElement' 타입은 서로 할당될 수 없습니다.
}
```

그럼에도 불구하고 *해당 타입을 반드시 사용하고 싶은 경우*, double assertion(이중 타입 주장)을 사용하시면 됩니다. 하지만 그전에 모든 타입에 호환 가능한 `any`로 type assertion을 먼저 진행해야만 컴파일러가 에러를 더 이상 발생시키지 않을 것입니다:

```ts
function handler(event: Event) {
    let element = event as any as HTMLElement; // ㅇㅋ!
}
```

#### TypeScript가 single type assertion으로는 충분하지 않음을 판단하는 방법

기본적으로 `S`에서 `T`로의 type assertion은 1) `S`가 `T`의 하위 타입이거나 2) `T`가 `S`의 하위 타입인 경우에 가능합니다. 그래야만 type assertion을 하더라도 좀 더 안전하게 사용할 수 있기 때문입니다… 완전히 와일드한 type assertion을 사용하는 건 매우 위험한 일이고, 불안전한 type assertion을 하려면 `any`를 사용하시면 됩니다.
