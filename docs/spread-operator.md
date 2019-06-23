### Spread Operator

전개 연산자의 주된 목표는 배열 혹은 객체요소를 전개하는 것입니다. 이것은 예제에 대한 최고의 설명 입니다.

#### Apply

전개를 함수에 인자로 사용하는 방법이 흔하게 사용됩니다. 이전에는 `Function.prototype.apply` 를 사용할 필요가 있었습니다.

```ts
function foo(x, y, z) {}
var args = [0, 1, 2]
foo.apply(null, args)
```

이제는 `...` 를 인자의 앞에 붙이면 간단합니다. 아래를 참고하십시요.

```ts
function foo(x, y, z) {}
var args = [0, 1, 2]
foo(...args)
```

여기 `args` 배열이 `arguments` 안으로 전개됩니다.

#### Destructuring

우리는 이미 비구조화를 하면 이미 사용해봤습니다.

```ts
var [x, y, ...remaining] = [1, 2, 3, 4]
console.log(x, y, remaining) // 1,2,[3,4]
```

단순히 비구조화 할당을 할때 배열의 나머지 요소를 쉽게 캡쳐할 수 있도록 하는 것입니다.

#### Array Assignment

전개연사자를 쉽게 사용하는 방법은 배열내에서 다른 배열과 같이 사용하는 것입니다. 아래에 그 예제가 있습니다.

```ts
var list = [1, 2]
list = [...list, 3, 4]
console.log(list) // [1,2,3,4]
```

당신은 배열내에 아무곳에서나 전개를 사용할 수 있습니다.

```ts
var list = [1, 2]
list = [0, ...list, 4]
console.log(list) // [0,1,2,4]
```

#### Object spread

게다가 당신은 전개를 객체 내에서 다른 객체와 사용할 수 있습니다. 일반적인 방법은 원본을 변경하지 않고 단순히 객체에 속성을 추가하는 것입니다.

```ts
const point2D = { x: 1, y: 2 }
/** Create a new object by using all the point2D props along with z */
const point3D = { ...point2D, z: 3 }
```

객체를 전개할때 문제는 `Object.assign` 와 같은 효과를 기대하지만 먼저 오는 것은 나중에 오는 것에 의해 오버라이드 됩니다.

```ts
const point2D = { x: 1, y: 2 }
const anotherPoint3D = { x: 5, z: 4, ...point2D }
console.log(anotherPoint3D) // {x: 1, y: 2, z: 4}
const yetAnotherPoint3D = { ...point2D, x: 5, z: 4 }
console.log(yetAnotherPoint3D) // {x: 5, y: 2, z: 4}
```

또 다른 일반적인 전개에 대한 간단한 사용방법 입니다.

```ts
const foo = { a: 1, b: 2, c: 0 }
const bar = { c: 1, d: 2 }
/** Merge foo and bar */
const fooBar = { ...foo, ...bar }
// fooBar is now {a: 1, b: 2, c: 1, d: 2}
```

#### Summary

자바스크립트를 사용할때 `apply` 는 자주 사용되고 그것은 괜찮은 문법을 가지고 있습니다. `this` 인자에 `null` 을 사용하지 않는 것이 좋습니다. 배열을 다른 배열로 할당하기 위한 전용구문을 사용하면 배열에서 배열처리를 수행할때 깔끔한 구문을 사용할 수 있습니다.

[](https://github.com/Microsoft/TypeScript/pull/1931)
