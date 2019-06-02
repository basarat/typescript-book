-   [화살표 함수](#arrow-functions)
-   [팁: 화살표 함수의 필요성](#tip-arrow-function-need)
-   [팁: 화살표 함수의 주의사항](#tip-arrow-function-danger)
-   [팁: 화살표 함수를 사용하는 라이브러리에서 `this`를 사용하는 방법](#tip-arrow-functions-with-libraries-that-use-this)
-   [팁: 화살표 함수 그리고 상속](#tip-arrow-functions-and-inheritance)
-   [팁: 객체를 빠르게 리턴하는 방법](#tip-quick-object-return)

### 화살표 함수(Arrow Functions)

사랑스럽고 뚱뚱한 화살 (왜냐하면 `->` 대신에 `=>`) 그리고 람다함수라고 불린다. 또 다른 사용법은 `()=>something` 이와 같이 사용하기도 한다. 화살표 함수를 사용하는 목적은 다음과 같습니다.

1. `function` 키워드를 항상 입력할 필요가 없습니다.
2. `this`의 의미를 어휘적으로 포착합니다.
3. `arguments`의 의미를 어휘적으로 포착합니다.

함수를 이용하는 언어의 경우 `function`을 입력해야 하는데 화살표 함수를 이용하면 간단하게 함수를 생성할 수 있다.

```ts
var inc = x => x + 1
```

자바스크립트에서 `this`는 고통의 핵심이었습니다. 어떤 현명한 사람은 "나는 자바스크립트가 `this`값을 쉽게 잃어버리는 것 때문에 자바스크립트가 싫다." 라고 말했습니다. 화살표 함수는 주변의 맥락에서 의미를 포착하여 `this`를 고정시킵니다.

```ts
function Person(age) {
    this.age = age
    this.growOld = function() {
        this.age++
    }
}
var person = new Person(1)
setTimeout(person.growOld, 1000)

setTimeout(function() {
    console.log(person.age)
}, 2000) // 1, should have been 2
```

브라우저에서 이 코드를 실행하게 되면 `this`는 `window`를 가리키게 되고 `window`는 다시 `growOld`를 가리키게 되서 함수가 실행되게 합니다.

```ts
function Person(age) {
    this.age = age
    this.growOld = () => {
        this.age++
    }
}
var person = new Person(1)
setTimeout(person.growOld, 1000)

setTimeout(function() {
    console.log(person.age)
}, 2000) // 2
```

`this`가 동작하는 이유는 함수 본체 외부에서 화살표 함수에 의해 참조되기 때문입니다. 이는 다음의 자바스크립트 코드와 같습니다.(타입스크립트가 없는 경우 직접 작성하는 코드입니다.)

```ts
function Person(age) {
    this.age = age
    var _this = this // capture this
    this.growOld = function() {
        _this.age++ // use the captured this
    }
}
var person = new Person(1)
setTimeout(person.growOld, 1000)

setTimeout(function() {
    console.log(person.age)
}, 2000) // 2
```

타입스크립트를 사용하기 때문에 문법에서 더 달콤하고 화살표 함수를 이용해서 클래스와 결합해서 사용할 수 있습니다.

```ts
class Person {
    constructor(public age: number) {}
    growOld = () => {
        this.age++
    }
}
var person = new Person(1)
setTimeout(person.growOld, 1000)

setTimeout(function() {
    console.log(person.age)
}, 2000) // 2
```

> [달달한 패턴에 대한 영상 🌹](https://egghead.io/lessons/typescript-make-usages-of-this-safe-in-class-methods)

#### 팁: 화살표 함수의 필요성

간결한 구문외에도 기능을 효과적으로 전달하기 위해서는 화살표 함수를 사용해야 합니다.

```ts
var growOld = person.growOld
// Then later someone else calls it:
growOld()
```

당신은 함수를 직접적으로 호출할 수 있습니다.

```ts
person.growOld()
```

그러면 이것이 `this`의 올바른 호출 컨텍스트 일 것입니다. (예시 `person`).

#### 팁: 화살표 함수 주의사항

사실 `this`가 호출 컨텍스트가 되게 하려면 화살표 함수를 사용하면 안됩니다. 이것은 jquery, underscore, mocha등과 같은 라이브러리를 사용할때 해당된다. 만약 문서에 `this`에 대해 언급된 경우 화살표 함수 대신 `function`을 사용해야 할 것 입니다. 마찬가지로 `arguments`을 사용할 경우 화살표 함수를 사용하지 않습니다.

#### 팁: 화살표 함수를 사용하는 라이브러리에서 `this`를 사용하는 방법

많은 라이브러리들이 예를 들면 `jQuery`의 each메서드에서 iterables (one example https://api.jquery.com/jquery.each/) 을 사용하여 `this`를 현재 반복중인 객체에 전달합니다. 이 경우 라이브러리의 `this`뿐만 아니라 주변 컨텍스트에 접근하려면 `_self`를 사용하여 화살표 함수가 없는 것 처럼 사용하십시요.

```ts
let _self = this
something.each(function() {
    console.log(_self) // the lexically scoped value
    console.log(this) // the library passed value
})
```

#### 팁: 화살표 함수 그리고 상속

클래스내에서 화살표 함수의 속성과 상속에 잘 작동합니다.

```ts
class Adder {
    constructor(public a: number) {}
    add = (b: number): number => {
        return this.a + b
    }
}
class Child extends Adder {
    callAdd(b: number) {
        return this.add(b)
    }
}
// Demo to show it works
const child = new Child(123)
console.log(child.callAdd(123)) // 246
```

자식 클래스에서 `super` 키워드를 이용해서 함수를 재정의해도 잘 작동하지 않습니다. 속성은 `this`에 적용됩니다. 오직 한가지만 있기 때문에 그러한 기능은 `super` (`super`는 오직 프로토타입 멤버일때 동작합니다.) 에 대한 호출에 참여할 수 없습니다. 자식에서 재정의하기전에 복사본을 만들어 쉽게 사용할 수 있습니다.

```ts
class Adder {
    constructor(public a: number) {}
    // This function is now safe to pass around
    add = (b: number): number => {
        return this.a + b
    }
}

class ExtendedAdder extends Adder {
    // Create a copy of parent before creating our own
    private superAdd = this.add
    // Now create our override
    add = (b: number): number => {
        return this.superAdd(b)
    }
}
```

### 팁: 객체를 빠르게 리턴하는 방법

때때로 당신은 함수를 이용해서 객체를 간단하게 리턴하는 기능이 필요합니다.

```ts
// WRONG WAY TO DO IT
var foo = () => {
    bar: 123
}
```

이 코드는 자바스크립트의 런타임 (자바스크립트의 스펙으로 인해) 에 의해 자바스크립트의 레이블이 포함된 블록으로 파싱됩니다.

> 만약 이 코드에 문제가 있어도 걱정할 필요가 없습니다. 항상 타입스크립트의 컴파일러가 "레이블을 사용하지 않았다."는 에러를 찾아내주기 때문입니다. 레이블은 오래된 GOTO (숙련된 개발자가 나쁘게 생각하는) 로 무시할 수 있는 자바스크립트의 기능입니다.

당신은 `()`을 이용해서 객체를 리턴할 수 있습니다.

```ts
// Correct 🌹
var foo = () => ({
    bar: 123
})
```
