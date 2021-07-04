# TypeScript의 정적 생성자

TypeScript `class` 는 (JavaScript `class` 와 마찬가지로) 정적 생성자를 가질 수 없습니다. 하지만 같은 스타일로 호출해주기만 하면 거의 동일한 효과를 쉽게 얻을 수 있습니다: 

```ts
class MyClass {
    static initialize() {
        // 초기화
    }
}
MyClass.initialize();
```
