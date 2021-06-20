# 인덱스 서명(Index Signature)

JavaScript에서 (따라서 TypeScript)에서 `Object`에 들어있는 다른 어떤 JavaScript **객체** 참조도 **문자열** 로 액세스할 수 있습니다.

간단한 예제:

```ts
let foo: any = {};
foo['Hello'] = 'World';
console.log(foo['Hello']); // World
```

우리는 `"World"`라는 문자열을 `"Hello"`라는 키로 저장했습니다. 다른 어떤 JavaScript **객체** 도 저장할 수 있다고 얘기했었죠, 그러니 이걸 확인할 수 있도록 클래스 인스턴스를 저장해 봅시다:

```ts
class Foo {
  constructor(public message: string){};
  log(){
    console.log(this.message)
  }
}

let foo: any = {};
foo['Hello'] = new Foo('World');
foo['Hello'].log(); // World
```

그리고 **문자열** 로 액세스 가능하다고 말한 것도 기억하세요. 인덱스 서명에 다른 타입의 객체을 넘기면 JavaScript 런타임이 실제로 그 객체에 대해 `.toString`을 호출합니다. 이것이 아래에 나와 있습니다:

```ts
let obj = {
  toString(){
    console.log('toString called')
    return 'Hello'
  }
}

let foo: any = {};
foo[obj] = 'World'; // toString called
console.log(foo[obj]); // toString called, World
console.log(foo['Hello']); // World
```

인덱스 위치에 `obj`가 사용될 때마다 `toString`이 호출된다는 점을 참고하세요.

배열은 약간 다릅니다. JavaScript VM은 `number` 인덱싱에 대해 최적화를 시도합니다 (그것이 실제 배열인지, 저장된 객체들의 구조가 일치하는 등에 따라). 그러므로 `number`도 (`string`과 다른 ) 별도의 유효한 객체 액세스 수단으로 생각해야 합니다. 여기 간단한 배열 예제가 있습니다:

```ts
let foo = ['World'];
console.log(foo[0]); // World
```

여기까지가 JavaScript입니다. 이제 TypeScript가 이 개념들을 어떻게 매끄럽게 처리하는지 살펴봅시다.

## TypeScript 인덱스 서명

먼저 JavaScript가 객체 인덱스 서명에 사용된 객체에 대해 *암묵적으로* `toString`를 호출하기 때문에 TypeScript는 초심자가 실수로 자기 발에 총을 쏘려 할 때 오류를 발생시킵니다 (필자는 Stackoverflow.com에서 사용자들이 자기 발을 쏘는 모습을 매일 봅니다):

```ts
let obj = {
  toString(){
    return 'Hello'
  }
}

let foo: any = {};

// 오류: 인덱스 서명은 string, number 여야 함...
foo[obj] = 'World';

// FIX: TypeScript는 명시적으로 호출하게 강제함
foo[obj.toString()] = 'World';
```

사용자가 명시적으로 처리하게 하는 이유는 대개 객체의 기본 `toString` 구현이 엉망이기 때문입니다. 예를 들어, v8은 항상
 `[object Object]`를 반환합니다:

```ts
let obj = {message:'Hello'}
let foo: any = {};

// 오류: 인덱스 서명은 string, number 여야 함...
foo[obj] = 'World';

// 실제 저장 위치가 이렇게 됨!
console.log(foo["[object Object]"]); // World
```

당연히 `number`가 지원됩니다, 왜냐하면

1. Array / Tuple을 잘 지원하기 위해 필요합니다.
1. `obj`의 기본 `toString` 구현으로 숫자를 사용하는 건 쓸만 합니다 (`[object Object]` 보다는).

2번이 아래에 나와 있습니다:

```ts
console.log((1).toString()); // 1
console.log((2).toString()); // 2
```

그러므로 교훈 1:

> TypeScript 인덱스 서명은 반드시 `string` 또는 `number` 여야 함

간단 참고: `symbols`도 유효하고 TypeScript에서 지원됩니다. 하지만 거기까진 가지 말기로 하죠. 조금씩 알아가기로.

### 인덱스 서명 선언하기

지금까지 우리는 `any`를 사용하여 TypeScript에게 우리 마음대로 하고 싶다고 말해 왔습니다. 우리는 *인덱스* 서명을 명시적으로 지정할 수 있습니다. 예를 들어, 문자열을 사용하여 객체에 저장된 것들은 `{message: string}` 구조를 준수하길 바랄 수 있습니다. 이것은 `{ [index:string] : {message: string} }` 선언으로 할 수 있습니다. 아래에 나와 있습니다:

```ts
let foo:{ [index:string] : {message: string} } = {};

/**
 * 정의된 구조에 맞는 것들만 저장
 */
/** Ok */
foo['a'] = { message: 'some message' };
/** 오류: 타입이 string인 `message`가 있어야 함. `message` 부분에 오타 존재  */
foo['a'] = { messages: 'some message' };

/**
 * 내용을 읽을 때도 타입 검사가 이루어짐
 */
/** Ok */
foo['a'].message;
/** 오류: messages는 존재하지 않음. `message` 부분에 오타 존재 */
foo['a'].messages;
```

> 팁: 인덱스 서명의 이름, 즉 `{ [index:string] : {message: string} }`에서 `index`는 TypeScript에서 아무 의미가 없으며 가독성을 위해 넣는 내용입니다, 예를 들어, 사용자 이름이라면 코드를 보게 될 다음 개발자의 이해를 돕기 위해 `{ [username:string] : {message: string} }`라고 적을 수도 있습니다 (그 다음 개발자는 바로 당신이 될 수도).

당연히 `number` 인덱스도 지원됩니다. 예를 들어 `{ [count: number] : SomeOtherTypeYouWantToStoreEgRebate }`

### 모든 구성원은 `string` 인덱스 서명을 준수해야

`string` 인덱스 서명을 만들면 모든 명시적인 구성원은 인덱스 서명을 준수해야 합니다. 아래에 나와 있습니다:

```ts
/** 오케이 */
interface Foo {
  [key:string]: number;
  x: number;
  y: number;
}
/** 오류 */
interface Bar {
  [key:string]: number;
  x: number;
  y: string; // 오류: `y` 속성은 number 타입이어야 함
}
```

이를 통해 안전성이 제공되고 어떤 문자열로 액세스해도 같은 결과가 나오게 됩니다:

```ts
interface Foo {
  [key:string]: number;
  x: number;
}
let foo: Foo = {x:1,y:2};

// 직접
foo['x']; // number

// 간접
let x = 'x'
foo[x]; // number
```

### 제한된 문자열 리터럴 집합 사용

*타입 매핑(Mapped Type)* 을 사용하여 인덱스 서명에서 인덱스 문자열이 리터럴 문자열 유니온의 구성원이 되게 할 수 있습니다. 예를 들면:

```ts
type Index = 'a' | 'b' | 'c'
type FromIndex = { [k in Index]?: number }

const good: FromIndex = {b:1, c:2}

// 오류:
// 타입 '{ b: number; c: number; d: number; }'은 타입 'FromIndex'에 할당 불가능.
// 객체 리터럴은 알려진 속성만 지정할 수 있고 'd'는 'FromIndex' 타입에 존재하지 않음.
const bad: FromIndex = {b:1, c:2, d:3};
```

종종 `keyof typeof`와 함께 사용하여 타입의 구성 단어를 추출할 수도 있습니다. 이 내용은 다음 페이지에서 설명합니다.

> 역주: [리터럴(Literal)](docs/types/literal-types.md) 단원 참고

구성 단어의 명세는 제네릭한 방법으로 도출할 수도 있습니다:

```ts
type FromSomeIndex<K extends string> = { [key in K]: number }
```

### 인덱서로 `string`과 `number` 둘 다 사용

일반적인 사용법은 아니지만 TypeScript 컴파일러는 이것도 지원합니다.

그렇지만 `string` 인덱서가 `number` 인덱서보다 더 구체적이어야 한다는 제약이 있습니다. 이것은 의도적인 것으로, 아래와 같이 타입을 정의할 수 있게 하기 위함입니다:

```ts
interface ArrStr {
  [key: string]: string | number; // 모든 구성원을 수용해야 함

  [index: number]: string; // string 인덱서의 일부만 수용 가능

  // 그냥 예제 멤버
  length: number;
}
```

### 디자인 패턴: 중첩 인덱스 서명

> 인덱스 서명을 추가할 때 API 고려 사항

매우 빈번하게 JS 커뮤니티에서 문자열 인덱서를 남용하는 API 들을 볼 수 있습니다. 예를 들어, JS 라이브러리에서 CSS를 다루는 흔한 패턴:

```ts
interface NestedCSS {
  color?: string;
  [selector: string]: string | NestedCSS | undefined;
}

const example: NestedCSS = {
  color: 'red',
  '.subclass': {
    color: 'blue'
  }
}
```

이런 식으로 문자열 인덱서와 *유효한* 값을 섞어서 쓰지 마세요. 이러면 오타가 발생해도 검출이 안됩니다:

```ts
const failsSilently: NestedCSS = {
  colour: 'red', // `colour`는 유효한 문자열 인덱서이므로 오류 아님
}
```

대신 중첩된 내용을 `nest` (아니면 `children` 아니면 `subnodes` 등) 같은 별도 이름 속성으로 분리하는 것이 좋습니다:

```ts
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: NestedCSS;
  }
}

const example: NestedCSS = {
  color: 'red',
  nest: {
    '.subclass': {
      color: 'blue'
    }
  }
}

const failsSilently: NestedCSS = {
  colour: 'red', // TS 오류: 정의되지 않은 속성 `colour`
}
```

### 인덱스 서명에서 특정 속성 제외시키기

때로는 여러 속성을 한 인덱스 서명으로 합쳐야 할 수 있습니다. 추천하는 방법은 아니고, 대신 앞서 설명한 중첩 인덱스 서명 패턴을 사용하는 것이 *맞습니다*.

그렇지만 *기존 JavaScript* 를 모델링하는 경우라면 교차 타입으로 해결할 수 있습니다. 다음은 교차 타입을 사용하지 않은 경우에 발생하는 오류를 보여줍니다:

```ts
type FieldState = {
  value: string
}

type FormState = {
  isValid: boolean  // 오류: 인덱스 서명을 준수하지 않음
  [fieldName: string]: FieldState
}
```

이것은 교차 타입으로 문제를 해결하는 방법입니다:

```ts
type FieldState = {
  value: string
}

type FormState =
  { isValid: boolean }
  & { [fieldName: string]: FieldState }
```

이렇게 해서 기존 JavaScript 모델을 선언할 수는 있지만 이런 객체를 TypeScript로 생성할 수는 없다는 점을 유념해주세요:  

```ts
type FieldState = {
  value: string
}

type FormState =
  { isValid: boolean }
  & { [fieldName: string]: FieldState }


// 다른데서 넘어오는 JavaScript 객체 용으로 사용
declare const foo:FormState; 

const isValidBool = foo.isValid;
const somethingFieldState = foo['something'];

// 이것으로 TypeScript 객체를 생성하는 것은 안됨
const bar: FormState = { // 오류 `isValid`는 `FieldState`에 할당할 수 없음
  isValid: false
}
```
