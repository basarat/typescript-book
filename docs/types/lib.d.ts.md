* [lib.d.ts](#libdts)
* [Example Usage](#example-usage)
* [Inside look](#libdts-inside-look)
* [Modifying Native types](#modifying-native-types)
* [Using custom lib.d.ts](#using-your-own-custom-libdts)
* [Compiler `target` effect on lib.d.ts](#compiler-target-effect-on-libdts)
* [`lib` option](#lib-option)
* [Polyfill for old JavaScript engines](#polyfill-for-old-javascript-engines)

## `lib.d.ts`

A special declaration file `lib.d.ts` ships with every installation of TypeScript. This file contains the ambient declarations for various common JavaScript constructs present in JavaScript runtimes and the DOM.
`lib.d.ts`라는 특정 선언 파일은 TypeScript를 설치할 때 함께 따라옵니다. 이 파일은 다양한 JavaScript 런타임과 DOM에 존재하는 다양한 JavaScript 구성을 담고 있습니다.

* This file is automatically included in the compilation context of a TypeScript project.
* 이 파일은 TypeScript 프로젝트의 컴파일 과정에서 자동으로 추가됩니다.
* The objective of this file is to make it easy for you to start writing *type checked* JavaScript code.
* 이 파일의 목적은 당신이 타입이 체크된 JavaScript 코드를 쉽게 작성할 수 있도록 도와주기 위함입니다.

You can exclude this file from the compilation context by specifying the `--noLib` compiler command line flag (or `"noLib" : true` in `tsconfig.json`).
당신은 컴파일을 실행할 때 커맨드 라인에 `--noLib` 플래그를 명시하면 컴파일 과정에서 이 파일을 제외할 수 있습니다. (혹은 `tsconfig.json`에 `"noLib": true`를 추가하시면 됩니다.)

### Example Usage 예제

As always let's look at examples of this file being used in action:
실제 상황에서 이 파일이 어떻게 사용되는 지 예시를 함께 보겠습니다:

```ts
var foo = 123;
var bar = foo.toString();
```
This code type checks fine *because* the `toString` function is defined in `lib.d.ts` for all JavaScript objects.
이 코드는 타입 체크를 무사히 통과합니다. 왜냐하면 `toString` 함수는 모든 JavaScript 객체의 타입이 선언된 `lib.d.ts`에서 이미 정의가 되어 있기 때문입니다.

If you use the same sample code with the `noLib` option you get a type check error:
만약에 `noLib` 옵션으로 같은 예제 코드를 실행한다면, 타입 체크 에러가 뜰 것입니다:

```ts
var foo = 123;
var bar = foo.toString(); // ERROR: Property 'toString' does not exist on type 'number'. // 'number'에는 'toString`이란 속성이 없습니다
```
So now that you understand the importance of `lib.d.ts`, what do its contents look like? We examine that next.
자, 이제 당신은 `lib.d.ts`의 중요성을 충분히 이해했을테니, 이제 `lib.d.ts`에 어떤 내용이 담겨져 있는 지 함께 확인해보겠습니다.

### `lib.d.ts` Inside Look `lib.d.ts` 뜯어보기

The contents of `lib.d.ts` are primarily a bunch of *variable* declarations e.g. `window`, `document`, `math` and a bunch of similar *interface* declarations e.g. `Window` , `Document`, `Math`.
`lib.d.ts`은 수많은 변수 선언(ex. `window`, `document`, `math` 등)과 수많은 유사한 인터페이스 선언(ex. `Window` , `Document`, `Math` 등)으로 이루어져 있습니다.

The simplest way to read the documentation and type annotations of global stuff is to type in code *that you know works* e.g. `Math.floor` and then F12 (go to definition) using your IDE (VSCode has great support for this).
가장 쉽게 문서를 읽고 글로벌한 타입 주석을 확인하는 방법은 이미 당신이 잘 알고있는 코드를 직접 쳐보는 것입니다. 가령 `Math.floor`를 작성하고 IDE에서 F12를 눌러 해당 함수의 타입을 확인할 수 있을 것입니다. (VSCode는 타입 선언 확인 기능을 아주 훌륭하게 지원합니다.)

Let's look at a sample *variable* declaration, e.g. `window` is defined as:
예시로 변수 선언을 살펴보겠습니다. 가령 `window`는 다음과 같이 정의되어 있습니다:

```ts
declare var window: Window;
```
That is just a simple `declare var` followed by the variable name (here `window`) and an interface for a type annotation (here the `Window` interface). These variables generally point to some global *interface* e.g. here is a small sample of the (actually quite massive) `Window` interface:
`declare var` 키워드 뒤에 해당 변수의 이름(위의 경우 `window`)과 타입 주석에 사용된 인터페이스(위의 경우, `Window` 인터페이스)가 잇따라오는, 아주 간단한 형태를 취하고 있습니다.

```ts
interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64 {
    animationStartTime: number;
    applicationCache: ApplicationCache;
    clientInformation: Navigator;
    closed: boolean;
    crypto: Crypto;
    // so on and so forth...
}
```
You can see that there is a *lot* of type information in these interfaces. In the absence of TypeScript *you* would need to keep this in *your* head. Now you can offload that knowledge on the compiler with easy access to it using things like `intellisense`.
당신은 위의 코드에서 각각의 인터페이스마다 수많은 타입 정보가 담겨져 있다는 걸 보실 수 있을 것입니다. TypeScript가 없었다면, 이 모든 것을 **당신의 머리** 속에 저장했어야 할 것입니다. 하지만 이제 그 짐을 컴파일러에게 떠넘기고, `intellisense` 같은 툴을 사용해 (필요할 때 마다) 쉽게 타입에 접근하고 확인하실 수 있습니다.

There is a good reason for using *interfaces* for these globals. It allows you to *add additional properties* to these globals *without* a need to change `lib.d.ts`. We will cover this concept next.
전역 변수에 인터페이스를 사용해야만 하는 이유가 있습니다. `lib.d.ts` 파일에 수정을 하지 않고도 전역 변수들에게 속성을 추가할 수 있게 해주기 때문입니다.

### Modifying Native Types

Since an `interface` in TypeScript is open ended this means that you can just add members to the interfaces declared in `lib.d.ts` and TypeScript will pick up on the additions. Note that you need to make these changes in a [*global module*](../project/modules.md) for these interfaces to be associated with `lib.d.ts`. We even recommend creating a special file called [`globals.d.ts`](../project/globals.md) for this purpose.
TypeScript의 인터페이스는 열린 결말의 형태를 취하고 있기에, 당신은 `lib.d.ts`에 미리 선언된 인터페이스에 필요시 새 타입을 추가 수 있고 TypeScript는 추가된 항목들을 모두 체크할 것입니다. 당신은 [*global module*](../project/modules.md)에서 `lib.d.ts`의 인터페이스에 대한 수정 사항을 기재해야 합니다. 우리는 이를 위해 [`globals.d.ts`](../project/globals.md)라는 파일을 따로 만드는 것을 추천합니다.

Here are a few example cases where we add stuff to `window`, `Math`, `Date`:
`window`, `Math`, `Date`에 새로운 항목을 항목을 추가하는 예시를 보여드리겠습니다.


#### Example `window` 예시 `window`

Just add stuff to the `Window` interface e.g.:
그냥 `Window` 인터페이스에 항목만 추가하시면 됩니다. 가령:

```ts
interface Window {
    helloWorld(): void;
}
```

This will allow you to use it in a *type safe* manner:
이렇게 작성하면 당신이 타입이 안전하게 체크된 상태에서 `helloWorld`를 사용할 수 있게 허락할 것입니다.

```ts
// Add it at runtime 런타임에 이걸 추가하세요
window.helloWorld = () => console.log('hello world');
// Call it 런타임에서 부릅니다
window.helloWorld();
// Misuse it and you get an error: 잘못 사용했을 경우에는 에러를 띄웁니다:
window.helloWorld('gracius'); // Error: Supplied parameters do not match the signature of the call target
```

#### Example `Math` 예시 `Math`
The global variable `Math` is defined in `lib.d.ts` as (again, use your dev tools to navigate to definition):
전역 변수 `Math`는 `lib.d.ts`에 이렇게 정의되어 있습니다(다시 한번 강조하지만, 개발 도구를 사용해서 타입 정의를 확인하시길 바랍니다):

```ts
/** An intrinsic object that provides basic mathematics functionality and constants. */
/** 기본 계산 기능과 관련 상수를 제공하는 고유 객체 */
declare var Math: Math;
```

i.e. the variable `Math` is an instance of the `Math` interface. The `Math` interface is defined as:
예를 들어, 변수 `Math`는 `Math` 인터페이스의 인스턴스입니다. `Math` 인터페이스는 다음과 같이 정의되어 있습니다:

```ts
interface Math {
    E: number;
    LN10: number;
    // others ... 기타 ...
}
```

This means that if you want to add stuff to the `Math` global variable you just need to add it to the `Math` global interface, e.g. consider the [`seedrandom` project](https://www.npmjs.com/package/seedrandom) which adds a `seedrandom` function to the global `Math` object. This can be declared quite easily:
이는 당신이 `Math` 전역 변수에 새로운 속성을 추가하려면 `Math` 전역 인터페이스에 그 항목을 추가만 하면 된다는 뜻입니다. 예를 들어 [`seedrandom` project](https://www.npmjs.com/package/seedrandom)의 경우, `seedrandom`이란 함수를 전역 `Math` 객체에 넣는 작업을 하고 있습니다. 이것들은 꽤나 쉽게 정의될 수 있습니다.

```ts
interface Math {
    seedrandom(seed?: string);
}
```

And then you can just use it:
그리고 당신은 그냥 이렇게 사용하시면 됩니다:

```ts
Math.seedrandom();
// or
Math.seedrandom("Any string you want!");
```

#### Example `Date`

If you look at the definition of the `Date` *variable* in `lib.d.ts` you will find:
`lib.d.ts` 파일에서 `Date` 변수에 대한 정의를 살펴보시면 다음과 같은 내용을 확인하실 수 있습니다:

```ts
declare var Date: DateConstructor;
```
The interface `DateConstructor` is similar to what you have seen before with `Math` and `Window` in that it contains members you can use off of the `Date` global variable e.g. `Date.now()`. In addition to these members it contains *construct* signatures which allow you to create `Date` instances (e.g. `new Date()`). A snippet of the `DateConstructor` interface is shown below:
`DateConstructor` 인터페이스는 이전에 본 `Math`나 `Window`와 `Date` 전역 변수에서 제공하는 것들을 갖고 있다는(ex. `Date.now()`) 점에서 비슷합니다. 그뿐만 아니라 `Date`는 `construct`도 지니고 있는데, 이는 여러분이 `Date` 인스턴스를 생성할 수 있게 도와줍니다. (ex. `new Date()`) `DateConstructor` 인터페이스의 스니펫은 아래와 같습니다:

```ts
interface DateConstructor {
    new (): Date;
    // ... other construct signatures

    now(): number;
    // ... other member functions
}
```

Consider the project [`datejs`](https://github.com/abritinthebay/datejs). DateJS adds members to both the `Date` global variable and `Date` instances. Therefore a TypeScript definition for this library would look like ([BTW the community has already written this for you in this case](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/datejs/index.d.ts)):

```ts
/** DateJS Public Static Methods */
interface DateConstructor {
    /** Gets a date that is set to the current date. The time is set to the start of the day (00:00 or 12:00 AM) */
    today(): Date;
    // ... so on and so forth
}

/** DateJS Public Instance Methods */
interface Date {
    /** Adds the specified number of milliseconds to this instance. */
    addMilliseconds(milliseconds: number): Date;
    // ... so on and so forth
}
```
This allows you to do stuff like the following in a TypeSafe manner:

```ts
var today = Date.today();
var todayAfter1second = today.addMilliseconds(1000);
```

#### Example `string`

If you look inside `lib.d.ts` for string you will find stuff similar to what we saw for `Date` (`String` global variable, `StringConstructor` interface, `String` interface). One thing of note though is that the `String` interface also impacts string *literals* as demonstrated in the below code sample:

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

Similar variables and interfaces exist for other things that have both static and instance members like `Number`, `Boolean`, `RegExp`, etc. and these interfaces affect literal instances of these types as well.

### Example `string` redux

We recommended creating a `global.d.ts` for maintainability reasons. However, you can break into the *global namespace* from within *a file module* if you desire so. This is done using `declare global { /*global namespace here*/ }`. E.g. the previous example can also be done as:

```ts
// Ensure this is treated as a module.
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
As we mentioned earlier, using the `--noLib` boolean compiler flag causes TypeScript to exclude the automatic inclusion of `lib.d.ts`. There are various reasons why this is a useful feature. Here are a few of the common ones:

* You are running in a custom JavaScript environment that differs *significantly* from the standard browser based runtime environment.
* You like to have *strict* control over the *globals* available in your code. E.g. lib.d.ts defines `item` as a global variable and you don't want this to leak into your code.

Once you have excluded the default `lib.d.ts` you can include a similarly named file into your compilation context and TypeScript will pick it up for type checking.

> Note: be careful with `--noLib`. Once you are in noLib land, if you choose to share your project with others, they will be *forced* into noLib land (or rather *your lib* land). Even worse, if you bring *their* code into your project you might need to port it to *your lib* based code.

### Compiler target effect on `lib.d.ts`

Setting the compiler target to `es6` causes the `lib.d.ts` to include *additional* ambient declarations for more modern (es6) stuff like `Promise`. This magical effect of the compiler target changing the *ambience* of the code is desirable for some people and for others it's problematic as it conflates *code generation* with *code ambience*.

However, if you want finer grained control of your environment, you should use the `--lib` option which we discuss next.

### lib option

Sometimes (many times) you want to decouple the relationship between the compile target (the generated JavaScript version) and the ambient library support. A common example is `Promise`, e.g. today (in June 2016) you most likely want to `--target es5` but still use the latest features like `Promise`. To support this you can take explicit control of `lib` using the `lib` compiler option.

> Note: using `--lib` decouples any lib magic from `--target` giving you better control.

You can provide this option on the command line or in `tsconfig.json` (recommended):

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

The libs can be categorized as follows:

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

> NOTE: the `--lib` option provides extremely fine tuned control. So you most likely want to pick an item from the bulk + environment categories.
> If --lib is not specified a default library is injected:
  - For --target es5 => es5, dom, scripthost
  - For --target es6 => es6, dom, dom.iterable, scripthost

My Personal Recommendation:

```json
"compilerOptions": {
    "target": "es5",
    "lib": ["es6", "dom"]
}
```

Example Including Symbol with ES5:

Symbol API is not included when target is es5. In fact, we receive an error like: [ts] Cannot find name 'Symbol'.
We can use "target": "es5" in combination with "lib" to provide Symbol API in TypeScript:

```json
"compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom", "scripthost", "es2015.symbol"]
}
```

## Polyfill for old JavaScript engines

> [Egghead PRO Video on this subject](https://egghead.io/lessons/typescript-using-es6-and-esnext-with-typescript)

There are quite a few runtime features that are like `Map` / `Set` and even `Promise` (this list will of course change over time) that you can use with modern `lib` options. To use these all you need to do is use `core-js`. Simply install:

```
npm install core-js --save-dev
```
And add an import to your application entry point:

```js
import "core-js";
```

And it should polyfill these runtime features for you 🌹.
