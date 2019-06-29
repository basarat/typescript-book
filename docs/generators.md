## Generators

*제네레이터 함수*의 문법은 `function *`으로 작성합니다. 제네레이터 함수는 호출중에 제네레이터 객체를 리턴합니다. 제네레이터 객체는 [iterator][iterator] 인터페이스를 따라갑니다. (예: `next`, `return`그리고 `throw`함수가 있습니다.)

제네레이터 함수에는 두가지 주요동기가 있습니다.

### Lazy Iterators

제네레이터 함수를 이용하면 lazy iterators를 만드는데 사용할 수 있습니다. 예: 다음 함수는 필요에 따라 **infinite** 숫자 목록을 반환합니다.

```ts
function* infiniteSequence() {
    var i = 0
    while (true) {
        yield i++
    }
}

var iterator = infiniteSequence()
while (true) {
    console.log(iterator.next()) // { value: xxxx, done: false } forever and ever
}
```

물론 iterator가 끝나면 `{ done: true }`의 결과를 얻습니다. 아래에 그 예가 있습니다.

```ts
function* idMaker() {
    let index = 0
    while (index < 3) yield index++
}

let gen = idMaker()

console.log(gen.next()) // { value: 0, done: false }
console.log(gen.next()) // { value: 1, done: false }
console.log(gen.next()) // { value: 2, done: false }
console.log(gen.next()) // { done: true }
```

### Externally Controlled Execution

일부 제네레이터 함수는 정말 흥미진진합니다. 기본적으로 함수가 실행을 일시중지하고 나머지 함수실행을 호출자에게 전달할 수 있습니다.

호출해도 제네레이터 함수가 실행되지 않습니다. 그것은 단지 제네레이터 객체를 생성합니다. 샘플 실행과 함께 다음 예제를 고려하십시요.

```ts
function* generator() {
    console.log('Execution started')
    yield 0
    console.log('Execution resumed')
    yield 1
    console.log('Execution resumed')
}

var iterator = generator()
console.log('Starting iteration') // This will execute before anything in the generator function body executes
console.log(iterator.next()) // { value: 0, done: false }
console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```

이것을 실행하면 다음과 같은 결과값을 얻을 수 있습니다.

```
$ node outside.js
Starting iteration
Execution started
{ value: 0, done: false }
Execution resumed
{ value: 1, done: false }
Execution resumed
{ value: undefined, done: true }
```

-   제네레이터 함수를 시작하는 방법은 오직 `next`를 이용해서 호출할때 실행되며 이것은 제네레이터 객체에 해당됩니다.
-   제네레이터 함수를 중지하는 방법은 `yield`를 이용해야 합니다.
-   제레레이터 함수를 다시 시작하려면 `next`를 호출해야 합니다.

> 본질적으로 제네레이터 함수의 실행은 제네레이터 객체에 의해 제어 가능합니다.

제네레이터를 사용한 우리가 배웠던 방법은 대부분 이터레이터를 이용한 값을 반환하는 한가지 방법입니다. 자바스크립트의 제네레이터에는 하나의 매우 강력한 기능은 양방향 통신을 허용한다는 것입니다.

-   당신은 `iterator.next(valueToInject)`를 이용해서 `yield` 표현식의 결과값을 제어 할 수 있습니다.
-   당신은 `iterator.throw(error)`를 이용해서 `yield` 표현식의 시점에서 예외처리를 할 수 있습니다.

`iterator.next(valueToInject)`를 예제에서 증명하고 있습니다.

```ts
function* generator() {
    const bar = yield 'foo' // bar may be *any* type
    console.log(bar) // bar!
}

const iterator = generator()
// Start execution till we get first yield value
const foo = iterator.next()
console.log(foo.value) // foo
// Resume execution injecting bar
const nextThing = iterator.next('bar')
```

`yield`는 이터레이터의 `next`함수에 전달된 매개변수를 반환하기 때문에 그리고 모든 이터레이터는 `next`함수는 모든 유형의 매개변수를 허용하고, 타입스크립트는 `yield`연산자의 결과에 `any`타입을 할당합니다.

> 당신은 당신이 기대하는 타입으로 결과를 강요하려고 합니다. 그리고 그것은 오직 값만 전달하는지 확인하십시요. 만약 당신이 강력한 타이핑이 중요한 경우에는 양방향 바인딩을 피하고 패키지를 많이 사용하는 패키지를 피할 수 있습니다. (예: redux-saga)

`iterator.throw(error)`의 예제를 아래에서 증명합니다.

```ts
function* generator() {
    try {
        yield 'foo'
    } catch (err) {
        console.log(err.message) // bar!
    }
}

var iterator = generator()
// Start execution till we get first yield value
var foo = iterator.next()
console.log(foo.value) // foo
// Resume execution throwing an exception 'bar'
var nextThing = iterator.throw(new Error('bar'))
```

여기에 설명이 있습니다.

-   제네레이터 함수는 `yield`를 통해 통신을 일시중지하고 외부 시스템에 제어를 전달할 수 있게 합니다.
-   외부 시스템에서 값을 제네레이터 함수안으로 밀어넣을수 있습니다.
-   외부 시스템에서 예외를 제네레이터 함수안으로 던질 수 있습니다.

이것은 어떻게 활용할 수 있나요? 다음장에서 [**async/await**][async-await]으로 이동하여 알아보십시요.

[iterator]: ./iterators.md
[async-await]: ./async-await.md
