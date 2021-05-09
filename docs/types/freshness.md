
* [신선도(Freshness)](#freshness)
* [추가 속성 허용](#추가-속성-허용)
* [사용 사례: React State](#사용-사례-react-state)

## 신선도(Freshness)

TypeScipt는 구조적으로 타입 호환성이 있는 객체 리터럴의 타입 검사를 쉽게 할 수 있도록 **신선도(Freshness)**라는 개념을 제공합니다(다른 말로 *엄격한 객체 리터럴 검사*라 하기도 함).

구조적 타입 처리는 *매우 편리*합니다. 다음의 코드를 보세요. 이렇게 하면 JavaScript 코드를 TypeScript로 *아주 쉽게* 업그레이드할 수 있고 적정 수준의 타입 안정성이 유지됩니다:

```ts
function logName(something: { name: string }) {
    console.log(something.name);
}

var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
var random = { note: `I don't have a name property` };

logName(person); // 오케이
logName(animal); // 오케이
logName(random); // Error: property `name` is missing
```

그렇지만, *구조적* 타입 처리는 무언가가 실제 다루는 것보다 더 많은 데이터를 받아들인다는 오해를 불러일으킬 수 있다는 약점이 있습니다. 이런 경우는 아래 코드에서 TypeScript가 발생시키는 오류와 함께 확인할 수 있습니다:

```ts
function logName(something: { name: string }) {
    console.log(something.name);
}

logName({ name: 'matt' }); // okay
logName({ name: 'matt', job: 'being awesome' }); // Error: object literals must only specify known properties. `job` is excessive here.
```

이 오류는 *객체 리터럴을 사용한 경우에만" 발생한다는 점을 유념해주세요. 이렇게 오류가 발생하지 않는다면 `logName({ name: 'matt', job: 'being awesome' })`라는 코드를 보는 사람은 *logName*이 `job`에 대해서도 뭔가 처리할 것이라고 오해할 수 있습니다, 실제로는 아무것도 하지 않는데도요.

또 다른 큰 사용 예는 선택적(optional) 멤버가 있는 인터페이스의 경우이며, 앞서 설명한 객체 리터럴 검사가 없다면 오타가 있어도 타입 검사가 그냥 통과될 것 입니다. 아레에 나와 있습니다:

```ts
function logIfHasName(something: { name?: string }) {
    if (something.name) {
        console.log(something.name);
    }
}
var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };

logIfHasName(person); // okay
logIfHasName(animal); // okay
logIfHasName({neme: 'I just misspelled name to neme'}); // Error: object literals must only specify known properties. `neme` is excessive here.
```

객체 리터럴일 때만 이런 식의 타입 검사가 수행되는 이유는 속성이 추가로 입력되었지만 그 속성이 "실제로 사용되지 않는다면" 거의 항상 오타가 발생한 경우이거나 API를 잘못 이해한 경우이기 때문입니다.

### 추가 속성 허용

타입 선언에 인덱스 서명을 포함시키면 그 타입이 추가 속성을 허용함을 명시적으로 나타낼 수 있습니다.:

```ts
var x: { foo: number, [x: string]: unknown };
x = { foo: 1, baz: 2 };  // 오케이, `baz`는 인덱스 서명 부분에 해당하게 됨
```

### 사용 사례: React State

[Facebook ReactJS](https://facebook.github.io/react/)에서 객체 신선도의 좋은 사용 사례를 볼 수 있습니다. 컴포넌트에서 `setState`를 호출할 때 일부 속성만 넣는 경우가 아주 흔합니다, 예를 들면:

```ts
// 아래와 같을 때
interface State {
    foo: string;
    bar: string;
}

// 하려고 한 것:
this.setState({foo: "Hello"}); // Error: missing property bar

// State에 `foo`와 `bar` 둘 다 있기 때문에 TypeScript에서는 이렇게 할 수 밖에 없음: 
this.setState({foo: "Hello", bar: this.state.bar});
```

신신도 개념을 생각해서 모든 멤버를 선택적(optional)로 표시하면 일부 속성만 넣으면서도 *오타를 검출할 수 있습니다*!: 

```ts
// 아래와 같을 때
interface State {
    foo?: string;
    bar?: string;
}

// 하려고 한 것: 
this.setState({foo: "Hello"}); // 좋아, 잘 되는군!

// 신선도 때문에 오타 입력은 방지됨!
this.setState({foos: "Hello"}); // Error: Objects may only specify known properties

// 타입 검사도 유지됨
this.setState({foo: 123}); // Error: Cannot assign number to a string
```
