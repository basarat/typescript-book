## Null and Undefined

> [관련 무료 영상](https://www.youtube.com/watch?v=kaUfBNzuUAI)

자바스크립트와 타입스크립트에는 두가지 타입이 있습니다. `null`과 `undefined`는 다른것들을 의미합니다.

-   무엇인가가 초기화 되지 않았습니다. : `undefined`.
-   무엇인가를 초기화 후 의도적으로 null값을 할당했습니다: `null`.

### null과 undefined 둘중 하나를 확인

다음은 자바스크립트의 `==`를 이용해서 `null`과 `undefined`를 비교했을때 각각 결과값을 보여줍니다.

```ts
// null과 undefined는 `==`를 사용해도 일치합니다.
console.log(null == null) // true (of course)
console.log(undefined == undefined) // true (of course)
console.log(null == undefined) // true

// 다음과 같은 경우는 falsy값을 반환합니다.
console.log(0 == undefined) // false
console.log('' == undefined) // false
console.log(false == undefined) // false
```

null을 확인할 경우에는 `== null`와 같이 동등연산자를 사용하여 비교하는 것을 추천합니다. 일반적으로 `undefined`와 `null`을 비교할일은 거의 없습니다.

```ts
function foo(arg: string | null | undefined) {
    if (arg != null) {
        // arg must be a string as `!=` rules out both null and undefined.
    }
}
```

> 당신은 `== undefined`을 사용해서 비교할 수도 있지만 `== null`을 사용하는 게 짧고 더 흔하게 사용됩니다.

다음은 최상단에서 `undefined`값에 대해서 예외처리에 대해서 알아봅니다.

### 최상단에서 undefined 확인

나는 당신에게 `== null`를 비교할때 동등연산자를 사용하라고 말했습니다. 최상단에서 비교할때는 이것을 사용하면 안됩니다.
strict mode에서 사용하게 되면 `foo`가 정의되지 않은 경우 `ReferenceError`가 발생하며 전체 호출 스택이 해제됩니다.

> 당신은 strict mode를 사용해야 합니다. 타입스크립트는 컴파일러는 strict mode를 당신이 사용하는 모듈에 삽입하기 때문입니다.

전역변수가 정의됐는지 `typeof`를 사용해서 확인할 수 있습니다.

```ts
if (typeof someglobal !== 'undefined') {
    // 전역에서 사용해도 안전합니다.
    console.log(someglobal)
}
```

### `undefined`는 명시적으로 사용하는 걸 제한해야 합니다.

왜냐하면 타입스크립트는 별도로 구조를 문서화할 수 있는 기회를 제공하기 때문입니다.

```ts
function foo() {
    // if Something
    return { a: 1, b: 2 }
    // else
    return { a: 1, b: undefined }
}
```

당신은 타입 주석을 사용해야 합니다.

```ts
function foo(): { a: number; b?: number } {
    // if Something
    return { a: 1, b: 2 }
    // else
    return { a: 1 }
}
```

### 노드 방식 콜백

노드 방식에서 콜백함수는 (예: `(err,somethingElse)=>{ /* something */ }`) 일반적으로 `err`는 `null`로 설정된 에러를 가지고 호출하며 truthy 확인을 사용합니다.

```ts
fs.readFile('someFile', 'utf8', (err, data) => {
    if (err) {
        // do something
    } else {
        // no error
    }
})
```

자신의 API를 만들때 일관성을 위해서 `null`을 사용하는게 좋습니다. 자신의 모든 API에 대해서 에러를 `.then` vs. `.catch`를 사용해서 처리해야 합니다.

### `undefined`를 유효성을 나타내는 수단으로 사용하지 마십시요.

예를 들어 이런 끔찍한 함수가 있습니다.

```ts
function toInt(str: string) {
  return str ? parseInt(str) : undefined;
}
```

이렇게 쓰는게 더 좋을 수 있습니다.
can be much better written like this:

```ts
function toInt(str: string): { valid: boolean; int?: number } {
    const int = parseInt(str)
    if (isNaN(int)) {
        return { valid: false }
    } else {
        return { valid: true, int }
    }
}
```

### JSON 그리고 serialization

JSON 표준은 null인코딩을 지원하지만 정의되지는 않습니다. JSON이 `null`속성으로 객체를 인코딩할때 값으로 포함되는 반면에 `undefined`는 제외됩니다.

```ts
JSON.stringify({ willStay: null, willBeGone: undefined }) // {"willStay":null}
```

결과는 JSON 기반 데이터베이스는 `null`값을 지원하지만 `undefined`는 지원하지 않습니다. 속성값을 `null`을 이용하여 속성을 지울 수 있습니다.

속성값을 `undefined`를 이용하면 저장소 비용을 절약할 수 있습니다. 하지만 의미론적으로 볼때 이러한 방법은 더 복잡하게 만들 수 있습니다.

### 결론

타입스크립트팀은 `null`을 사용하지 않습니다. [타입스크립트 코딩 가이드](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined) 그럼에도 아무런 문제가 발생하지 않았습니다. 더글락스 크록포드는 `null`을 사용하는 것이 안좋은 생각이라고 말했습니다. [`null`을 사용하지 말아야 할 이유](https://www.youtube.com/watch?v=PSGEjv3Tqo0&feature=youtu.be&t=9m21s) 우리는 모두 `undefined`을 사용해야 합니다.

그러나 NodeJS 스타일 코드는 에러 매개변수를 `null`을 표준으로 사용합니다. 나는 개인적으로 두 프로젝트를 구별하는 것을 신경쓰지 않습니다. 대부분의 프로젝트가 서로 다른 라이브러리를 사용하고 `== null`로 배제하기 때문입니다.
