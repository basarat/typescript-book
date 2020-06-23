-   [열거형](#enums)
-   [숫자 열거형 그리고 숫자들](#number-enums-and-numbers)
-   [숫자 열거형 그리고 문자들](#number-enums-and-strings)
-   [Changing the number associated with a number enum](#changing-the-number-associated-with-a-number-enum)
-   [Enums are open ended](#enums-are-open-ended)
-   [Number Enums as flags](#number-enums-as-flags)
-   [String Enums](#string-enums)
-   [Const enums](#const-enums)
-   [Enum with static functions](#enum-with-static-functions)

### Enums

열거형은 관련 값 모음을 구성하는 방법입니다. 매우 많은 프로그래밍 언어들은 (C/C#/Java) `enum`을 데이터 타입에 포함하고 있지만 자바스크립트는 포함하고 있지 않습니다. 그러나 타입스크립트는 그렇지 않습니다. 타입스크립트 열거형을 선언하는 방법을 아래의 예제를 통해서 확인할 수 있습니다.

```ts
enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Spades,
}

// Sample usage
var card = CardSuit.Clubs

// Safety
card = 'not a member of card suit' // Error : `CardSuit`이 열거형이기 때문에 문자열을 할당할 수 없습니다.
```

이 열거형 값은 `number`이므로 이후부터는 숫자 열거형이라고 합니다.

#### 숫자 열거형 그리고 숫자들

타입스크립트 열거형은 숫자가 기본입니다. 이것은 숫자가 열거형 인스턴스에 할당 될 수 있고 `number`와 호환되는 다른것도 가능하다는 것을 의미합니다.

```ts
enum Color {
    Red,
    Green,
    Blue,
}
var col = Color.Red
col = 0 // Effectively same as Color.Red
```

#### 숫자 열거형 그리고 문자들

열거형을 자세히 살펴보기 전에 생성되는 자바스크립트를 살펴보겠습니다. 여기에 타입스크립트 예제가 있습니다.

```ts
enum Tristate {
    False,
    True,
    Unknown,
}
```

다음 코드를 자바스크립트로 변환

```js
var Tristate
;(function (Tristate) {
    Tristate[(Tristate['False'] = 0)] = 'False'
    Tristate[(Tristate['True'] = 1)] = 'True'
    Tristate[(Tristate['Unknown'] = 2)] = 'Unknown'
})(Tristate || (Tristate = {}))
```

`Tristate[Tristate["False"] = 0] = "False";` 이 줄에 초점을 맞춰서 설명하면 이 안에 `Tristate["False"] = 0`으로 할당한다. 자바스크립트에서 할당연산자는 이 경우에 `0`을 반환합니다. `Tristate[0] = "False"` 여기서 `0`에 해당하는 값이 방금 할당한 값이 `0`이기 때문에 `Tristate[0] = "False"` 값은 `False`를 반환합니다. 아래에 설명되어 있습니다.

```ts
enum Tristate {
    False,
    True,
    Unknown,
}
console.log(Tristate[0]) // "False"
console.log(Tristate['False']) // 0
console.log(Tristate[Tristate.False]) // "False" because `Tristate.False == 0`
```

#### enum과 관련된 숫자 변경

enum은 `0`의 값을 기준으로 1씩 값이 자동으로 증가합니다. 아래의 예제를 참고하세요

```ts
enum Color {
    Red, // 0
    Green, // 1
    Blue, // 2
}
```

enum에 값을 할당하여 숫자를 변경할 수 있습니다. 아래는 3을 할당하여 3부터 값이 증가합니다.

```ts
enum Color {
    DarkRed = 3, // 3
    DarkGreen, // 4
    DarkBlue, // 5
}
```

> TIP: 나는 일반적으로 enum에 truthy에 해당하는 `=1`로 값을 초기화 합니다.

#### flags로 숫자 열거

enum의 훌륭하게 사용하는 방법중 하나는 `Flags`로 사용하는 것 입니다. 플래그를 사용하면 일련의 조건 중 특정 조건이 참인지 확인할 수 있습니다. 아래의 예제를 참고하십시요.

```ts
enum AnimalFlags {
    None = 0,
    HasClaws = 1 << 0,
    CanFly = 1 << 1,
    EatsFish = 1 << 2,
    Endangered = 1 << 3,
}
```

여기서 왼쪽 시프트 연산자를 사용하여 비트 단위의 분리 된 숫자 '0001', '0010', '0100'및 '1000'(소수점 `1`, `2`,`4`,`8`). 비트 연산자`|`(또는) /`&`(and) /`~`(not)는 플래그로 작업 할 때 매우 유용하며 아래에 설명되어 있습니다.

```ts
enum AnimalFlags {
    None = 0,
    HasClaws = 1 << 0,
    CanFly = 1 << 1,
}
type Animal = {
    flags: AnimalFlags
}

function printAnimalAbilities(animal: Animal) {
    var animalFlags = animal.flags
    if (animalFlags & AnimalFlags.HasClaws) {
        console.log('animal has claws')
    }
    if (animalFlags & AnimalFlags.CanFly) {
        console.log('animal can fly')
    }
    if (animalFlags == AnimalFlags.None) {
        console.log('nothing')
    }
}

let animal: Animal = { flags: AnimalFlags.None }
printAnimalAbilities(animal) // nothing
animal.flags |= AnimalFlags.HasClaws
printAnimalAbilities(animal) // animal has claws
animal.flags &= ~AnimalFlags.HasClaws
printAnimalAbilities(animal) // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly
printAnimalAbilities(animal) // animal has claws, animal can fly
```

Here:

-   우리는 플래그를 추가하기 위해 `|=` 를 사용했습니다.
-   플래그를 지우는 `&=` 와 `~` 의 조합
-   플래그를 결합하는 `|`

> Note: 플래그를 결합하여 enum 정의 내에서 편리한 바로 가기를 만들 수 있습니다. 아래의 `EndangeredFlyingClawedFishEating`를 참고하십시요.

```ts
enum AnimalFlags {
    None = 0,
    HasClaws = 1 << 0,
    CanFly = 1 << 1,
    EatsFish = 1 << 2,
    Endangered = 1 << 3,

    EndangeredFlyingClawedFishEating = HasClaws |
        CanFly |
        EatsFish |
        Endangered,
}
```

#### String Enums

멤버 값이 `number` 인 열거를 보았습니다. 실제로 문자열 값을 가진 enum 멤버를 가질 수 있습니다. 예시.

```ts
export enum EvidenceTypeEnum {
    UNKNOWN = '',
    PASSPORT_VISA = 'passport_visa',
    PASSPORT = 'passport',
    SIGHTED_STUDENT_CARD = 'sighted_tertiary_edu_id',
    SIGHTED_KEYPASS_CARD = 'sighted_keypass_card',
    SIGHTED_PROOF_OF_AGE_CARD = 'sighted_proof_of_age_card',
}
```

의미 있고 디버깅 가능한 문자열 값을 제공하므로 처리 및 디버깅이 더 쉬울 수 있습니다.
이 값을 사용하여 간단한 문자열 비교를 수행 할 수 있습니다. 예시.

```ts
// Where `someStringFromBackend` will be '' | 'passport_visa' | 'passport' ... etc.
const value = someStringFromBackend as EvidenceTypeEnum

// Sample code
if (value === EvidenceTypeEnum.PASSPORT) {
    console.log('You provided a passport')
    console.log(value) // `passport`
}
```

#### Const Enums

다음과 같은 enum 정의가 있는 경우

```ts
enum Tristate {
    False,
    True,
    Unknown,
}

var lie = Tristate.False
```

`var lie = Tristate.False` 줄은 `var lie = Tristate.False`로 컴파일 됩니다. (네. 출력과 입력은 동일합니다.) 즉 런타임시 런타임은 `Tristate`를 찾은 다음 `Tristate.False`를 찾아야 합니다.
여기서 성능 향상을 얻으려면 `enum`을 `const enum`으로 작성하면 됩니다. 아래에 코드를 참고하십시요.

```ts
const enum Tristate {
    False,
    True,
    Unknown,
}

var lie = Tristate.False
```

자바스크립트로 컴파일한 모습

```js
var lie = 0
```

1. 인라인 enum을 사용하는 방법 (`0` 대신 `Tristate.False`)
2. 사용법이 인라인되어 있기 때문에 enum 정의에 대한 JavaScript를 생성하지 않습니다 (런타임에는`Tristate` 변수가 없습니다)

##### Const enum preserveConstEnums

인라인은 확실한 성능 이점이 있습니다. 런타임에 `Tristate` 변수가 없다는 사실은 실제로 런타임에 실제로 사용되지 않는 JavaScript를 생성하지 않음으로써 컴파일러를 도와주고 있습니다. 그러나 컴파일러가 여전히 _number to string_ 또는 _string to number_ 조회와 같은 항목에 대한 JavaScript 버전의 열거 정의를 생성하도록 할 수 있습니다. 이 경우 컴파일러 플래그`--preserveConstEnums`를 사용할 수 있으며 여전히`var Tristate` 정의를 생성하므로 런타임에 수동으로 `Tristate [ "False"]` 또는 `Tristate [0]`을 사용할 수 있습니다. 이것은 *inlining*에 영향을 미치지 않습니다.

### 정적 함수가 있는 Enum

`enum` +`namespace` 병합 선언을 사용하여 정적 메서드를 enum에 추가 할 수 있습니다. 다음은 정적 멤버`isBusinessDay`를 enum `Weekday`에 추가하는 예시를 보여줍니다.

```ts
enum Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}
namespace Weekday {
    export function isBusinessDay(day: Weekday) {
        switch (day) {
            case Weekday.Saturday:
            case Weekday.Sunday:
                return false
            default:
                return true
        }
    }
}

const mon = Weekday.Monday
const sun = Weekday.Sunday
console.log(Weekday.isBusinessDay(mon)) // true
console.log(Weekday.isBusinessDay(sun)) // false
```

#### Enum은 끝났습니다.

> NOTE: 개방형 열거 형은 모듈을 사용하지 않는 경우에만 관련이 있습니다. 모듈을 사용해야합니다. 따라서 이 섹션은 마지막입니다.

다음은 열거 형에 의해 생성 된 JavaScript입니다.

```js
var Tristate
;(function (Tristate) {
    Tristate[(Tristate['False'] = 0)] = 'False'
    Tristate[(Tristate['True'] = 1)] = 'True'
    Tristate[(Tristate['Unknown'] = 2)] = 'Unknown'
})(Tristate || (Tristate = {}))
```

우리는 이미`Tristate [Tristate [ "False"] = 0] = "False";`부분을 설명했습니다. 이제 주변 코드`(function (Tristate) {/ * code here * /}) (Tristate || (Tristate = {}));`를 구체적으로`(Tristate || (Tristate = {}));`이 부분 . 이것은 기본적으로 이미 정의 된 `Tristate` 값을 가리 키거나 새로운 `{}`객체로 초기화하는 로컬 변수`TriState`를 캡쳐합니다.

즉, 여러 파일에서 열거 정의를 분할 (및 확장) 할 수 있습니다. 예를 들어 아래에서 우리는`Color`에 대한 정의를 두 개의 블록으로 나누었습니다.

```ts
enum Color {
    Red,
    Green,
    Blue,
}

enum Color {
    DarkRed = 3,
    DarkGreen,
    DarkBlue,
}
```

열거의 연속에서 첫 번째 멤버 (여기서는 `DarkRed = 3`)를 *should*로 초기화하여 생성 된 코드가 이전 정의 (예 :`0`,`1`, ... 등)에서 클로버가 아닌 값을 얻도록 합니다. 값). 어쨌든 TypeScript는 경고하지 않습니다. (오류 선언 `여러 선언이있는 열거 형에서는 하나의 선언 만 첫 번째 열거 형 요소의 초기화 프로그램을 생략 할 수 있습니다 .`)
