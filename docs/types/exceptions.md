# 예외 처리

JavaScript에는 예외 처리 용으로 사용할 수 있는 `Error` 클래스가 있습니다. 오류를 던질 때는 `throw` 키워드를 사용합니다. 그 오류는 `try` / `catch` 블럭으로 잡을 수 있습니다, 예를 들면:

```js
try {
  throw new Error('Something bad happened');
}
catch(e) {
  console.log(e);
}
```

## Error 서브 타입

내장된 `Error` 클래스에 더하여 `Error`를 상속하는 내장 오류 클래스가 몇개 더 있고, JavaScript 런타임이 이런 오류를 던질 수 있습니다:

### RangeError

숫자 변수 또는 파라미터가 유효한 범위를 벗어난 경우를 나타내는 인스턴스 생성.

```js
// 너무 많은 수의 인자로 콘솔 호출
console.log.apply(console, new Array(1000000000)); // RangeError: Invalid array length
```

### ReferenceError

유효하지 않은 참조 값을 참조(de-referencing)하여 오류가 발생했음을 나타내는 인스턴스 생성, 예를 들면:

```js
'use strict';
console.log(notValidVar); // ReferenceError: notValidVar is not defined
```

### SyntaxError

유효하지 않은 JavaScript 코드를 파싱하여 구문 오류가 발생했음을 나타내는 인스턴스 생성.

```js
1***3; // SyntaxError: Unexpected token *
```

### TypeError

변수 또는 파라미터가 유효하지 않은 타입인 경우일 때 발생하는 오류를 나타내는 인스턴스 생성.

```js
('1.2').toPrecision(1); // TypeError: '1.2'.toPrecision is not a function
```

### URIError

`encodeURI()` 또는 `decodeURI()`에 유효하지 않은 파라미터가 전달되었을 때 발생하는 오류를 나타내는 인스턴스 생성.

```js
decodeURI('%'); // URIError: URI malformed
```

## 항상 `Error` 사용

초급 JavaScript 개발자들은 종종 그냥 생 문자열을 던집니다, 예를 들면:

```js
try {
  throw 'Something bad happened';
}
catch(e) {
  console.log(e);
}
```

*이렇게 하지 마세요*. `Error` 객체의 근본적인 편의성은 자신이 어디서 만들어졌고 발생했는지에 대해 `stack` 프로퍼티로 자동으로 기록을 유지해준다는 점입니다.

생 문자열은 정말 고통스러운 디버깅을 경험하게 할 수 있고 로그를 보고 오류를 분석하는 일을 힘들게 만듭니다.

## 오류를 꼭 `throw` 할 필요 없음

`Error` 객체를 여기저기로 전달해도 괜찮습니다. Node.js의 콜백 스타일 코드가 이런 식이며, 콜백의 첫번째 인자가 오류 객체입니다.

```js
function myFunction (callback: (e?: Error)) {
  doSomethingAsync(function () {
    if (somethingWrong) {
      callback(new Error('This is my error'))
    } else {
      callback();
    }
  });
}
```

## 예외적인 경우

컴퓨터 과학에서 `예외는 예외적이어야 한다!`는 말을 많이 합니다. 이것이 JavaScript (그리고 TypeScript) 에서도 맞는 말인 이유가 몇가지 있습니다.

### 어디서 던졌는지 불확실

아래 코드를 봅시다:

```js
try {
  const foo = runTask1();
  const bar = runTask2();
}
catch(e) {
  console.log('Error:', e);
}
```

다음에 올 개발자는 오류 발생 가능한 함수가 어떤 것인지 알 수 없습니다. 이 코드를 리뷰하는 사람은 task1 / task2 그리고 이들이 호출하는 다른 함수들을 조사해보지 않으면 알 수 없습니다.

### 부드러운 처리를 어렵게 함

오류 발생 가능한 각 부분에 명시적으로 catch를 넣어서 이 문제를 부드러운 처리를 가능하게 할 수 있습니다:

```js
try {
  const foo = runTask1();
}
catch(e) {
  console.log('Error:', e);
}
try {
  const bar = runTask2();
}
catch(e) {
  console.log('Error:', e);
}
```

하지만 이제 첫번째 작업에서 두번째 작업으로 뭔가를 넘기려고 하면 코드가 지저분해집니다: (`foo`가 변경되어야 하는데 `runTask1`의 리턴 타입으로 그 타입을 추론할 수 없으므로 `let` + 명시적인 타입 지정이 필요하다는 점을 눈여겨 보세요):

```ts
let foo: number; // `let`과 명시적 타입 지정
try {
  foo = runTask1();
}
catch(e) {
  console.log('Error:', e);
}
try {
  const bar = runTask2(foo);
}
catch(e) {
  console.log('Error:', e);
}
```

### 타입 시스템으로 잘 표현 안됨

아래 함수의 경우:

```ts
function validate(value: number) {
  if (value < 0 || value > 100) throw new Error('Invalid value');
}
```

이런 경우에 `Error`를 사용하는 것은 좋은 생각이 아닙니다. 밸리데이션 함수의 타입 정의가 제대로 표현되지 않기 때문입니다 (`(value:number) => void` 타입이 됨). 이거 말고 더 좋은 방법은 이것일 겁니다:

```ts
function validate(value: number): {error?: string} {
  if (value < 0 || value > 100) return {error:'Invalid value'};
}
```

이제 결과가 타입 시스템으로 표현됩니다.

> 아주 범용적인 방식 (단순 catch-all 등)으로 오류를 처리하는 것이 아니라면 오류를 *던지지* 마세요.
