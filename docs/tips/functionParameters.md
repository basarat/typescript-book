# 함수 매개변수

매개변수가 너무 많은 함수가 있거나 같은 타입의 매개변수가 여러 개 있다면, 함수가 객체를 받도록 바꾸는 것을 고려해볼 수 있습니다. 

다음 함수를 보세요:

```ts
function foo(flagA: boolean, flagB: boolean) {
  // 당신의 멋진 함수 내용
}
```

함수가 이렇게 선언되어 있으면 `foo(flagB, flagA)` 같은 식으로 잘못된 값으로 호출하기가 아주 쉽고 이때 컴파일러는 아무런 도움도 못 줍니다.

대신 함수가 객체를 받도록 바꿔보세요: 

```ts
function foo(config: {flagA: boolean, flagB: boolean}) {
  const {flagA, flagB} = config;
  // 당신의 멋진 함수 내용
}
```
이제 함수 호출은 `foo({flagA, flagB})` 이런 모양이 될테고, 실수를 발견하고 코드 리뷰하기가 더 쉬워집니다.

> 참고 : 함수가 충분히 간단하고 문제 가능성이 낮아 보이는 경우라면 이 조언은 무시해도 됩니다 🌹.
