## 이름 기준 타입 검사(Nominal Typing)
TypeScript의 타입 시스템은 구조적이고 [가장 중요한 혜택 가운데 하나입니다](../why-typescript.md). 그렇지만 어떤 시스템에서는 두 변수가 동일한 구조이더라도 *타입 이름* 이 다르면 다른 타입으로 구분되는 것이 좋은 실세계 사례들이 있습니다. 아주 흔한 사례는 *식별자* 구조입니다 (C#/Java 같은 언어에서 이 구조는 일반적으로 그냥 문자열이지만 *이름* 에 따라 다른 동작을 하게 됨).

TypeScript 커뮤니티에서 이와 관련된 몇가지 패턴이 나왔습니다. 몇가지를 개인적인 선호도 순으로 다루겠습니다:

## 리터럴 타입 사용

이 패턴은 제네릭과 리터럴 타입을 사용합니다: 

```ts
/** 제네릭 Id 타입 */
type Id<T extends string> = {
  type: T,
  value: string,
}

/** 구체화된 Id 타입 */
type FooId = Id<'foo'>;
type BarId = Id<'bar'>;

/** 선택적으로 사용: 생성자 함수 */
const createFoo = (value: string): FooId => ({ type: 'foo', value });
const createBar = (value: string): BarId => ({ type: 'bar', value });

let foo = createFoo('sample')
let bar = createBar('sample');

foo = bar; // Error
foo = foo; // Okay
```

* 장점
  - 타입 표명이 필요 없음
* 단점
  - `{type,value}` 구조를 감수해야 하고 서버 직렬화 작업 필요

## 열거형 사용
[TypeScript의 열거형은](../enums.md) 상당 수준의 이름 기준 타입 검사를 제공합니다. 열거형 타입들은 이름이 다르다면 구별됩니다. 이 사실을 활용하여 구조적으로 호환되는 타입이 이름에 따라 구별되게 할 수 있습니다.

이 기법의 내용은:
* *브랜드* 열거형을 만듬.
* 브랜드 열거형 + 실제 구조의 *교차* (`&`) 로 타입 정의.

아래에 구조의 타입이 문자열로 표현되는 모습이 보이고 있습니다:

```ts
// FOO
enum FooIdBrand { _ = "" };
type FooId = FooIdBrand & string;

// BAR
enum BarIdBrand  { _ = "" };
type BarId = BarIdBrand & string;

/**
 * 사용 데모
 */
var fooId: FooId;
var barId: BarId;

// 안전함!
fooId = barId; // error
barId = fooId; // error

// 생성하기
fooId = 'foo' as FooId;
barId = 'bar' as BarId;

// 두 타입 모두 부모 타입과 호환됨
var str: string;
str = fooId;
str = barId;
```

위 브랜드 열거형 ``FooIdBrand`` 와 ``BarIdBrand`` 을 보면, 둘 다 한 개의 멤버 (`_`)가 있고 ``{ _ = "" }`` 구문에 의해 빈 문자열에 대응되고 있습니다. 이렇게 하면 TypeScript는 이것들이 문자열 기반 열거형이고, ``number`` 타입 값이 아니라 ``string`` 타입 값을 가진다고 추론합니다. TypeScript는 빈 열거형(``{}``)을 숫자 기반 열거형으로 간주하기 때문에 이렇게 해야 합니다. 그리고 TypeScript 3.6.2부터 숫자 기반 ``enum`` 과 ``string`` 의 교집합은 ``never`` 입니다.

## 인터페이스 사용

`number` 타입은 `enum` 과 호환되기 때문에 앞서의 기법은 숫자 용으로 사용할 수 없습니다. 대신 인터페이스를 사용하여 구조 호환성을 끊을 수 있습니다. 이 기법은 TypeScript 컴파일러 팀도 사용하고 있기 때문에 살펴볼 가치가 있습니다. 여기 나온대로 앞에 `_` 를 붙이고 뒤에 `Brand` 를 붙이는 규칙을 적극 추천합니다 ([TypeScript 팀이 사용하는 방식이기도 함](https://github.com/Microsoft/TypeScript/blob/7b48a182c05ea4dea81bab73ecbbe9e013a79e99/src/compiler/types.ts#L693-L698)).

이 기법의 내용은:
* 타입에 사용하지 않는 속성을 추가하여 구조 호환성을 끊음
* 새 객체에 타입을 붙이거나 타입 캐스팅을 할 때는 타입 표명을 사용함.

아래에 나와 있습니다:

```ts
// FOO
interface FooId extends String {
    _fooIdBrand: string; // 타입 오류 방지용
}

// BAR
interface BarId extends String {
    _barIdBrand: string; // 타입 오류 방지용
}

/**
 * 사용 데모
 */
var fooId: FooId;
var barId: BarId;

// Safety!
fooId = barId; // error
barId = fooId; // error
fooId = <FooId>barId; // error
barId = <BarId>fooId; // error

// 생성하기
fooId = 'foo' as any;
barId = 'bar' as any;

// 부모 string이 필요한 경우
var str: string;
str = fooId as any;
str = barId as any;
```
