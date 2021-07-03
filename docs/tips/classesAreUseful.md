## 클래스는 유용함

아래와 같은 구조가 매우 자주 나옵니다:

```ts
function foo() {
    let someProperty;

    // 다른 초기화 코드

    function someMethod() {
        // `someProperty` 속성을 사용해서 어떤 작업을 하고
        // 이외 다른 작업도 하게 됨
    }
    // 다른 메소드도 있을 수 있음

    return {
        someMethod,
        // 다른 메소드도 있을 수 있음
    };
}
```

이것은 *모듈 노출 패턴* 이라고 불리며 JavaScript 에서 매우 자주 보입니다 (JavaScript 클로저를 활용하는 것).

만약 [*파일 모듈* 을 사용한다고 해도 (글로벌 스코프를 사용하는 것은 나쁘므로 꼭 이렇게 해야)](../project/modules.md) *결과적으로 동일한 파일* 이 나옵니다. 그렇지만 사람들이 아래처럼 코드를 작성하는 경우도 아주 많습니다:

```ts
let someProperty;

function foo() {
   // 다른 초기화 코드
}
foo(); // 다른 초기화 코드

someProperty = 123; // 또 다른 초기화

// 익스포트되지 않는 유틸리티 함수들

// later
export function someMethod() {

}
```

필자는 상속을 그렇게 많이 좋아하지는 않지만 *클래스를 사용하게 하면 사람들이 코드를 더 잘 정리한다는 것을 경험했습니다*. 위 코드를 작성했던 개발자는 직관적으로 아래와 같이 바꿨을 것입니다:

```ts
class Foo {
    public someProperty;

    constructor() {
        // 다른 초기화 코드
    }

    public someMethod() {
        // 다른 코드
    }

    private someUtility() {
        // 다른 코드
    }
}

export = new Foo();
```

일반 개발자에게만 도움이 되는게 아니라, 클래스에 대해 멋진 시각화를 제공해주는 개발 툴들이 많이 만들어지고 있고 팀에서 고민하고 관리해야 할 패턴이 하나 더 줄어드는 효과도 있습니다.

> PS: 필자는 많이 재사용되고 공통 코드를 많이 줄여주는 *얕은* 클래스 계층 구조에는 아무 문제도 없다고 생각합니다.
