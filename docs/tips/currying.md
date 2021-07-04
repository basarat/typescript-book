## 커링(Currying)

굵은 화살표 함수를 연속해서 사용하세요:

```ts
// 커리 함수
let add = (x: number) => (y: number) => x + y;

// 간단한 사용
add(123)(456);

// 부분 적용
let add123 = add(123);

// 함수 전체 적용
add123(456);
```
