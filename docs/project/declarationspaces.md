## Declaration Spaces

타입스크립트에서는 두가지 선언 공간이 있습니다. 변수 선언 공간과 타입 선언 공간이 있습니다. 이 개념은 아래에서 탐구됩니다.

### 타업 선언 공간

타입 선언 공간은 타입 annotation으로 사용할 수 있는 것을 포함합니다. 예: 타입들을 선언하는 방법을 제시합니다.

```ts
class Foo {}
interface Bar {}
type Bas = {}
```

즉 `Foo`, `Bar`, `Bas`을 타입 주석으로 사용할 수 있습니다.

```ts
var foo: Foo
var bar: Bar
var bas: Bas
```

당신은 `interface Bar`를 가지고 있긴 하지만 그것을 변수로 사용할 수 없습니다. 왜냐하면 그것은 변수 선언 공간에 기여하지 않기 때문입니다. 아래에 설명이 있습니다.

```ts
interface Bar {}
var bar = Bar // ERROR: "cannot find name 'Bar'"
```

`cannot find name`을 출력하는 이유로는 `Bar`는 변수 선언 공간에 정의되지 않았기 때문입니다. 다음 주제는 "변수 선언 공간" 입니다.

### 변수 선언 공간

변수 선언 공간은 변수로 사용할 수 있는 항목들이 들어있습니다. 우리는 앞에서 `class Foo`가 타입 선언 공간에 `Foo`를 제공한다는 것을 알았습니다. 또한 변수 선언 공간에 `Foo`를 제공하고 있습니다.
변수 선언 공간에는 변수를 사용할 수 있는 것들이 있습니다. 앞서 `class Foo` 가 *타입* 선언 공간에 `Foo` 라는 타입을 추가하는 것을 보았습니다. 그것뿐일까요? 아래에 보이는 것처럼 `Foo` 라는 변수를 *변수* 선언 공간에 추가합니다:

```ts
class Foo {}
var someVar = Foo
var someOtherVar = 123
```

때때로 클래스를 변수에 할당하고자 할때 훌륭한 방법입니다.

-   우리는 때때로 `interface`를 사용하지 못할수도 있습니다. 타입 선언 공간에서 `interface`와 같은 것을 변수로 사용할 수 없습니다.

마찬가지로 `var`로 선언한것은 그것은 오직 변수 선언 공간으로 사용되며 타입 annotation으로는 사용되지 않습니다.

```ts
var foo = 123
var bar: foo // ERROR: "cannot find name 'foo'"
```

`cannot find name` 메세지가 출력된 이유는 `foo` 가 타입 선언 공간에 선언되어 있지 않기 때문입니다.
