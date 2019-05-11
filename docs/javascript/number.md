## Number

어떤 프로그래밍 언어로도 숫자를 처리할 때 언어별 차이점을 알아야 합니다. 다음은 자바스크립트 숫자에 대한 몇가지 중요한 정보입니다.

### Core Type

자바스크립트는 오직 한가지 숫자타입만 가집니다. 이것은 이중 정밀도 64비트 숫자입니다. 아래에서는 권장 솔루션과 함께 한계에 대해서 논의합니다.

### Decimal

2가지이상의 숫자타입에 익숙한 사람들을 위해 / 당신은 이진 부동 소수점 숫자가 10진수에 정확히 매핑되지 않는다는 것을 알 것입니다. 그리고 유명한 예가 나와 있습니다.

```js
console.log(0.1 + 0.2) // 0.30000000000000004
```

> 10진수는 아래에 언급한 `big.js`을 사용하십시요.

### Integer

number타입으로 작성된 정수한계는 다음과 같습니다.

```js
console.log({ max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER })
// {max: 9007199254740991, min: -9007199254740991}
```

안전한 정수를 사용할 때 반올림한 값은 사용할 수 없습니다.

안전하지 않은 값은 안전한 값에서 `+1 / -1` 떨어져 있으며 이러한 값을 추가할 경우 반올림된 결과값을 확인할 수 있습니다.

```js
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2) // true!
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2) // true!

console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1) // 9007199254740992 - Correct
console.log(Number.MAX_SAFE_INTEGER + 2) // 9007199254740992 - Rounded!
console.log(Number.MAX_SAFE_INTEGER + 3) // 9007199254740994 - Rounded - correct by luck
console.log(Number.MAX_SAFE_INTEGER + 4) // 9007199254740996 - Rounded!
```

ES6에서 `Number.isSafeInteger`을 이용해서 정수 체크를 안전하게 할 수 있습니다.

```js
// Safe value
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)) // true

// Unsafe value
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)) // false

// Because it might have been rounded to it due to overflow
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 10)) // false
```

> 자바스크립트는 결국 [BigInt](https://developers.google.com/web/updates/2018/05/bigint)지원을 받게 될 것이다. 지금으로서는 정밀한 정수를 사용해야 한다면 아래 언급된 `big.js`를 사용하십시오.

### big.js

재무, 계산등에 수학을 사용할때마다 [big.js](https://github.com/MikeMcl/big.js/)와 같은 라이브러리를 사용하십시오.

-   완벽한 10진수 수학
-   경계를 벗어난 정수값을 안전하게 사용할 수 있습니다.

간단한 설치

```bash
npm install big.js @types/big.js
```

간단한 예제

```js
import { Big } from 'big.js'

export const foo = new Big('111.11111111111111111111')
export const bar = foo.plus(new Big('0.00000000000000000001'))

// To get a number:
const x: number = Number(bar.toString()) // Loses the precision
```

> UI / 차트, 캔버스, 도면등 성능이 중요한 경우에는 이 라이브러리를 사용하지 마십시오.

### NaN

일부 숫자 계산이 number값으로 반환될 수 없는 경우 자바스크립트는 `NaN`값을 반환합니다.

```js
console.log(Math.sqrt(-1)) // NaN
```

메모: 일치연산자는 `NaN`값에서는 작동하지 않습니다. `Number.isNaN`을 이용해서 확인하십시오.

```js
// Don't do this
console.log(NaN === NaN) // false!!

// Do this
console.log(Number.isNaN(NaN)) // true
```

### Infinity

숫자로 표현할 수 있는 값의 외부 범위는 `Number.MAX_VALUE`그리고 `-Number.MAX_VALUE`값으로 사용할 수 있습니다.

```js
console.log(Number.MAX_VALUE) // 1.7976931348623157e+308
console.log(-Number.MAX_VALUE) // -1.7976931348623157e+308
```

범위 밖의 값은 이러한 제한값에 고정됩니다.

```js
console.log(Number.MAX_VALUE + 1 == Number.MAX_VALUE) // true!
console.log(-Number.MAX_VALUE - 1 == -Number.MAX_VALUE) // true!
```

범위를 벗어나는 값은 `Infinity`/`-Infinity`와 같은 특수한 값을 이용하십시요.

```js
console.log(Number.MAX_VALUE + 10 ** 1000) // Infinity
console.log(-Number.MAX_VALUE - 10 ** 1000) // -Infinity
```

물론 이런 특수한 무한대 값은 연산을 통해서 확인할 수 있습니다.

```js
console.log(1 / 0) // Infinity
console.log(-1 / 0) // -Infinity
```

당신은 `Infinity`값을 수동으로 사용하거나 아래와 같이 `Number`클래스의 정적 구성요소로 사용할 수 있습니다.

```js
console.log(Number.POSITIVE_INFINITY === Infinity) // true
console.log(Number.NEGATIVE_INFINITY === -Infinity) // true
```

다행히도 비교연산자 (`<` / `>`)는 무한대 값에 대해서 안정적으로 동작합니다.

```js
console.log(Infinity > 1) // true
console.log(-Infinity < -1) // true
```

### Infinitesimal

숫자로 사용할 수 있는 0이 아닌 가장 작은 값은 `Number.MIN_VALUE`을 이용해서 정적숫자로 사용할 수 있습니다.

```js
console.log(Number.MIN_VALUE) // 5e-324
```

`MIN_VALUE`보다 작은 값은 0으로 고정됩니다.

```js
console.log(Number.MIN_VALUE / 10) // 0
```

> 복습: `Number.MAX_VALUE`를 무한대의 값에 고정하십시요. `Number.MIN_VALUE`를 이용하면 가장 작은 값을 구할 수가 있고 그 보다 작은 값은 `0`으로 고정하십시요.
