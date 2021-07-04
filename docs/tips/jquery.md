## JQuery 팁

참고: 이 팁을 사용하려면 `jquery.d.ts` 파일을 설치해야 합니다

### 빠르게 새 플러그인을 만들기

다음과 같은 내용으로 `jquery-foo.d.ts` 파일을 만드세요: 

```ts
interface JQuery {
  foo: any;
}
```

그러면 `$('something').foo({whateverYouWant:'hello jquery plugin'})` 같은 식으로 사용할 수 있습니다.
