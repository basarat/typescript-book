* [Freshness](#freshness)
* [추가적인 property 사용을 허락하기](#추가적인-property-사용을-허락하기)
* [Use Case: React](#use-case-react-state)

## Freshness

> ✍️ **Freshness (신선도)**: 정확한 의미 전달을 위해 "freshness"은 한글로 번역하지 않았습니다.

TypeScript에는 **Freshness** *(=strict object literal checking)* 라는 개념이 있습니다. Freshness는 자칫 [구조적인 관점](#fyi)에서는 호환 가능한 타입이라고 _(잘못)_ 판단될 가능성이 있는 객체 리터럴을 보다 쉽고 정확하게 검사할 수 있게 합니다.

구조적 타이핑(=Structural typing)은 일단 *매우 편리합니다*. 일정 수준의 타입 안정성을 보장해주면서 동시에 *아주 손쉽게* JavaScript 코드를 TypeScript로 업그레이드할 수 있게 하기 때문입니다. 아래의 코드를 살펴보겠습니다.


```ts
function logName(something: { name: string }) {
    console.log(something.name);
}

var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
var random = { note: `I don't have a name property` };

logName(person); // okay
logName(animal); // okay
logName(random); // Error: `name` property가 없습니다.
```

그러나 *구조적* 타이핑에는 약점도 함께 존재합니다. 바로 어떤 경우에는 실제보다 더 많은 데이터를 받을 수 있는 것처럼 (우리를) 착각하게 만들 수 있기 때문입니다. 이와 같은 오류는 아래 코드에서 확인 가능합니다. TypeScript는 다음과 같은 에러를 띄울 것입니다:

```ts
function logName(something: { name: string }) {
    console.log(something.name);
}

logName({ name: 'matt' }); // ㅇㅋ
logName({ name: 'matt', job: 'being awesome' }); // Error: 객체 리터럴은 선언된 property만 명시해야 합니다. `job`은 too much입니다.
```

위같은 에러는 *객체 리터럴을 사용했을 때만* 발생한다는 것을 꼭 명심하세요. 만약 이 에러가 없었다면 우리는 `logName({ name: 'matt', job: 'being awesome' })` 실행문을 보고 `logName` 함수 내부에 `job` property를 처리하는 로직이 있을 것이라고 오해할 위험이 있습니다. (실제로는 완전히 무시되는 녀석이긴 하지만요!)

또 Freshness가 유용하게 적용되는 경우는 선택적(=optional) 멤버가 있는 인터페이스의 타입을 검사할 때입니다. 이 경우 엄격한 객체 리터럴 검사(=strict object literal checking)를 하지 않으면, 오타가 있더라도 타입 검사를 그냥 통과해버리기 때문입니다. 이는 아래에 설명되어 있습니다.

```ts
function logIfHasName(something: { name?: string }) {
    if (something.name) {
        console.log(something.name);
    }
}
var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };

logIfHasName(person); // ㅇㅋ
logIfHasName(animal); // ㅇㅋ
logIfHasName({neme: 'I just misspelled name to neme'}); // Error: 객체 리터럴은 선언된 property만 명시해야 합니다. `neme`는 too much입니다.
```

객체 리터럴을 다소 엄격하게 검사하는 이유는 *사용하지 않는* 추가적인 property가 있는 경우의 대부분은 단순 오타이거나 API를 잘못 이해해서 생기는 문제이기 때문입니다.

### 추가적인 property 사용을 허락하기

타입에 index signature(ex. `[x: string]`)를 사용하면, 추가적인 property를 허용한다는 의미를 명시적으로 나타낼 수도 있습니다.

```ts
var x: { foo: number, [x: string]: any };
x = { foo: 1, baz: 2 };  // ㅇㅋ `baz`는 index signature 조건에 부합하는 군.
```

### 사용 사례: React State

Freshness 활용의 좋은 사례로는 [페이스북의 ReactJS](https://facebook.github.io/react/)를 예로 들 수 있습니다. 보통 컴포넌트 내부에서 `setState` 함수를 호출할 때 필요한 모든 property를 다 전달하는 것이 아니라 (업데이트가) 필요한 몇몇 개의 property만 전달합니다.

```ts
// 가령
interface State {
  foo: string;
  bar: string;
}

// 당신은 foo를 "Hello"로 설정하고 싶습니다:
this.setState({foo: "Hello"}); // Error: bar가 없습니다

// 그러나 state가 `foo`와 `bar`를 모두 갖고 있기 때문에 TypeScript는 다음과 같이 작성하도록 강요할 것입니다:
this.setState({foo: "Hello", bar: this.state.bar}};
```

Freshness의 개념을 잘 이용하면 우리는 모든 멤버를 선택적으로 두면서도 *오타도 찾아줄 수 있도록* 활용할 수 있습니다:

```ts
// 가령
interface State {
  foo?: string;
  bar?: string;
}

// foo를 "Hello"로 설정하고 싶습니다:
this.setState({foo: "Hello"}); // ㅇㅋ 통과!

// Freshness 덕분에 state는 오타로 부터 지켜지고 있습니다!
this.setState({foos: "Hello"}}; // Error: 객체에는 선언된 property만 명시해야 합니다.

// 그리고 타입은 여전히 검사됩니다.
this.setState({foo: 123}}; // Error: 문자열을 지정해야 곳에 숫자를 지정할 수 없습니다.
```

---

#### fyi

* **구조적 관점(structural)** 이란, 타입을 built-in 타입의 작은 모임이나, 합성형 타입(Composite type)으로 보는 관점을 뜻함 [(출처)](https://chayan-memorias.tistory.com/189)