### let

`var`는 자바스크립트에서 *함수 범위*에 해당합니다. 이것은 다른 많은 언어들과 차이가 있습니다. (C# / Java etc.) 변수가 블록 범위인 경우에는 `123`이 출력하지만 다음의 자바스크립트 코드는 *함수 범위*에 해당하므로 `123`대신에 `456`이 출력됩니다.

```ts
var foo = 123
if (true) {
    var foo = 456
}
console.log(foo) // 456
```

이것은 `{`가 새로운 범위를 생성하지 않기 때문이다. 변수 `foo` 는 외부에 있는 변수가 차단되더라도 동일하게 동작합니다. 이것은 자바스크립트 개발의 일반적인 오류 원인에 해당합니다. 이것은 타입스크립트 (그리고 ES6) 를 왜 사용해야 하는지 소개하고 있습니다. `let` 키워드는 블록 범위내에서만 동작합니다. `var` 대신에 `let` 을 사용하면 범위 밖에서 정의한 것과 실제 고유 요소가 분리됩니다. 앞서 설명한 예를 `let` 을 이용하여 설명합니다.

```ts
let foo = 123
if (true) {
    let foo = 456
}
console.log(foo) // 123
```

`let`이 오류를 방지하는 또 다른 장소는 반복문 입니다.

```ts
var index = 0
var array = [1, 2, 3]
for (let index = 0; index < array.length; index++) {
    console.log(array[index])
}
console.log(index) // 0
```

진지하게 우리는 가능한 한 `let` 을 사용한 것이 더 낫다고 생각합니다. 왜냐하면 그것은 새로운 언어와 다국어 개발자들에게 덜 놀라운 결과를 가져다 주기 때문입니다.

#### Functions create a new scope

우리가 언급했듯이 우리는 자바스크립트가 함수 생성시에 새로운 범위를 만드는 것을 증명하고 있습니다. 다음을 고려하십시요.

```ts
var foo = 123
function test() {
    var foo = 456
}
test()
console.log(foo) // 123
```

이것은 당신이 예상했던대로 동작합니다. 이것이 없다면 자바스크립트로 코드를 작성하는 것은 매우 어려울 것 입니다.

#### Generated JS

타입스크립트에서 JS는 유사한 이름이 주변범위에 이미 존재하는 경우 `let` 변수의 이름을 간단히 변경합니다. 예를 들어 다음과 같이 단순하게 `var` 를 교체할 때 생성됩니다.

```ts
if (true) {
    let foo = 123
}

// becomes //

if (true) {
    var foo = 123
}
```

그러나 변수 이름이 주변에서 가져온 거라면 그림과 같이 새로운 변수 이름이 생성됩니다.

```ts
var foo = '123'
if (true) {
    let foo = 123
}

// becomes //

var foo = '123'
if (true) {
    var foo_1 = 123 // Renamed
}
```

#### Switch

당신은 `case` 에 `{}` 를 이용해서 감싸서 변수를 재사용할 수 있습니다. 아래에 `case` 를 통해 사례를 확인하십시요.

```ts
switch (name) {
    case 'x': {
        let x = 5
        // ...
        break
    }
    case 'y': {
        let x = 10
        // ...
        break
    }
}
```

#### let in closures

자바스크립트 개발자에게 일반적인 개발 면접 질문은 다음의 로그값이 무엇인지 물어봅니다.

```ts
var funcs = []
// create a bunch of functions
for (var i = 0; i < 3; i++) {
    funcs.push(function() {
        console.log(i)
    })
}
// call them
for (var j = 0; j < 3; j++) {
    funcs[j]()
}
```

하나는 그것이 `0,1,2` 가 될 것이라고 예상했을 것 입니다. 놀랍게도 함수는 모두 `3` 을 출력합니다. 이유는 세개의 함수가 외부 변수 `i` 를 사용하고 있기 때문입니다. 두번째 반복문이 동작할 때 `i` 값은 이미 `3` 이 될 것입니다.

해결책은 각 루프에 해당 루프 반복에 특정한 새 변수를 생성하는 것 입니다. 이전에 배웠던 것처럼 새 함수를 만들고 즉시 실행함으로써 새로운 변수 범위를 만들수 있습니다. (예를 들면 IIFE 패턴을 이용하십시요 `(function() { /* body */ })();`) 아래 예제를 참고하십시요.

```ts
var funcs = []
// create a bunch of functions
for (var i = 0; i < 3; i++) {
    ;(function() {
        var local = i
        funcs.push(function() {
            console.log(local)
        })
    })()
}
// call them
for (var j = 0; j < 3; j++) {
    funcs[j]()
}
```

여기서 함수는 로컬변수 위에 닫히고 루프변수 `i` 대신에 로컬변수를 사용합니다.

> 클로저 함수는 성능에 영향을 미친다는 점을 유의하십시요. (주변 상태를 저장해야 함)

ES6 `let` 키워드를 사용하면 이전 예제와 동일하게 동작합니다.

The ES6 `let` keyword in a loop would have the same behavior as the previous example:

```ts
var funcs = []
// create a bunch of functions
for (let i = 0; i < 3; i++) {
    // Note the use of let
    funcs.push(function() {
        console.log(i)
    })
}
// call them
for (var j = 0; j < 3; j++) {
    funcs[j]()
}
```

`var` 대신에 `let` 을 사용하면 각 루프 반복에 고유한 변수 `i` 가 생성됩니다.

#### Summary

`let` 은 대부분의 코드에서 유용하게 사용할 수 있습니다. 그것은 코드 가독성을 크게 향상시키고 프로그래밍 오류의 가능성을 감소시킬 수 있습니다.

[](https://github.com/olov/defs/blob/master/loop-closures.md)
