### Destructuring

타입스크립트는 비구조화를 지원합니다. (문자 그대로 구조화되지않은 구조의 이름을 따서 명명됨 즉 구조를 분할함)

1. 객체 비구조화
1. 배열 비구조화

다음은 자바스크립트에서 객체 리터럴에 해당합니다. 비구조화를 하는 쉬운 방법이 있습니다.

```ts
var foo = {
    bar: {
        bas: 123
    }
}
```

자바스크립트는 내장된 멋진 구조적 지원없이 새로운 객체를 생성하기 매우 성가신 일입니다. 비구조화는 구조에서 데이터를 가져오는 것 같은 편의성을 제공합니다.

#### Object Destructuring

비구조화는 매우 유용합니다. 왜냐하면 그것을 사용하면 한줄로 사용할 수 있지만 그렇지 않으면 여러줄이 필요하기 때문입니다.

```ts
var rect = { x: 0, y: 10, width: 15, height: 20 }

// Destructuring assignment
var { x, y, width, height } = rect
console.log(x, y, width, height) // 0,10,15,20

rect.x = 10
;({ x, y, width, height } = rect) // assign to existing variables using outer parentheses
console.log(x, y, width, height) // 10,10,15,20
```

여기서 비구조화가 없다면 `x,y,width,height`는 `rect`에서 하나씩 꺼내서 사용해야 합니다.

변수에서 추출해서 새로운 변수에 할당해야 합니다.

```ts
// structure
const obj = { 'some property': 'some value' }

// destructure
const { 'some property': someProperty } = obj
console.log(someProperty === 'some value') // true
```

당신은 깊은 데이터의 구조를 비구조화로 사용할 수 있습니다. 아래에 샘플이 있습니다.

```ts
var foo = { bar: { bas: 123 } }
var {
    bar: { bas }
} = foo // Effectively `var bas = foo.bar.bas;`
```

#### Object Destructuring with rest

당신은 어떤 숫자 혹은 엘리먼트 객체를 객체에 비구조화 할당을 하고 나머지를 할당할 수 있습니다.

```ts
var { w, x, ...remaining } = { w: 1, x: 2, y: 3, z: 4 }
console.log(w, x, remaining) // 1, 2, {y:3,z:4}
```

확실한 경우에 다음의 요소를 사용할 수 있습니다. 예제가 있습니다.

```ts
// Example function
function goto(point2D: { x: number; y: number }) {
    // Imagine some code that might break
    // if you pass in an object
    // with more items than desired
}
// Some point you get from somewhere
const point3D = { x: 1, y: 2, z: 3 }
/** A nifty use of rest to remove extra properties */
const { z, ...point2D } = point3D
goto(point2D)
```

#### Array Destructuring

개발할때 흔히 하는 질문으로 "두개의 변수를 세번째 변수를 이용해서 스왑하려면?" 다음은 타입스크립트에서 해결책입니다.

```ts
var x = 1,
    y = 2
;[x, y] = [y, x]
console.log(x, y) // 2,1
```

배열의 비구조화는 사실상 컴파일러가 `[0], [1], ...` 등을 하는 것과 같습니다. 물론 이러한 값이 존재한다는 보장을 하지 않습니다.

#### Array Destructuring with rest

당신은 숫자 혹은 엘리먼트로부터 배열을 가져올 수 있고 비구조화 할당과 나머지 할당을 할 수 있습니다.

```ts
var [x, y, ...remaining] = [1, 2, 3, 4]
console.log(x, y, remaining) // 1, 2, [3,4]
```

#### Array Destructuring with ignores

당신은 배열을 비구조화할때 반환하지 않을 데이터는 `, ,` 을 사용해야 합니다. 아래에 예제가 있습니다.

```ts
var [x, , ...remaining] = [1, 2, 3, 4]
console.log(x, remaining) // 1, [3,4]
```

#### JS Generation

ES6가 아닌 일반적인 자바스크립트에서는 비구조화를 지원하지 않기 때문에 임시 변수를 만들어서 스스로 해결해야 합니다.

```ts
var x = 1,
    y = 2
;[x, y] = [y, x]
console.log(x, y) // 2,1

// becomes //

var x = 1,
    y = 2
;(_a = [y, x]), (x = _a[0]), (y = _a[1])
console.log(x, y)
var _a
```

#### Summary

비구조화는 당신의 코드를 더 읽기 쉽게 합니다. 라인수를 줄이고 의도를 명확하게 함으로써 유지보수를 쉽게 하도록 합니다. 배열을 비구조화 할때 튜플인것처럼 사용해야 합니다.
