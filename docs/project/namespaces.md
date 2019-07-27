## Namespaces

네임스페이스는 자바스크립트에서 사용되는 일반적인 패턴에 대해 편리한 구문을 제공합니다.

````ts
;(function(something) {
    something.foo = 123
})(something || (something = {}))
``` 

근본적으로 `something || (something = {})` allows an anonymous function `function(something) {}`는 존재하는 하나의 객체 (the `something ||` portion) 또는 새로운 객체에 물건을 추가합니다. (the `|| (something = {})` portion) 즉 두개의 블록을 일부 실행 경계로 나눌수 있습니다.

```ts
;(function(something) {
    something.foo = 123
})(something || (something = {}))

console.log(something) // {foo:123}
;(function(something) {
    something.bar = 456
})(something || (something = {}))

console.log(something) // {foo:123, bar:456}
````

자바스크립트에서 흔하게 사용되는 전역 네임스페이스는 생성될때 사라집니다. 파일 기반 모듈을 사용하면 걱정하지 않아도 됩니다. 하지만 이 패턴은 여러 함수들 중에 group으로 묶는데 여전히 유용합니다. 그러므로 타입스크립트에서 `namespace` 키워드를 주입할때는 그룹으로 사용해야 합니다.

```ts
namespace Utility {
    export function log(msg) {
        console.log(msg)
    }
    export function error(msg) {
        console.error(msg)
    }
}

// usage
Utility.log('Call me')
Utility.error('maybe!')
```

`namespace` 키워드는 이전에 본것과 동일한 자바스크립트를 생성합니다.

```ts
;(function(Utility) {
    // Add stuff to Utility
})(Utility || (Utility = {}))
```

한가지 주목해야 할 것은 namespace가 중첩될 수 있으므로 `namespace Utility.Messaging`와 같은 작업을 통해 `Utility` 아래에 `Messaging`을 중첩 할 수 있습니다.

우리는 많은 프로젝트로 부터 추천받은 사용법은 외부 모듈을 사용하고 빠른 데모와 오래된 자바스크립트 코드 이식을 위해 `namespace` 사용을 권장합니다.
