## 리터럴(Literal)
리터럴은 *입력된 그대로*의 값이며 JavaScript 기본 타입(primitive)입니다. 

### 문자열 리터럴

문자열 리터럴을 타입으로 사용할 수 있습니다. 예를 들면:

```ts
let foo: 'Hello';
```

여기서 우리는 `foo`라는 이름의 변수를 만들었는데 그 변수에는 *리터럴 값 `'Hello'`만 할당이 허용됩니다*. 아래에서 볼 수 있습니다:

```ts
let foo: 'Hello';
foo = 'Bar'; // Error: "Bar" is not assignable to type "Hello"
```

이 자체로는 그닥 유용하지 않지만 타입 유니온에서 사용하면 강력한 (그리고 유용한) 추상화를 만들 수 있습니다. 예를 들면:

```ts
type CardinalDirection =
    | "North"
    | "East"
    | "South"
    | "West";

function move(distance: number, direction: CardinalDirection) {
    // ...
}

move(1,"North"); // 오케이
move(1,"Nurth"); // 오류!
```

### 다른 리터럴 타입들
TypeScript는 `boolean`과 `number` 리터럴 타입도 지원합니다, 예를 들면:

```ts
type OneToFive = 1 | 2 | 3 | 4 | 5;
type Bools = true | false;
```

### 추론(Inference)
매우 자주 `Type string is not assignable to type "foo"` 같은 오류를 만나게 됩니다. 아래 예제에서 이런 경우를 볼 수 있습니다.

```js
function iTakeFoo(foo: 'foo') { }
const test = {
  someProp: 'foo'
};
iTakeFoo(test.someProp); // Error: Argument of type string is not assignable to parameter of type 'foo'
```

이것은 `test`가 `{someProp: string}`라는 타입을 가진 것으로 추론되었기 때문입니다. 고치는 방법은 아래와 같이 간단한 타입 표명을 사용해서 TypeScript에게 어떤 리터럴 타입으로 추론되어야 하는지 알려주는 것입니다:

```js
function iTakeFoo(foo: 'foo') { }
const test = {
  someProp: 'foo' as 'foo'
};
iTakeFoo(test.someProp); // 오케이!
```

아니면 선언 시점에 타입 어노테이션을 사용하여 TypeScript가 올바르게 추론할 수 있게 도와줄 수도 있습니다: 

```ts
function iTakeFoo(foo: 'foo') { }
type Test = {
  someProp: 'foo',
}
const test: Test = { // 타입을 붙임 - someProp의 추론된 타입은 항상 === 'foo'
  someProp: 'foo' 
}; 
iTakeFoo(test.someProp); // 오케이!
```

### 사용 사례
문자열 리터럴 타입의 유효한 사용 사례들:

#### 문자열 열거형(String Enums)

[TypeScript 열거형은 숫자 기반입니다](../enums.md). 위의 `CardinalDirection` 예제처럼 문자열 리터럴이 있는 유니온 타입으로 문자열 기반 열거형의 표현할 수 있습니다. 다음과 같은 함수로 `Key:Value` 구조를 만들 수도 있습니다:

```ts
/** 문자열 목록으로 K:V를 만드는 유틸리티 함수 */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
```

그리고 `keyof typeof`를 사용하여 리터럴 타입 유니온을 생성할 수 있습니다. 전체 내용이 아래 예제에 나와 있습니다:

```ts
/** 문자열 목록으로 K:V를 만드는 유틸리티 함수 */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

/**
  * 문자열 열거형을 만드는 예시
  */

/** K:V 생성 */
const Direction = strEnum([
  'North',
  'South',
  'East',
  'West'
])
/** 타입 생성 */
type Direction = keyof typeof Direction;

/** 
  * 문자열 열거형을 사용하는 예시
  */
let sample: Direction;

sample = Direction.North; // 오케이
sample = 'North'; // 오케이
sample = 'AnythingElse'; // 오류!
```

#### 기존 JavaScript API 모델링

예를 들어, [CodeMirror 편집기에는 `readOnly` 옵션이 있는데](https://codemirror.net/doc/manual.html#option_readOnly), `boolean` 값이나 문자열 리터럴 `"nocursor"`를 지정할 수 있습니다(사용 가능한 값은 `true,false,"nocursor"`). 이것은 아래와 같이 선언할 수 있습니다:

```ts
readOnly: boolean | 'nocursor';
```

#### 구별된 유니온

이 부분은 [이 책애서](./discriminated-unions.md) 다룹니다.

[](https://github.com/Microsoft/TypeScript/pull/5185)
