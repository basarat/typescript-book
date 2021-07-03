## 배열 생성

빈 배열을 만드는 것은 아주 간단합니다: 

```ts
const foo: string[] = [];
```

내용을 채워서 배열을 만들고 있다면 ES6 `Array.prototype.fill` 을 사용하세요: 

```ts
const foo: string[] = new Array(3).fill('');
console.log(foo); // ['','',''];
```

함수를 호출해서 길이가 정해져 있는 배열을 만들고 싶다면 스프레드 연산자(...)를 사용하세요: 

```ts
const someNumbers = [...new Array(3)].map((_,i) => i * 10);
console.log(someNumbers); // [0,10,20];
```
