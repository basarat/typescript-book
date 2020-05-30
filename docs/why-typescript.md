# 왜 타입스크립트인가?

타입스크립트를 쓰는데는 크게 두가지 목적이 있습니다:

-   자바스크립트에 타입 시스템을 선택해서 적용이 가능하다.
-   자바스크립트 엔진까지 향후 계획된 기능을 제공합니다.

아래의 글을 읽어보면 동기부여에 도움이 됩니다.

## 타입스크립트 타입 시스템

여러분은 자바스크립트에 왜 타입을 추가해야 하는지 모를수 있습니다.

구글, 마소, 페이스북 같은 거대 기업들이 타입을 사용함으로써 코드퀄리티와 가독성을 높일 수 있다는 게 입증되었습니다.

-   리팩토링을 수행할때 컴파일 단계에서 타입으로 인해 에러를 발견하는 게 런타임에서 발견하는 것 보다 낫습니다.
-   함수의 시그니처에 타입을 이용하면 최고의 웹 페이지를 만들 수 있습니다.

아래의 항목을 통해서 타입스크립트에 쉽게 적응할 수 있게 도와줄 것 입니다.

### 자바스크립트는 타입스크립트입니다.

타입스크립트는 자바스크립트에 컴파일시 타입안정성을 제공합니다. 타입스크립트라는 이름을 생각해보면 놀라운일이 아닙니다. 좋은 점은 타입은 선택적으로 적용할 수가 있다는 점 입니다. 자바스크립트 파일이름을 `.js` 에서 `.ts` 로 바꾸고 사용하면 타입스크립트를 사용할 수 있습니다. 타입스크립트는 `.js` 파일을 반환하며 이것은 자바스크립트와 동일합니다. 타입스크립트는 타입 확인을 하며 이것은 자바스크립트의 superset에 해당합니다.

### 타입은 암시적으로 적용될 수 있습니다.

타입스크립트는 코드 개발중에 최소한의 비용으로 타입 안정성을 제공합니다. 아래의 예를 보면 변수에 타입을 지정하지는 않았지만 `number` 처음에 선언된 값과 다른 타입을 대입했을때 타입시스템이 이를 추론합니다.

```ts
var foo = 123
foo = '456' // Error: cannot assign `string` to `number`

// Is foo a number or a string?
```

이러한 방식은 타입을 잘 유추해 냅니다. 위 예제처럼 `foo` 변수에 `number` 또는 `string`. 을 재할당 했을 때 타입시스템이 정확한 타입을 추론하지 못하는 경우가 발생합니다 나중에 타입을 유추하는 규칙에 대해서 살펴보도록 하겠습니다.

### 타입을 명시적으로 사용할 수 있습니다.

이전에 말했듯이 타입스크립트는 안전하게 추론할 수 있는 만큼 추론을 할 것 입니다.

1. 코드를 읽어야 하는 다음 개발자를 위해 문서화 합니다.
2. 코드에 대한 이해는 코드의 알고리즘 분석과 일치합니다.

타입스크립트는 선택적으로 접미사 유형 주석을 사용합니다.

```ts
var foo: number = 123
```

따라서 잘못된 경우 컴파일러에서 에러를 출력합니다.

```ts
var foo: number = '123' // Error: cannot assign a `string` to a `number`
```

타입스크립트에서 지원하는 모든 주석 구문에 대한 자세한 내용은 다음장부터 다룰 것 입니다.

### 타입 구조

일부 언어에서 정적 타입 시스템은 코드가 잘 작동하더라도 불필요한 코드를 필요로 합니다. 타입스크립트는 자바스크립트 개발자가 인지과부하가 가장 적게 일어나면서 배울수 있는 타입 구조 입니다. 이 오리 타이핑은 타입스크립트가 일류 언어 라는 것을 의미합니다. 다음 예시를 참고하십시오. 다음 함수 `iTakePoint2D` 어떤 것도 포함할 수 있고 (`x` 와 `y`) 는 반드시 포함하고 있어야 합니다.

```ts
interface Point2D {
    x: number
    y: number
}
interface Point3D {
    x: number
    y: number
    z: number
}
var point2D: Point2D = { x: 0, y: 10 }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) {
    /* do something */
}

iTakePoint2D(point2D) // exact match okay
iTakePoint2D(point3D) // extra information okay
iTakePoint2D({ x: 0 }) // Error: missing information `y`
```

### 타입 에러 발생시 자바스크립트를 반환하지 않음

자바스크립트 코드를 쉽게 타입스크립트 코드로 마이그레이션 할수 있도록 합니다, 컴파일 오류가 있더라도 타입스크립트는 자바스크립트 코드를 최대한 반환합니다.

```ts
var foo = 123
foo = '456' // Error: cannot assign a `string` to a `number`
```

다음 자바스크립트를 반환합니다.

```ts
var foo = 123
foo = '456'
```

따라서 자바스크립트 코드를 점차 타입스크립트 코드로 업그레이드 할 수 있습니다. 이것은 다른 언어 컴파일러 작동방식과 매우 다르며 타입스크립트로 옮길 또다른 이유입니다.

### 주변 타입

타입스크립트의 주요 설계 목표는 기존 자바스크립트 라이브러리를 안전하고 쉽게 사용하는 게 목표였습니다. 타입스크립트는 선언을 통해 이를 수행합니다. 타입스크립트는 얼마나 많이 또는 적은 노력을 기울이는지에 대해 슬라이딩 스케일을 제공하며 더 많은 타입 안정성과 정보를 제공합니다. 대부분의 인기있는 라이브러리는 [DefinitelyTyped community](https://github.com/borisyankov/DefinitelyTyped) 에 의해 작성되었습니다.

1. 정의파일이 이미 있음.
2. 또는 잘 검토된 타입스크립트 템플릿 목록이 이미 있습니다.

선언파일을 작성하는 간단한 예로 제이쿼리의 간단한 예제를 고려해 보십시요. [jquery](https://jquery.com/). 기본적으로 타입스크립트는 변수를 사용하기전에 선언해야 합니다.

```ts
$('.awesome').show() // Error: cannot find name `$`
```

빠른 해결방법으로 타입스크립트에 `$`을 있다는 것을 알리면 됩니다.

```ts
declare var $: any
$('.awesome').show() // Okay!
```

기본정보를 기반으로 구축하고 오류로부터 사용자에게 도움이 되는 추가 정보를 제공할 수 있습니다.

```ts
declare var $: {
    (selector: string): any
}
$('.awesome').show() // Okay!
$(123).show() // Error: selector needs to be a string
```

타입스크립트에 대해 자세히 알고 나면 (예: `interface`, `any`) 기존 자바스크립트에 타입스크립트 정의를 만드는 방법을 설명합니다.

## 자바스크립트의 미래는 타입스크립트

타입스크립트는 자바스크립트의 엔진에 대해 계획된 많은 기능을 제공합니다. 이러한 기능을 적극적으로 추가하고 있으며 이는 시간이 지남에 따라 더욱
커질 것 입니다. 아래는 그 예 입니다.

```ts
class Point {
    constructor(public x: number, public y: number) {}
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y)
    }
}

var p1 = new Point(0, 10)
var p2 = new Point(10, 20)
var p3 = p1.add(p2) // { x: 10, y: 30 }
```

그리고 사랑스러운 화살표 함수

```ts
var inc = x => x + 1
```

### 요약

이 섹션에서는 타입스크립트의 동기부여와 목표를 제공하였습니다.
이것을 벗어나서 우리는 타입스크립트의 핵심세부사항들을 파헤칠 수 있습니다.

[](Interfaces are open ended)
[](Type Inference rules)
[](Cover all the annotations)
[](Cover all ambients : also that there are no runtime enforcement)
[](.ts vs. .d.ts)
