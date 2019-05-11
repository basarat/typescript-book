## Truthy

자바스크립트에는 `truthy`라는 개념이 있다. 특정위치에서 그렇게 동작하는데 (예: `if`, `&&` `||`연산자)가 이에 해당한다. 실제로는 `true`가 아니지만 그렇게 동작한다는 것인데 숫자를 예를 들면 `0`이 아닌 모든 값은 `true`인 경우가 그 예이다.

```ts
if (123) {
    // Will be treated like `true`
    console.log('Any number other than 0 is truthy')
}
```

truthy가 아닌 것을 `falsy`라 부릅니다.

여기 참고할 수 있는 편리한 표가 있다.
Here's a handy table for your reference.

| Variable Type                                        | When it is _falsy_  | When it is _truthy_ |
| ---------------------------------------------------- | ------------------- | ------------------- |
| `boolean`                                            | `false`             | `true`              |
| `string`                                             | `''` (empty string) | any other string    |
| `number`                                             | `0` `NaN`           | any other number    |
| `null`                                               | always              | never               |
| `undefined`                                          | always              | never               |
| Any other Object including empty ones like `{}`,`[]` | never               | always              |

### 분명한 건

> `!!`패턴

일반적으로 `boolean`값으로 처리하고 `true`|`false`로 변환하는 것이 의도임을 아는 것이 중요합니다. 당신은 boolean값을 쉽게 얻을 수 있습니다. `!!`를 이용해서 예: `!!foo`. 그것은 `!`을 두번 사용해서 표현할 수 있습니다. 첫번째 `!`가 변수를 boolean 값을 반전시키지만 두번째 `!`가 다시 논리를 반전시키기 때문에 원래의 boolean값을 얻을 수 있습니다.

이런 패턴을 많은 곳에서 사용하는 것은 흔한 일입니다.

```js
// Direct variables
const hasName = !!name

// As members of objects
const someObj = {
    hasName: !!name
}

// e.g. in ReactJS JSX
{
    !!someName && <div>{someName}</div>
}
```
