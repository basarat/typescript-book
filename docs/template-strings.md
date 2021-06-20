### Template Literals (Template Strings)
템플릿 문자열은 백틱 구문을 사용해야 합니다. ', '' 대신에 사용할 수 있습니다. 템플릿 문자열은 아래 3가지의 장점이 있습니다.

-   문자열 보간법
-   다중라인 문자열
-   태그 사용

#### String Interpolation
다른 흔한 사용처는 정적 문자열에 변수를 + 해서 문자열을 만드는 경우입니다. 여기에는 약간의 *템플릿 적용 로직*이 들어가야 하기 때문에 이 기능이 *템플릿 문자열(template strings)*이라고 불리게 되었습니다. 이후 공식 명칭은 *템플릿 리터럴(template literal)*로 정해졌습니다. 여기 예전 방식으로 html 문자열을 만드는 경우가 나와 있습니다:

```ts
var lyrics = 'Never gonna give you up'
var html = '<div>' + lyrics + '</div>'
```

템플릿 문자열을 사용하면 아래와 같이 작성할 수 있습니다.

```ts
var lyrics = 'Never gonna give you up'
var html = `<div>${lyrics}</div>`
```

`${` 이 안에 `}` 자바스크립트 문법에 맞는 것을 삽입하면 됩니다.

```ts
console.log(`1 and 1 make ${1 + 1}`)
```

#### Multiline Literals
JavaScript에서 문자열 안에 줄바꿈을 넣고 싶은 적이 있지 않았나요? 노래 가사를 표시한다거나 할때? 그럴려면 *리터럴 개행 문자를 이스케이프* 처리해서 넣어야 하는데, 우리의 친숙한 이스케이프 문자 `\`를 사용하여 문자열 안에 일일히 줄마다 개행 문자 `\n`를 넣었어야 했습니다. 아래 처럼:

```ts
var lyrics =
    'Never gonna give you up \
\nNever gonna let you down'
```

타입스크립트를 사용하여 템플릿 문자열을 사용하면 아래와 같이 개행을 손쉽게 적용할 수 있습니다.

```ts
var lyrics = `Never gonna give you up
Never gonna let you down`
```

#### Tagged Templates

당신은 `tag`를 사용하기 위해서는 아래와 같은 함수를 사용해야 합니다. 템플릿 문자열을 이용하면 태그를 리턴할 수 있습니다.

-   모든 정적 리터럴내에 있는 배열을 첫번째 매개변수에 할당됩니다.
-   모든 값은 남아있는 매개변수에 할당됩니다. 가장 일반적으로 나머지 매개변수를 사용하여 배열로 변환합니다.

`htmlEscape` 함수는 html 태그를 이스케이프 처리하는 예제입니다.

```ts
var say = 'a bird in hand > two in the bush'
var html = htmlEscape`<div> I would just like to say : ${say}</div>`

// a sample tag function
function htmlEscape(literals: TemplateStringsArray, ...placeholders: string[]) {
    let result = ''

    // interleave the literals with the placeholders
    for (let i = 0; i < placeholders.length; i++) {
        result += literals[i]
        result += placeholders[i]
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
    }

    // add the last literal
    result += literals[literals.length - 1]
    return result
}
```

> 당신은 `placeholders`를 사용할때 `[]`를 사용해야 합니다. 타입스크립트는 타입체크를 할때 사용하는 타입이 주석과 일치하는지 확인합니다. `...placeholders:(string | number)[]` 이것은 문자열 혹은 숫자인 주석을 나타냅니다.

#### Generated JS

ES6 컴파일러는 꽤 단순하게 동작합니다. 다중 문자열을 컴파일 합니다. 문자열 보간법을 이용하면 다중 문자열을 연속적으로 컴파일 합니다.

#### Summary

다중 문자열 그리고 문자열 보간법은 모든 언어로 사용하는 것이 좋습니다. 당신은 자바스크립트, 타입스크립트에서 지금 사용할 수 있습니다. 태그도 템플릿 문자열로 전달할 수 있습니다.
