* [파라미터 annotations](#파라미터-annotations)
* [리턴 타입 Annotation](#리턴-타입-annotation)
* [선택적 파라미터](#선택적-파라미터)
* [오버로딩](#오버로딩)

## 함수
타입스크립트의 타입 시스템은 함수에 대한 애정이 많아서, 결과적으로 함수는 구성 자유도가 높은(composable) 시스템의 주요 구성요소가 되었습니다.

### 파라미터 annotations
다른 변수에 타입주석(type annotaions)을 달수 있는것 처럼, 함수 파라미터도 타입주석을 달수 있습니다:

```ts
// 변수 annotation
var sampleVariable: { bar: number }

// 함수 파라미터 annotation
function foo(sampleParameter: { bar: number }) { }
```

여기에서는 인라인 타입 주석을 예로 들었는데, 인터페이스 등도 사용할 수 있습니다.

### 리턴 타입 annotations

변수에 타입 주석을 다는 것과 같은 스타일로 함수 파라미터 목록 다음에 리턴 타입 주석을 달수 있습니다. 예를 들면, 아래 예제에서 `: Foo` 처럼 작성합니다.

```ts
interface Foo {
    foo: string;
}

// 리턴 타입 annotation을 `: Foo`로 달았습니다
function foo(sample: Foo): Foo {
    return sample;
}
```

여기서 `인터페이스`를 사용했지만, 다른 주석도 당연히 자유롭게 사용가능합니다. 예를 들면, 인라인 주석등입니다.

컴파일러가 쉽게 추론할 수 있는 함수의 리턴 타입에는 주석을 *달지 않는* 것도 아주 자연스러운 일입니다. 

```ts
interface Foo {
    foo: string;
}

function foo(sample: Foo) {
    return sample; // 추론된 리턴 타입은 'Foo'
}
```

하지만, 에러를 감지하는 데 도움되도록 주석을 다는 것도 일반적으로 좋은 생각입니다. 예를 들면:


```ts
function foo() {
    return { fou: 'John Doe' }; // 늦기전에 이것이 `foo`의 철자 오류임을 아는 것은 매우 어렵습니다
}

sendAsJSON(foo());
```

함수에서 아무것도 리턴할 계획이 없다면, `:void`로 주석을 달 수 있습니다. `:void`를 달지않고 추론 엔진(inference engine)에 맡겨두는 것도 나쁘진 않습니다.

### 선택적 파라미터
파라미터를 선택적(optional)이라고 표시할 수 있습니다:

```ts
function foo(bar: number, bas?: string): void {
    // ..
}

foo(123);
foo(123, 'hello');
```

다른 방법으로, (파라미터 선언 다음에 `= someValue`를 추가하여) 파라미터에 기본값을 제공할 수도 있습니다. 이 방법으로 caller가 인자(argument)를 제공하지 않더라도 값을 주입할 수 있습니다. 

```ts
function foo(bar: number, bas: string = 'hello') {
    console.log(bar, bas);
}

foo(123);           // 123, hello
foo(123, 'world');  // 123, world
```

### 오버로딩
* 역자주 : 오버로딩은 `함수 분신`이라고 번역하는 게 좋지 않을까 반쯤 진지하게 생각합니다. 보통 닌자가 분신술을 쓴다고 할 때 바로 그 `분신` 말입니다. 아래 영어 본문 내용에 `true representaion`, `true decalartion`, `true nature` 라는 말이 나오는 데 다른 오버로딩은 `분신`, true 붙은 것은 `본체`, `본성`으로 치환해서 생각해보면 의미가 빨리 와 닿더군요... 

타입스크립트에서 함수 오버로드를 *선언* 할 수있습니다. 이 것은 문서화 + 타입 보안(type safety) 목적에서 유용합니다. 아래 코드에 대해 생각해보십시오: 

```ts
function padding(a: number, b?: number, c?: number, d?: any) {
    if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a;
    }
    else if (c === undefined && d === undefined) {
        c = a;
        d = b;
    }
    return {
        top: a,
        right: b,
        bottom: c,
        left: d
    };
}
```


코드를 주의깊게 보면, `a`,`b`,`c`,`d`의 의미가 전달되는 인자의 수에 따라 변화한다는 것을 알수 있습니다. 또한 위 함수는 `1개`, `2개` 혹은 `4개` 인자만 예상하고 있습니다.이러한 조건은 함수 오버로딩으로 *강제되고 문서화 될* 수 있습니다. 단지 함수 헤더(function header)만 여러번 선언하면 됩니다. 마지막 함수 헤더는 함수 바디 *내부에서는* 유효하지만 밖에서는 효과가 없습니다.  

아래 예제를 보세요:

```ts
// Overloads
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
// 함수 바디가 다뤄야 하는 모든 케이스가 반영된 본체의 실제 구현 
function padding(a: number, b?: number, c?: number, d?: number) {
    if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a;
    }
    else if (c === undefined && d === undefined) {
        c = a;
        d = b;
    }
    return {
        top: a,
        right: b,
        bottom: c,
        left: d
    };
}
```

여기에서 처음 3개 함수 헤더가 `padding`에 대한 유효한 호출로 판단됩니다:

```ts
padding(1); // Okay: all
padding(1,1); // Okay: topAndBottom, leftAndRight
padding(1,1,1,1); // Okay: top, right, bottom, left

padding(1,1,1); // Error: 해당되는 오버로딩이 없음 
```

(함수 내부를 봐서 알수 있듯이 분신이 아닌 진정한 본체인)마지막 선언이 다른 모든 오버로드와 호환되는 것은 당연히 중요한 요소입니다. 이 마지막 선언이 그 함수 바디가 책임 져야할 해당 함수의 진정한 본성이기 때문입니다.

> 타입스크립트의 함수 오버로딩은 런타임 오버헤드없이 구현됩니다. 이 기능은 단지 당신이 함수를 호출할 때 예상하는 방식을 문서화 하도록 하고, 컴파일러가 당신의 코드를 체크할 수 있도록 할 뿐입니다.

### 함수 선언하기
> 간단 팁: *타입 선언(Type Declaration)* 만들어져 있는 구현물의 타입을 기술하는 방법을 말합니다. 

함수 구현 내용이 없이 타입을 *선언*하는 방법은 두 가지가 있습니다. 예를 들면:

```ts
type LongHand = {
    (a: number): number;
};

type ShortHand = (a: number) => number;
```
위 두 예제는 *완전히* 동등합니다. 차이점은 오버로드를 추가하려고 할 때 발생합니다. 오버로드는 롱핸드 선언의 버전에서만 추가할 수 있습니다, 예:

```ts
type LongHandAllowsOverloadDeclarations = {
    (a: number): number;
    (a: string): string;
};
```

[](### 타입 호환성)
