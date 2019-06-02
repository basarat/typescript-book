### Rest Parameters

나머지 연산자는 (`...argumentName`을 이용해서) 여러개의 인자를 배열로 받습니다. 아래에 이것에 대한 예제가 있습니다.

```ts
function iTakeItAll(first, second, ...allOthers) {
    console.log(allOthers)
}
iTakeItAll('foo', 'bar') // []
iTakeItAll('foo', 'bar', 'bas', 'qux') // ['bas','qux']
```

나머지 연산자는 어떠한 형태의 함수에서도 사용 가능합니다. `function`/`()=>`/`class member`.
