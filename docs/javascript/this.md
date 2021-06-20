## this

함수 내에서 `this` 키워드에 대한 접근은 실제로 함수가 호출되는 방법에 의해 제어됩니다. 일반적으로 "호출 컨텍스트"라고 합니다.

예제:

```ts
function foo() {
    console.log(this)
}

foo() // logs out the global e.g. `window` in browsers
let bar = {
    foo
}
bar.foo() // Logs out `bar` as `foo` was called on `bar`
```

`this`를 사용하기전에 명심할게 있습니다. 클래스에서 이 기능을 호출 컨텍스트에서 분리하려면 화살표 함수를 사용해야 합니다, [화살표 함수에 대해서 더 알아보기][arrow].

[arrow]: ../arrow-functions.md
