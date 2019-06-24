### for...of

이제 막 시작하는 자바스크립트 개발자들은 `for...in` 을 이용해서 배열을 순회할때 다음과 같은 일반적인 에러를 경험합니다. 아래 예제를 보면 `9,2,5`를 예상했지만 `0,1,2`를 출력합니다.

```ts
var someArray = [9, 2, 5]
for (var item in someArray) {
    console.log(item) // 0,1,2
}
```

타입스크립트 (그리고 ES6)에서 `for...of`를 사용하는 하나의 이유는 배열을 순회하면서 예상대로 해당 값을 반환하기 때문입니다.

```ts
var someArray = [9, 2, 5]
for (var item of someArray) {
    console.log(item) // 9,2,5
}
```

마찬가지로 타입스크립트는 `for...of` 를 사용할때 문자열을 사용해도 문제가 없습니다.

```ts
var hello = "is it me you're looking for?"
for (var char of hello) {
    console.log(char) // is it me you're looking for?
}
```

#### JS Generation

ES6와 타입스크립트 이전에 일반적인 수준에서 반복문은 `for (var i = 0; i < list.length; i++)` 이와같이 사용되었습니다. 아래 예제를 참고하십시요.

```ts
var someArray = [9, 2, 5]
for (var item of someArray) {
    console.log(item)
}

// becomes //

for (var _i = 0; _i < someArray.length; _i++) {
    var item = someArray[_i]
    console.log(item)
}
```

`for...of`를 사용하면 가독성이 좋아지고 코드의 양이 줄어든다는 것을 알수 있습니다. (그리고 변수 이름도 필요합니다.)

#### Limitations

만약 당신이 ES6 이상을 타겟팅하지 않으면 객체는 `length` 속성이 있다고 가정하고 객체가 숫자를 통해 색인화 될 수 있다고 가정합니다. `obj[2]`는 레거시 JS 엔진에서 `string`그리고 `array`에서만 동작합니다.

만약 타입스크립트를 사용할때 배열 혹은 문자열을 사용하지 않는다면 당신은 "is not an array type or a string type" 이와 같은 에러를 만날 것 입니다.

```ts
let articleParagraphs = document.querySelectorAll('article > p')
// Error: Nodelist is not an array type or a string type
for (let paragraph of articleParagraphs) {
    paragraph.classList.add('read')
}
```

`for...of`는 오직 배열 혹은 문자열에서만 사용할 수 있습니다. 이 제한사항은 이후 버전의 타입스크립트에서 제거될 수 있습니다.

#### Summary

당신은 `for...of`를 사용하면 다음에 코드를 검토하는 사람은 행복해 할 것 입니다.
