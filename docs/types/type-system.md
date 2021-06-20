# 타입스크립트 타입 시스템

논의할때 타입스크립트의 타입 시스템을 다시 살펴보았습니다. [왜 타입스크립트인가?](../why-typescript.md). 다음은 추가 설명이 필요하지 않은 논의에서 가져온 몇가지 주요 내용입니다.

-   타입 시스템은 타입스크립트에서 optional로 설계되었고 당신의 자바스크립트는 타입스크립트입니다.
-   타입스크립트는 자바스크립트의 타입 에러가 있는 경우 차단하지 않습니다. JS에서 TS로 점진적으로 업데이트 할 수 있습니다.

지금 타입스크립트 타입 시스템 문법을 시작하겠습니다. 타입을 사용하는 즉시 당신은 코드에서 이득을 얻을 수 있습니다. 이렇게하면 나중에 타입에 대해서 깊게 배울수 있습니다.

## 기본 Annotations

이전에 타입 문법 `:TypeAnnotation`을 사용하는 방법에 대해서 설명했습니다. 타입 선언 공간에서 사용 가능한 모든 것을 타입 annotation을 선언해서 사용합니다.

함수의 파라미터 그리고 리턴값에는 타입 annotation과 값이 필요합니다. 다음은 입증된 예제입니다.

```ts
var num: number = 123
function identity(num: number): number {
    return num
}
```

### 원시 타입

자바스크립트 원시타입은 타입스크립트의 타입 시스템에서 잘 나타납니다. 이것은 아래에 설명된 `string`, `number`, `boolean`를 의미합니다.

```ts
var num: number
var str: string
var bool: boolean

num = 123
num = 123.456
num = '123' // Error

str = '123'
str = 123 // Error

bool = true
bool = false
bool = 'false' // Error
```

### 배열 (Arrays)

타입스크립트는 배열에 대한 전용형식 구문을 제공하므로 코드에 주석을 달고 문서화하기가 더 쉽습니다. 문법은 근본적으로 어떤 값이 있든지 타입주석 `[]`가 접두어 처럼 붙습니다. (예: `:boolean[]`)
TypeScript provides dedicated type syntax for arrays to make it easier for you to annotate and document your code. The syntax is basically postfixing `[]` to any valid type annotation (e.g. `:boolean[]`). It allows you to safely do any array manipulation that you would normally do and protects you from errors like assigning a member of the wrong type. This is demonstrated below:

```ts
var boolArray: boolean[]

boolArray = [true, false]
console.log(boolArray[0]) // true
console.log(boolArray.length) // 2
boolArray[1] = true
boolArray = [false, false]

boolArray[0] = 'false' // Error!
boolArray = 'false' // Error!
boolArray = [true, 'false'] // Error!
```

### 인터페이스

타입스크립트 인터페이스는 다수의 타입 어노테이션 안에는 하나의 이름을 가진 어노테이션으로 구성되어 있습니다. 다음의 예제를 참고하십시요.

```ts
interface Name {
    first: string
    second: string
}

var name: Name
name = {
    first: 'John',
    second: 'Doe'
}

name = {
    // Error : `second` is missing
    first: 'John'
}
name = {
    // Error : `second` is the wrong type
    first: 'John',
    second: 1337
}
```

여기에서는 어노테이션의 구성은 `first: string` + `second: string` 안에는 개별 멤버에 대한 유형 검사를 위한 새로운 어노테이션 `Name`을 지정했습니다.
인터페이스는 타입스크립트에서 많은 힘을 가지고 있으며 우리는 당신이 그것을 유리하게 사용할 수 있는 데에 전체 섹션을 바칠 것입니다.

### 인라인 타입 주석

새로운 `interface`를 만드는 대신 `:{ /*Structure*/ }`를 원하는 inline 주석을 달 수 있습니다. 이전 예제를 다시 인라인 타입으로 바칩니다.

```ts
var name: {
    first: string
    second: string
}
name = {
    first: 'John',
    second: 'Doe'
}

name = {
    // Error : `second`가 누락되었습니다
    first: 'John'
}
name = {
    // Error : `second`타입이 다릅니다
    first: 'John',
    second: 1337
}
```

인라인 타입은 일회성 타입 주석을 무엇이든 빠르고 훌륭하게 주입할 수 있습니다. 그것은 당신에게 (잠재적으로 나쁜)타입 이름을 생각하는 번거로운 걸 덜어줍니다.
만약 당신이 동일한 타입 주석을 여러줄의 인라인으로 처리할 경우에 그것이 좋은 생각인지 심사숙고해서 interface 안으로 삽입하는 리팩토링을 해야 합니다.

## 특별한 타입

타입스크립트의 기본타입 외에도 약간의 타입은 특별한 의미를 가지고 있다. 그것들은 `any`, `null`, `undefined`, `void`입니다.

### any

타입스크립트 타입 시스템은 `any`타입을 특별한 공간으로 갖고 있습니다. 그것은 타입 시스템에서 탈출구를 제공하며 컴파일러에 포함되지 않습니다. `any`는 모든 타입과 호환이 됩니다. 그 의미는 아래 예제에서 설명합니다.

```ts
var power: any

// Takes any and all types
power = '123'
power = 123

// Is compatible with all types
var num: number
power = num
num = power
```

만약 당신이 자바스크립트 코드를 타입스크립트로 변환한다면 `any`를 이용해서 시작할 수 있습니다. 그러나 타입 안전을 보장하는 것은 당신에게 달려있다는 의미이므로 `any`를 사용하는 것을 심각하게 생각하지 마십시요. 기본적으로 컴파일러는 any를 사용하지 않은 의미있는 타입만 분석하도록 지시하고 있습니다.

### `null` and `undefined`

타입 시스템이 이들을 어떻게 처리하는지는 `strictNullChecks` 컴파일러 플래그에 따라 결정됩니다 (이 플래그는 다음에 다룸). `strictNullCheck:false`인 경우, 자바스크립트 리터럴에서 `null`과 `undefined`는 타입 시스템에서 `any`와 동일한 방식으로 처리됩니다. 이 리터럴은 다른 타입에서 지정할 수 있습니다. 아래 예에서 설명합니다:

```ts
var num: number
var str: string

// These literals can be assigned to anything
num = null
str = undefined
```

### `:void`

`:void`는 함수에서 아무것도 리턴하는 타입이 없을 경우 사용한다.

```ts
function log(message): void {
    console.log(message)
}
```

## Generics

컴퓨터 과학의 많은 알고리즘들 그리고 데이터 구조는 객체의 실제 타입에 의존하지 않습니다. 여전히 다양한 변수들 사이에 제약 조건을 설정하고 싶습니다. 단순한 예제 함수를 가지고 와서 목록의 항목들을 반대로 리턴합니다. 제약 조건을 통과한 함수만 리턴합니다.

```ts
function reverse<T>(items: T[]): T[] {
    var toreturn = []
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i])
    }
    return toreturn
}

var sample = [1, 2, 3]
var reversed = reverse(sample)
console.log(reversed) // 3,2,1

// Safety!
reversed[0] = '1' // Error!
reversed = ['1', '2'] // Error!

reversed[0] = 1 // Okay
reversed = [1, 2] // Okay
```

기본적으로 `reverse` 함수는 (`items: T[]`) 배열을 가져오고 `T`의 타입과 `: T[]`에서 `T` 형식의 배열을 반환합니다. 왜냐하면 `reverse` 함수는 같은 항목들을 반환하기 때문에 타입스크립트는 `reversed` 변수가 `number[]` 타입이라는 것을 알고 타입 안전을 제공합니다. 유사하게 만약 배열을 `string[]`으로 reverse 함수에 리턴값으로 지정하면 `string[]`
을 사용한 예제는 아래와 같습니다.

```ts
var strArr = ['1', '2']
var reversedStrs = reverse(strArr)

reversedStrs = [1, 2] // Error!
```

사실 자바스크립트 배열에는 `.reverse` 함수가 있으며 타입스크립트는 제네릭을 사용하여 구조를 정의합니다.

```ts
interface Array<T> {
    reverse(): T[]
    // ...
}
```

이것은 아래와 같이 어떤 배열에서든 `.reverse`를 호출할때 타입 안전성을 얻는다는 것을 의미합니다.

```ts
var numArr = [1, 2]
var reversedNums = numArr.reverse()

reversedNums = ['1', '2'] // Error!
```

우리는 나중에 `lib.d.ts`에 대해 논의할 때 `Array<T>`에 대해 논의할 것 입니다.

## Union Type

자바스크립트에서 꽤 흔하게 하나의 속성에 다수의 타입을 정의합니다. 예: `string` 또는 `number`. 이것은 어디서나 유니온 타입 `|` 안에 타입주석으로 사용할 수 있습니다. 예: `string|number` 형태로 사용되며 꽤 유용합니다. 일반적으로 사용하는 방법중에 하나는 함수에서 단일 객체 또는 배열을 취할수 있습니다.

```ts
function formatCommandline(command: string[] | string) {
    var line = ''
    if (typeof command === 'string') {
        line = command.trim()
    } else {
        line = command.join(' ').trim()
    }

    // Do stuff with line: string
}
```

## Intersection Type

`extend`는 자바스크립트에서 매우 일반적인 패턴으로 두개의 객체를 가져와서 두 객체의 기능을 모두 갖춘 새로운 객체를 만듭니다. 그리고 **Intersection Type** 에서 패턴을 안전하게 사용하는 방법을 입증했습니다.

```ts
function extend<T, U>(first: T, second: U): T & U {
  return { ...first, ...second };
}

const x = extend({ a: "hello" }, { b: 42 });

// x now has both `a` and `b`
const a = x.a;
const b = x.b;
```

## Tuple Type

자바스크립트에서는 일급 튜플을 지원하지 않습니다. 대부분의 사람들은 튜플 배열을 사용하며 타입스크립트 타입 시스템은 정확히 이를 지원합니다. 튜플을 사용하는 방법을 주석으로 표시하면 `: [typeofmember1, typeofmember2]`로 사용하며 튜플은 여러 멤버를 가질 수 있습니다. 튜플은 아래 예에서 증명합니다.

```ts
var nameNumber: [string, number]

// Okay
nameNumber = ['Jenny', 8675309]

// Error!
nameNumber = ['Jenny', '867-5309']
```

타입스크립트에서 튜플은 비구조화 지원과 결합하면 배열의 밑에 있음에도 불구하고 일급 튜플이라고 느낍니다.

```ts
var nameNumber: [string, number]
nameNumber = ['Jenny', 8675309]

var [name, num] = nameNumber
```

## Type Alias

타입스크립트는 여러곳에서 사용하려는 타입 주석의 이름을 제공하기 위한 편리한 구문을 제공합니다. 문법은 `type SomeName = someValidTypeAnnotation` 이처럼 사용합니다. 아래에서 예제를 살펴봅니다.

```ts
type StrOrNum = string | number

// Usage: just like any other notation
var sample: StrOrNum
sample = 123
sample = '123'

// Just checking
sample = true // Error!
```

type은 `interface` 다르게 타입 주석에 별칭을 줄 수 있습니다. (교차 지점에 있는 타입에 유용합니다). 다음은 문법에 익숙해지기 위한 몇가지 예시 입니다.

```ts
type Text = string | { text: string }
type Coordinates = [number, number]
type Callback = (data: string) => void
```

> 팁: 만약 당신이 `interface`를 사용하면서 타입 주석의 계급이 필요하면 `implements` 와 `extends`를 사용하면 됩니다.

> 팁: 객체 구조에서 타입 구문을 간단하게 사용하는 방법은 `Coordinates`와 같이 의미있는 이름으로 사용해야 합니다. 교차지점에 있는 타입에 의미 있는 이름을 지정하려는 경우에는 타입 구문을 사용하면 됩니다.

## Summary

이제 대부분의 자바스크립트 코드에 주석을 달 수 있으므로 타입스크립트의 타입 시스템에 대해서 자세하게 살펴볼 것 입니다.
