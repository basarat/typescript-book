# Your JavaScript is TypeScript

자바스크립트 컴파일러 일부 구문에 많은 경쟁자가 있었고 앞으로도 그럴 것 입니다.
타입스크립트는 자바스크립트와 차이점은 다음 다이어그램을 보시면 알수 있습니다.

![자바스크립트와 타입스크립트 차이](https://raw.githubusercontent.com/basarat/typescript-book/master/images/venn.png)

좋은 소식은 자바스크립트를 배워야 함을 의마합니다. 타입스크립트는 자바스크립트에서 좋은 문서를 제공하는 모든 방법을 표준화 하고 있습니다.

-   새로운 구문을 제공한다고 해서 버그를 수정하는데 도움이 되지 않습니다.(예: 커피스크립트)
-   새로운 언어를 만들면 런타임, 커뮤니티에서 너무 멀어집니다. (예: Dart언어)

타입스크립트는 문서가 있는 자바스크립트 입니다.

## 더 나은 자바스크립트 개발을 위한

타입스크립트는 작동하지 않는 자바스크립트 코드로 부터 사용자를 보호해줍니다. (따라서 다음과 같은 코드를 기억할 필요가 없습니다.)

```ts
;[] + [] // JavaScript will give you "" (which makes little sense), TypeScript will error

//
// other things that are nonsensical in JavaScript
// - don't give a runtime error (making debugging hard)
// - but TypeScript will give a compile time error (making debugging unnecessary)
//
{
}
;+[] // JS : 0, TS Error
;[] + {} // JS : "[object Object]", TS Error
{
}
;+{} // JS : NaN or [object Object][object Object] depending upon browser, TS Error
'hello' - 1 // JS : NaN, TS Error

function add(a, b) {
    return
    a + b // JS : undefined, TS Error 'unreachable code detected'
}
```

기본적으로 타입스크립트는 자바스크립트의 lint역할을 수행합니다.
타입 정보가 없는 자바스크립트보다 타입스크립트가 lint역할을 더 잘 수행합니다.

## 여전히 자바스크립트는 배울 필요가 있습니다.

타입스크립트는 자바스크립트를 작성한다는 사실에 대해 매우 실용적이므로 자바스크립트에 대해 알아야 할 사항이 있습니다. 다음장에서 그것들에 대해서
논의해보려고 합니다.

> Note: 타입스크립트는 자바스크립트의 슈퍼셋입니다. 컴파일러에서 실제로 사용할 수 있는 문서만 있으면 됩니다.
