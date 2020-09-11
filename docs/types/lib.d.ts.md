* [lib.d.ts](#libdts)
* [Example Usage](#example-usage)
* [Inside look](#libdts-inside-look)
* [Modifying Native types](#modifying-native-types)
* [Using custom lib.d.ts](#using-your-own-custom-libdts)
* [Compiler `target` effect on lib.d.ts](#compiler-target-effect-on-libdts)
* [`lib` option](#lib-option)
* [Polyfill for old JavaScript engines](#polyfill-for-old-javascript-engines)

## lib.d.ts

TypeScript를 설치하면 `lib.d.ts`란 이름의 특수한 선언 파일이 항상 함께 따라옵니다. 이 파일은 JavaScript 런타임 및 DOM에 존재하는 다양한 일반적인 JavaScript constructs에 대한 ambient 선언을 담고 있습니다.

* `lib.d.ts`는 TypeScript 프로젝트의 컴파일 context에서 자동으로 추가됩니다.
* `lib.d.ts`는 *타입 체크가 보장된* JavaScript 코드를 손쉽게 작성할 수 있도록 돕는 역할을 합니다.

커맨드 라인에서 `--noLib` 플래그를 명시하거나 `tsconfig.json`에 `"noLib": true`를 추가하면, 컴파일 context에서 `lib.d.ts`가 추가되는 것을 막을 수 있습니다.

### Example Usage

실제로 `lib.d.ts`가 어떻게 사용되는지 예제를 통해 함께 보겠습니다:

```ts
var foo = 123;
var bar = foo.toString();
```

이 코드는 타입 검사를 무사히 통과할 것입니다. *왜냐하면* `toString` 함수는 모든 JavaScript 객체의 타입이 선언된 `lib.d.ts`에 미리 정의되어 있기 때문입니다.

만약 같은 코드를 `noLib` 옵션으로 설정한 후 실행한다면, 타입 체크 에러가 뜰 것입니다:

```ts
var foo = 123;
var bar = foo.toString(); // Error: 'number'에는 'toString'이란 속성이 존재하지 않습니다.
```

자, 이제 `lib.d.ts`의 중요성을 충분히 이해했을 테니, `lib.d.ts`에 어떤 내용이 담겨 있는지 살펴보겠습니다.

### `lib.d.ts` Inside Look

`lib.d.ts` 안에는 수많은 *변수*(ex. `window`, `document`, `math` 등)와 수많은 유사한 *인터페이스*(ex. `Window` , `Document`, `Math` 등)의 타입이 선언되어 있습니다.

전역 변수/인터페이스의 타입 선언 문서와 타입 주석을 읽는 가장 쉬운 방법은 이미 당신이 *잘 알고 있는 코드*를 통해 직접 확인하는 것입니다. 가령 `Math.floor` 메소드의 타입을 확인하기 위해선 사용하는 IDE에서 F12(타입 선언으로 이동)를 누르면 됩니다. (VSCode는 타입 선언 확인 기능을 아주 훌륭하게 지원합니다.)

예시로 변수 선언을 살펴보겠습니다. 가령 `window`는 다음과 같이 정의되어 있습니다:

```ts
declare var window: Window;
```

`declare var`란 키워드 뒤에 해당 변수의 이름(위의 경우, `window`)과 타입 주석으로 사용된 인터페이스(위의 경우, `Window` 인터페이스)가 잇따라오는, 아주 간단한 형태를 취하고 있습니다.

```ts
interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64 {
    animationStartTime: number;
    applicationCache: ApplicationCache;
    clientInformation: Navigator;
    closed: boolean;
    crypto: Crypto;
    // 기타 등등...
}
```

위의 코드에서 보듯, 각각의 인터페이스마다 얼마나 *많은* 타입 정보가 담겨 있는 지 확인할 수 있습니다. 만약 TypeScript가 없었다면, **우리의 머리** 속에 이 모든 것들을 저장하고 기억했어야 할 것입니다. 하지만 이제 그 짐은 컴파일러에게 떠넘기고, (타입 선언 확인이 필요할 때) `intellisense` 같은 도구를 사용해 손쉽게 타입을 확인하면 됩니다.

전역적인 것들을 선언할 때 *인터페이스*를 사용해야만 하는 좋은 이유가 있습니다. 왜냐하면 인터페이스는 우리가 굳이 `lib.d.ts` 파일을 직접 수정하지 않고도 전역에 *필요한 속성을 추가*할 수 있게 해 주기 때문입니다. 이는 다음 섹션에서 살펴보겠습니다.

### Modifying Native types

TypeScript의 `interface`는 항상 열려있습니다(=열린 결말, 수정 가능). 즉, 당신은 `lib.d.ts`에서 선언된 인터페이스에 필요하면 새 멤버를 언제든지 추가하기만 하면 된다는 것입니다. 그러면 TypeScript가 새로 추가된 사항들을 알아서 처리할 것입니다. [*global module(전역 모듈)*](../project/modules.md)에 변경 사항을 만들고 싶다면 `lib.d.ts`의 인터페이스를 수정해야 한다는 것을 기억하십시오. 사실 우리(=TypeScript 커뮤니티)는 이럴 경우 [`globals.d.ts`](../project/globals.md)라는 특수 파일을 만들어 전역적인 변경 사항을 따로 관리하는 것을 권장합니다.

`window`, `Math`, `Date`에 새로운 항목을 추가하는 예시를 보여드리겠습니다.

#### Example `window`

`Window` 전역 인터페이스에 그냥 필요한 항목만 추가하면 됩니다. 가령:

```ts
interface Window {
    helloWorld(): void;
}
```

이는 타입 체크가 완전히 보장된 `helloWorld`를 사용할 수 있게 도와줍니다.

```ts
// 런타임에 이를 추가하세요
window.helloWorld = () => console.log('hello world');
// 함수 호출
window.helloWorld();
// 잘못 사용했을 경우에는 에러를 띄웁니다:
window.helloWorld('gracius'); // Error: parameter가 호출 대상의 signiture와 일치하지 않습니다.
```

#### Example `Math`

전역 변수 `Math`는 `lib.d.ts`에 다음과 같이 정의되어 있습니다(다시 한번 강조하지만, 개발 도구를 사용해서 타입 정의를 확인하시길 바랍니다):

```ts
/** 기본 계산 기능과 Math 관련 상수를 제공하는 고유 객체 */
declare var Math: Math;
```

예를 들어, 변수 `Math`는 `Math` 인터페이스의 인스턴스입니다. `Math` 인터페이스는 다음과 같이 정의되어 있습니다:

```ts
interface Math {
    E: number;
    LN10: number;
    // 기타 ...
}
```

이는 `Math` 전역 변수에 새로운 속성을 추가하려면 `Math` 전역 인터페이스에 해당 속성 항목을 추가하기만 하면 된다는 뜻입니다. 예를 들어, [`seedrandom` project](https://www.npmjs.com/package/seedrandom)의 경우 `seedrandom` 함수를 전역 `Math` 객체에 추가하고 있습니다. 이는 생각보다 쉽게 할 수 있습니다:

```ts
interface Math {
    seedrandom(seed?: string);
}
```

그리고 당신은 그냥 아래와 같이 사용하시면 됩니다:

```ts
Math.seedrandom();
// 혹은
Math.seedrandom("Any string you want!");
```

#### Example `Date`

`lib.d.ts` 파일에서 `Date` *변수*에 관한 정의를 살펴보시면, 다음과 같은 내용을 확인할 수 있습니다:

```ts
declare var Date: DateConstructor;
```

`DateConstructor` 인터페이스는 앞서 살펴본 `Math`나 `Window`의 예제와 마찬가지로 `Date` 전역 변수에 `Date.now()` 같은 추가적인 기능을 사용할 수 있게 합니다. 뿐만 아니라 `Date`는 `Date` 인스턴스를 생성할 때 사용되는 *생성자(=construct)*도 갖고 있습니다(ex. `new Date()`). `DateConstructor` 인터페이스의 일부는 아래와 같습니다:

```ts
interface DateConstructor {
    new (): Date;
    // ... 기타 생성 signiture

    now(): number;
    // ... 기타 메소드
}
```

[`datejs`](https://github.com/abritinthebay/datejs) 프로젝트를 예로 생각해보겠습니다. DateJS는 `Date` 전역 변수와 `Date` 인스턴스 모두에게 새로운 멤버를 추가하고 있습니다. 그러므로 이 라이브러리의 TypeScript 선언은 아마 아래와 같을 것입니다: ([참고로 TypeScript 커뮤니티는 `datejs` 라이브러리 타입 정의를 이미 제공하고 있습니다](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/datejs/index.d.ts))


```ts
/** DateJS Public Static Methods */
interface DateConstructor {
    /** 현재 날짜로 설정된 date값을 가져옴. 시간은 해당 날짜의 시작 시간으로 설정 (00:00 || 12:00AM) */
    today(): Date;
    // ... 기타 등등
}

/** DateJS Public Instance Methods */
interface Date {
    /** 해당 Date 인스턴스에게 arg로 전달된 밀리세컨드 값을 더함 */
    addMilliseconds(milliseconds: number): Date;
    // ... 기타 등등
}
```

이는 다음과 같은 TypeSafe한 방식을 사용할 수 있게 도와줍니다:

```ts
var today = Date.today();
var todayAfter1second = today.addMilliseconds(1000);
```

#### Example `String`

`lib.d.ts`에서 문자열(string)에 대한 내용을 찾아보면, 앞서 `Date`에서 본 것과 유사한 구조를 확인할 수 있습니다. (`String` 전역 변수, `StringConstructor` 인터페이스, `String` 인터페이스). 여기서 한 가지 주목할 점은 `String` 인터페이스는 (아래 예시에서 보여주듯) 문자 *리터럴*에도 직접 영향을 끼친다는 것입니다.

```ts

interface String {
    endsWith(suffix: string): boolean;
}

String.prototype.endsWith = function(suffix: string): boolean {
    var str: string = this;
    return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
}

console.log('foo bar'.endsWith('bas')); // false
console.log('foo bas'.endsWith('bas')); // true
```

`Number`, `Boolean`, `RegExp` 등과 같이 정적 멤버(=literal)와 인스턴스 멤버를 동시에 가지고 있는 다른 데이터 타입들도 _(`String`과)_ 유사한 구조의 변수와 인터페이스를 갖고 있습니다. 그렇기에 이러한 인터페이스들도 _(`String`과)_ 마찬가지로 각 타입의 리터럴 인스턴스에도 영향을 직접적으로 끼칩니다.

### Example `string` redux

우리는 유지 · 관리를 위해 `global.d.ts`를 따로 생성하는 것을 추천드립니다. 하지만 만약 당신이 원한다면 특정 **파일 모듈**에서만 특별히 전역 namespace를 침범하실 수도 있습니다.

```ts
// 모듈이란 걸 보장
export {};

declare global {
    interface String {
        endsWith(suffix: string): boolean;
    }
}

String.prototype.endsWith = function(suffix: string): boolean {
    var str: string = this;
    return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
}

console.log('foo bar'.endsWith('bas')); // false
console.log('foo bas'.endsWith('bas')); // true
```

### Using your own custom lib.d.ts

앞서 언급했듯, `--noLib` 컴파일러 플래그는 TypeScript가 자동으로 `lib.d.ts` 파일을 포함시키는 걸 막습니다. 이게 어떤 경우 유용하게 사용될지에 관해서는 여러 가지 이유가 있습니다. 몇 가지 대표적인 이유를 들어보겠습니다:

* 만약 당신이 표준 브라우저 런타임 환경과 *상당히* 다른 커스텀 JavaScript 환경에서 실행 중이거나
* 코드에서 *전역 변수*를 *엄격한* 관리하고 싶을 때 유용합니다. (ex. `lib.d.ts`에서는 `item`을 전역 변수로 정의하고 있는데 당신은 코드에 유출되는 것을 원치 않을 수도 있습니다.)

기본 `lib.d.ts`을 제외시키고 나서 당신은 컴파일 context에 _(`lib.d.ts`와)_ 유사한 이름의 파일을 추가할 수 있고, TypeScript는 해당 파일을 타입 점검을 할 때 사용할 것입니다.

> Note: `--noLib`를 사용할 땐 각별히 조심해야 합니다. 한번 noLib 세상에 발을 들이게 되면, 가령 다른 사람과 프로젝트를 공유해야 할 상황이 발생할 때, 그들도 *강제로* noLib 설정을 해야 한다는 문제가 발생합니다. (혹은 *당신이 커스텀한 lib*를 사용하도록 강제해야겠죠.) 더 최악인 것은, 당신이 *다른 사람이 짠 코드*를 당신의 프로젝트에서 사용할 때, 해당 라이브러리를 *당신이 설정한 lib*에 맞게 동작하도록 별도로 수정을 해야 한다는 것입니다.

### Compiler target effect on `lib.d.ts`

compilter target을 `es6`로 설정하면 `lib.d.ts`에 `Promise` 같은 모던 JavaScript(es6)에 필요한 *추가적인* ambient 선언이 함께 포함됩니다. 이처럼 compilter target 설정에 따라 포함되는 ambient 선언을 마법처럼 바꿔주는 것은 누군가에게는 매우 유용할 수 있지만, 다른 누군가에게는 문제가 될 수도 있습니다. 왜냐하면 그 과정에서 *코드 ambience*와 *코드 생성(generation)*이 결합되기 때문입니다.

하지만 만약 당신의 환경을 좀 더 세밀한 제어를 원한다면, 이다음에 이야기를 다룰 `--lib` 옵션을 사용하시면 됩니다.

### lib option

종종 (사실은 꽤나 빈번하게) compile target(생성될 JavaScript 버전)과 ambient 라이브러리 타입 지원을 따로 분리하고 싶은 경우가 발생합니다. 가장 대표적인 예로 `Promise`를 살펴볼 수 있습니다. 가령 오늘(2016년 6월) 당신은 `--target es5`를 사용을 할 것이나, 동시에 가장 최신 feature인 `Promise`도 함께 사용하고 싶다고 가정해봅시다. 이를 지원하기 위해서는 `lib` 컴파일러 옵션을 사용해서 `lib`를 암묵적으로 컨트롤해야 합니다.

> Note: `--lib`을 사용하는 것은 `--target`을 설정하면서 따라오는 모든 `lib` 마법들을 분리시킴으로써 우리가 더 많은 컨트롤 권한을 갖게 합니다.

당신은 `--lib` 옵션을 커맨드 라인에서 설정하거나 `tsconfig.json`파일에서(권장) 설정할 수 있습니다.

**Command line**:

```
tsc --target es5 --lib dom,es6
```
**tsconfig.json**:
```json
"compilerOptions": {
    "lib": ["dom", "es6"]
}
```

`libs`는 아래와 같이 분류될 수 있습니다:

* JavaScript Bulk Feature:
    * es5
    * es6
    * es2015
    * es7
    * es2016
    * es2017
    * esnext
* Runtime Environment
    * dom
    * dom.iterable
    * webworker
    * scripthost
* ESNext By-Feature Options (even smaller than bulk feature)
    * es2015.core
    * es2015.collection
    * es2015.generator
    * es2015.iterable
    * es2015.promise
    * es2015.proxy
    * es2015.reflect
    * es2015.symbol
    * es2015.symbol.wellknown
    * es2016.array.include
    * es2017.object
    * es2017.sharedmemory
    * esnext.asynciterable

> NOTE: `--lib` 옵션은 고도의 정밀화된 컨트롤을 할 수 있게 합니다. 그래서 아마 당신은 대량으로 생성된 환경 카테고리(environment categories) 중에서 한 두 개의 아이템을 고르는 방식으로 이 기능을 사용하고 싶으실 겁니다.

> 만약 `--lib` 값이 설정되지 않으면 기본 라이브러리가 주입될 것입니다:
  - `--target es5` => es5, dom, scripthost
  - `--target es6` => es6, dom, dom.iterable, scripthost

개인적인 권장사항은 다음과 같습니다:

```json
"compilerOptions": {
    "target": "es5",
    "lib": ["es6", "dom"]
}
```

**Example Including Symbol with ES5:**

Symbol API는 target이 es5로 설정이 되어 있을 경우 `lib.d.ts`에 포함이 되지 않습니다. 그리고 우리는 이런 에러를 보게 될 것입니다: [ts] Cannot find name 'Symbol'.
하지만 우리는 "target": "es5"의 기본 lib와 함께 Symbol API를 지원하는 "lib"를 합쳐 사용할 수 있습니다.

```json
"compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom", "scripthost", "es2015.symbol"]
}
```

## Polyfill for old JavaScript engines

> [관련 주제에 대한 Egghead PRO 영상](https://egghead.io/lessons/typescript-using-es6-and-esnext-with-typescript)

`Map` / `Set`, 그리고 `Promise`와 같이 모던 `lib` 옵션으로 사용할 수 있는 런타임 feature들은 꽤 많이 존재합니다. (물론 이 feature의 목록은 시간이 감에 따라 달라지겠죠.) 그리고 `core-js`만 있으면 이 모든 것들을 손쉽게 사용할 수 있습니다. 간단히 `core-js` 모듈을 설치하고:

```
npm install core-js --save-dev
```

application의 entry point에 import 하시면 됩니다:

```js
import "core-js";
```

이제 `core-js`가 필요한 모든 런타임 feature를 대신 polyfill 해줄 것입니다.
