## 속성 세터(setter)는 제한적으로 사용

세터(setter)/게터(getter) 말고 명시적인 함수 (예: `setBar`, `getBar` 함수)를 사용하는 것이 좋습니다.

다음 코드를 보세요:

```ts
foo.bar = {
    a: 123,
    b: 456
};
```

게터/세터 대신:

```ts
class Foo {
    a: number;
    b: number;
    set bar(value:{a:number,b:number}) {
        this.a = value.a;
        this.b = value.b;
    }
}
let foo = new Foo();
```

이것은 속성 세터를 사용하는 *좋은* 예가 아닙니다. 첫번째 코드 샘플을 읽는 사람은 무엇이 변경되는지 전체 맥락을 알 수 없습니다. 반면 `foo.setBar(value)` 라고 호출하는 사람은 자신이 `foo` 의 무언가를 변경하고 있다고 생각할 수 있을 것입니다.

> 보너스 포인트: 여러가지 함수를 사용하면 참조를 찾기도 더 쉽습니다. TypeScript 툴에서 게터 또는 세터의 레퍼런스를 찾으면 *두가지* 경우가 모두 나오게 되지만 명시적 함수 호출을 사용하면 원하는 함수에 대한 참조만 볼 수 있습니다.
