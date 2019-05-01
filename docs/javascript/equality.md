## 원시데이터에서 동등연산자와 일치연산자 차이

자바스크립트에서 조심해야 할 차이가 있습니다. `==` 와 `===`. 자바스크립트가 동등연산자를 사용할 때 탄력적으로 시도하기 때문에 `==` 아래의 동등연산자와 일치연산자에서 동등연산자는 탄력적으로 `string`을 `number`로 변환합니다.

```js
console.log(5 == '5') // true   , TS Error
console.log(5 === '5') // false , TS Error
```

자바스크립트에서 동등연산자와 일치연산자중에서 선택하는 것은 항상 이상적인 것은 아닙니다. 왜냐하면 아래 예제에서 두 명령문은 모두 false에 해당합니다. `""` 와 `"0"` 둘 다 string이지만 같지 않습니다. 두번째는 0을 포함하고 있지만 공백으로 인식하기 때문에 (`""`) 힝상 falsy를 반환합니다. 그러므로 두 문장은 `==`를 사용할때는 동등하고 `===`를 사용할때는 항상 false가 됩니다.

```js
console.log('' == '0') // false
console.log(0 == '') // true

console.log('' === '0') // false
console.log(0 === '') // false
```

> Note `string == number` 와 `string === number` 타입스크립트에서 동등연산자와 일치연산자는 컴파일 단계에서 에러를 출력하기 때문에 이런 부분에 대해서 걱정할 필요가 없습니다.

비슷한걸로는 `==` vs. `===`, 그리고 `!=` vs. `!==`가 있습니다.

꿀팁: 항상 `===` 와 `!==` 이것을 사용하고 null체크는 동등연산자를 사용해도 됩니다.

## 참조데이터에서 동등연산자와 일치연산자 차이

만약 당신이 두개의 객체를 비교하려고 한다면 `==`/`===`로는 충분히 비교하기 어렵습니다.

```js
console.log({ a: 123 } == { a: 123 }) // False
console.log({ a: 123 } === { a: 123 }) // False
```

깊은 비교를 사용하려면 [깊은 비교](https://www.npmjs.com/package/deep-equal) 이 패키지를 참고하십시요

```js
import * as deepEqual from 'deep-equal'

console.log(deepEqual({ a: 123 }, { a: 123 })) // True
```

당신은 항상 깊은 비교를 할 필요가 없습니다. 그럴때는 `id`값을 체크하면 됩니다.

```ts
type IdDisplay = {
    id: string
    display: string
}
const list: IdDisplay[] = [
    {
        id: 'foo',
        display: 'Foo Select'
    },
    {
        id: 'bar',
        display: 'Bar Select'
    }
]

const fooIndex = list.map(i => i.id).indexOf('foo')
console.log(fooIndex) // 0
```
