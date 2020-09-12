# 타입스크립트 스타일가이드 & 코딩 컨벤션

> 비공식 타입스크립트 스타일가이드

사람들이 제가 이 주제에 대해서 어떻게 생각하는지 물어보았습니다. 개인적으로, 저는 이 항목들을 제 팀과 프로젝트들에 강요하지 않습니다. 하지만, 강한 일관성을 필요로 하는 사람에게는 이것을 타이브레이커로 언급함으로써 도움이 될 수 있습니다. 제가 더 강력하게 느끼는 것들이 있는데 해당 내용들은 [tips 챕터](../tips/main.md) 에서 다뤄지고 있습니다. (예: 타입 주장은 나쁘다, 속성 설정자는 나쁘다.)🌹

주요 섹션:

* [변수](#변수와 함수)

* [클래스](#클래스)
* [인터페이스](#인터페이스)
* [타입](#타입)
* [네임 스페이스](#네임스페이스)
* [Enum](#enum)
* [`null` vs. `undefined`](#null-vs-undefined)
* [포메팅](#포메팅)
* [작은 따옴표 vs. 큰 따옴표](#따옴표)
* [텝 vs. 공백](#공백)
* [세미콜론의 사용](#세미콜론)
* [배열을 `Type[]` 같이 명시한다.](#배열)
* [파일명](#파일명)
* [`type` vs `interface`](#타입 vs. 인터페이스)

## 변수와 함수
* 변수와 함수 이름에 `camelCase` 형식을 사용합니다.

> 이유 : 일반적인 Javascript 사용 방식

**나쁜 예**

```ts
var FooVar;
function BarFunc() { }
```
**좋은 예**

```ts
var fooVar;
function barFunc() { }
```

## 클래스
* 클레스 이름에는  `PascalCase` 를 사용합니다.

> 이유 : 표준 자바스크립트에서 상당히 관습적인 사항입니다.

**나쁜 예**

```ts
class foo { }
```
**좋은 예**

```ts
class Foo { }
```
* 클래스 멤버와 메소드에 `camelCase` 를 사용합니다.

> 이유 : 자연스럽게 변수와 함수 이름 컨벤션을 따라갑니다.

**나쁜 예**

```ts
class Foo {
    Bar: number;
    Baz() { }
}
```
**좋은 예**

```ts
class Foo {
    bar: number;
    baz() { }
}
```
## 인터페이스

* 이름은 `PascalCase` 를 사용합니다.

> 이유 : 클래스와 비슷합니다.

* 멤버는  `camelCase` 를 사용합니다.

> 이유 : 클래스와 비슷합니다.

*  `I`를 접두어로 사용하지 **않습니다.**

> 이유: 비관습적입니다. `lib.d.ts` 는 중요한 인터페이스들을  `I` 없이 정의합니다. (예. Window, Document 등등).

**나쁜 예**

```ts
interface IFoo {
}
```
**좋은 예**

```ts
interface Foo {
}
```

## 타입

* 이름은 `PascalCase` 를 사용합니다..

> 이유 : 클래스와 비슷합니다.

* 멤버는  `camelCase` 를 사용합니다.

> 이유 : 클래스와 비슷합니다.


## 네임스페이스

* 이름들에는 `PascalCase` 를 사용합니다.

> 이유: 타입스크립트 팀에서 정한 약속입니다. 네임스페이스들은 정적 멤버를 갖는 클래스일 뿐입니다. 클레스 이름은 `PascalCase` 이므로 => 네임 스페이스 이름도 `PascalCase` 입니다.

**나쁜 예**

```ts
namespace foo {
}
```
**좋은 예**

```ts
namespace Foo {
}
```

## enum

* Enum 이름은 `PascalCase` 를 사용합니다.

> 이유 : 클래스와 비슷합니다. 타입에 해당합니다.

**나쁜 예**

```ts
enum color {
}
```
**좋은 예**

```ts
enum Color {
}
```

* Enum 멤버에 `PascalCase` 를 사용합니다.

> 이유 : 타입스크립트 팀이 정한 약속입니다. `SyntaxKind.StringLiteral`이 그 예가 되겠습니다. 이는 다른 언어를 타입스크립트로 번역(코드 생성)시 도움이 됩니다.

**나쁜 예**

```ts
enum Color {
    red
}
```
**좋은 예**

```ts
enum Color {
    Red
}
```

## Null vs. Undefined

* 명백히 값이 없을 때에도 사용하지 않도록 합니다.

> 이유 : 이 값들은 값들 사이에 일관된 구조를 유지하기 위해 보통 사용됩니다. 타입스크립트에서 당신은 `타입`으로 구조를 암시합니다.

**나쁜 예**

```ts
let foo = {x:123,y:undefined};
```
**Good**

```ts
let foo:{x:number,y?:number} = {x:123};
```

* 일반적으로 `undefined` 를 사용합니다. (대신 `{valid:boolean,value?:Foo}` 과 같은 객체를 return하는 것을 고려하세요.)

***나쁜예***

```ts
return null;
```
***좋은 예***

```ts
return undefined;
```

*  `null`은 API의 한 부분이거나, 관습적인 상황에서 사용하세요.

> 이유 : Node.js에서는 NodeBack 스타일 콜백에서  `error`를 `null` 로 하는 것이 관습적입니다.

**나쁜 예**

```ts
cb(undefined)
```
**좋은 예**

```ts
cb(null)
```

* `null`이나 `undefined` 값을 갖는 **객체**는 *truthy* 하게 검사하세요.

**나쁜 예**

```ts
if (error === null)
```
**좋은 예**

```ts
if (error)
```

* 원시적으로 `null` / `undefined` 를 체크할 때 `== undefined` 또는 `!= undefined`를 사용하세요. (`===` / `!==` 말고).  `null` / `undefined` 에는 작동하지만, 다른 fasly 값들(`''`,`0`,`false`) 에는 작동하지 않습니다.

**나쁜 예**

```ts
if (error !== null)
```
**좋은 예**

```ts
if (error != undefined)
```

## 포메팅
타입스크립트 컴파일러는 아주 좋은 언어 포메팅 서비스를 제공합니다. 기본적으로 결과물이 무엇이든간에 팀에게 충분히 인지 과부화를 줄이는데 도움을 줍니다.  [`tsfmt`](https://github.com/vvakame/typescript-formatter) 를 사용하여 명령창에서 당신의 코드 형식을 자동으로 맞추세요. 또한 당신의 IDE(atom/vscode/vs/sublime)은 이미 포메팅 지원을 하고 있습니다. 

예시:
```ts
// 타입 이전의 공백. 예: foo:<공백>string
const foo: string = "hello";
```

## 따옴표

* 따옴표가 겹치는 상황이 아니라면 작은 따옴표(`'`) 사용을 선호합니다.

> 이유 : 많은 자바스크립트 팀들이 작은 따옴표를 사용합니다. (예: [airbnb](https://github.com/airbnb/javascript), [standard](https://github.com/feross/standard), [npm](https://github.com/npm/npm), [node](https://github.com/nodejs/node), [google/angular](https://github.com/angular/angular/), [facebook/react](https://github.com/facebook/react)). 타이핑 하기가 더 쉽습니다. (대부분의 키보드에서 쉬프트를 누르지 않아도 됩니다). [Prettier 팀 또한 작은따옴표를 추천합니다.](https://github.com/prettier/prettier/issues/1105)

> 큰 따옴표에 장점이 없는 것은 아닙니다:객체를 JSON 형태로 복사 붙여넣기 하기 쉽습니다. 다른 언어를 사용하는 사람들이 따옴표 형식을 바꾸지 않아도 됩니다. Apostrophes(`'`)를 사용할 수 있습니다. 예: `He's not going.`. 하지만 저는 JS 커뮤니티가 공정하게 결정하는 것으로부터 벗어나지 않으려 합니다.

* 큰 따옴표를 사용할 수 없을 때, back tics(\`)를 사용해보세요.

> 이유 : 복잡한 문자열을 나타낼 때 일반적으로 사용합니다.

## 공백

* 탭을 사용하지말고,  `2` 칸 띄어쓰기 합니다.

> 이유 : 많은 자바스크립트 팀이 이렇게 사용합니다.(예: [airbnb](https://github.com/airbnb/javascript), [idiomatic](https://github.com/rwaldron/idiomatic.js), [standard](https://github.com/feross/standard), [npm](https://github.com/npm/npm), [node](https://github.com/nodejs/node), [google/angular](https://github.com/angular/angular/), [facebook/react](https://github.com/facebook/react)). TypeScript/VSCode 팀은 4칸 띄어쓰기하지만, 이 생태계에서 확실히 예외인 셈입니다.

## 세미콜론

* 세미콜론을 사용하세요.

> 이유 : 명확한 세미콜론은 언어 포메팅 도구가 일관된 결과를 가져오는데 도움을 줍니다. ASI(자동 세미콜론 삽입)가 없는 것은 새로운 현상을 갖고올 수 있다. 예를들어 `foo() \n (function(){})` 는 2개가 아니라 한개의 선언문이 됩다. TC39도 추천하는 사항입니다.

## 배열

* 배열은  `foos:Array<Foo>` 같은 형식 보다  `foos:Foo[]` 처럼 명시하세요

> 이유 : 읽기 더 쉽습니다. 이 형식은 타입스크립트 팀에 의해서 사용되고 있습니다. `[]`를 잘 감지할 수 있어서 무언가가 배열임을 알아차리기 더 쉬워집니다.

## 파일명
파일 이름은 `camelCase` 로 하세요. 예: `accordian.tsx`, `myControl.tsx`, `utils.ts`, `map.ts` 등등.

> 이유 : 많은 JS팀에서 관습적인 사항입니다.

## 타입 vs. 인터페이스

* union이나 intersection이 꼭 필요할 때  `type` 을 사용하세요.

```
type Foo = number | { someProperty: number }
```
* `extends` 또는 `implements` 하고 싶을 때 `interface` 를 사용하세요. 예시:

```
interface Foo {
  foo: string;
}
interface FooBar extends Foo {
  bar: string;
}
class X implements FooBar {
  foo: string;
  bar: string;
}
```
* 이 외의 경우에는 그날 당신을 행복하게 하는 것이라면 무엇이든 사용하세요.

