## External modules

타입스크립트는 많은 패키지를 외부 모듈 패턴으로 사용합니다. 여기서는 실제 사용법을 반영하는데 사용되는 패턴을 논의합니다.

### Clarification: commonjs, amd, es modules, others

먼저 모듈시스템들은 일치하지 않습니다. 나는 현재 권장사항을 제공하고 잡음을 제거할 것 입니다. 즉 모든 일이 어떻게 작동되는지 보여주지 않을 것 입니다.

그것은 타입스크립트에서 `module`에 따라 다른 자바스크립트를 생성할 수 있습니다. 무시할 수 있는 것들이 있습니다. (나는 레거시가 된 기술을 설명하는데 관심이 없습니다.)

-   AMD: 사용하지 마세요. 브라우저 전용.
-   SystemJS: 좋은 시도였다. ES 모듈이 대체했다.
-   ES Modules: 아직 준비가 안됨.

이제 이들은 자바스크립트를 생성하기 위한 옵션일 뿐입니다. 이 옵션 대신 `module:commonjs`를 사용하십시요.

_write_ 타입스크립트 모듈이 엉망입니다. 다시 여기에 그것을 하지 않는 방법이 있습니다. _today_

-   `import foo = require('foo')`. i.e. `import/require`. Use ES module syntax instead.

좋아, 방해되지 않으면서, ES 모듈 문법을 살펴볼 수 있습니다.

> 설명: `module:commonjs`는 ES 모듈 구문을 사용하여 import / export /author 사용할 수 있다.

### ES Module syntax

-   예를들어 `export`는 접두사 키워드를 사용하면 변수를 손쉽게 내보낼수 있다.

```js
// file `foo.ts`
export let someVar = 123
export type SomeType = {
    foo: string
}
```

-   예를들어 `export`는 변수 또는 타입을 내보낼때도 사용할 수 있다.

```js
// file `foo.ts`
let someVar = 123
type SomeType = {
    foo: string
}
export { someVar, SomeType }
```

-   예를들어 `export`는 변수를 내보낼때 이름을 바꿔서 내보낼수 있습니다.

```js
// file `foo.ts`
let someVar = 123
export { someVar as aDifferentName }
```

-   예를들어 `import`는 변수 또는 타입을 가져와 사용할 수 있습니다.

```js
// file `bar.ts`
import { someVar, SomeType } from './foo'
```

-   예를들어 `import`는 변수 또는 타입의 이름을 바꿔서 사용할 수 있습니다.

```js
// file `bar.ts`
import { someVar as aDifferentName } from './foo'
```

-   예를들어 `import * as`는 모듈의 이름에서 모든 것을 가져옵니다.

```js
// file `bar.ts`
import * as foo from './foo'
// you can use `foo.someVar` and `foo.SomeType` and anything else that foo might export.
```

-   단일 import를 사용하여 오직 하나의 파일만을 가져와야 합니다. 그렇지않으면 사이드이펙트가 발생할수 입니다.
-   Import a file _only_ for its side effect with a single import statement:

```js
import 'core-js' // a common polyfill library
```

-   다른 모든 항목의 모듈 내보내기

```js
export * from './foo'
```

-   다른 모듈에서 일부 항목만 다시 내보내기

```js
export { someVar } from './foo'
```

-   다른 모듈에서 일부 항목을 이름을 바꿔서 내보내기

```js
export { someVar as aDifferentName } from './foo'
```

### Default exports/imports

다음에 학습할 내용은, 기본 내보내기입니다. 기본 내보내기 문법은 아래처럼 사용할 수 있습니다.

-   Export using `export default`
    -   before a variable (no `let / const / var` needed)
    -   before a function
    -   before a class

```js
// some var
export default someVar = 123;
// OR Some function
export default function someFunction() { }
// OR Some class
export default class SomeClass { }
```

-   예를들어 가져오기는 `import someName from "someModule"` 이런 문법으로 사용해야 합니다. (당신은 name을 이용해 원하는 뭐든지 가져올수 있습니다.)

```js
import someLocalNameForThisFile from '../foo'
```

### Module paths

> 나는 `moduleResolution: "Node"` 라고 가정하려고 합니다. 이것은 타입스크립트 구성에 있어야하는 옵션입니다. 이 설정은 `module:commonjs`를 의해 자동으로 암시됩니다.

모듈들은 두가지 분명한 유형이 있습니다. 구별은 import문의 경로에 의해 결정됩니다. (예를들어 `import foo from 'THIS IS THE PATH SECTION'`)

-   모듈의 상대경로는 (`./someFile` 또는 `../../someFolder/someFile` 와 같이 `.`으로 시작합니다.)
-   다른 동적검색 모듈들은 (예를들어 `'core-js'` 또는 `'typestyle'` 또는 `'react'` 또는 `'react/core'`등)

가장 큰 차이점은 모듈이 파일 시스템에서 해석된다는 점 입니다.

> 나는 검색패턴을 언급한 후에 설명할 개념적 용어인 *place*를 사용할 것이다.

#### Relative path modules

예를들어 상대 경로는 다음과 같이 쉽게 사용할 수 있다.

-   if file `bar.ts` does `import * as foo from './foo';` 같은 경로 폴더에 있는 `foo`가 존재하면 가져옵니다.
-   if file `bar.ts` does `import * as foo from '../foo';` 위에 있는 폴더에 `foo`가 존재하면 가져옵니다.
-   if file `bar.ts` does `import * as foo from '../someFolder/foo';` `sameFolder` 폴더 안에 `foo`가 존재하면 가져옵니다.

또는 당신이 생각할 수 있는 다른 모든 상대 경로

#### Dynamic lookup

import로 가져온 경로가 상대 경로가 아닐때, 옆의 링크를 클릭하여 검색 [_node style resolution_](https://nodejs.org/api/modules.html#modules_all_together). 여기 간단한 예제가 있습니다.

-   `import * as foo from 'foo'` 이 코드는 아래처럼 순서대로 실행됩니다.

    -   `./node_modules/foo`
    -   `../node_modules/foo`
    -   `../../node_modules/foo`
    -   파일 시스템이 루트까지 찾습니다.

-   `import * as foo from 'something/foo'` 이 코드는 아래처럼 순서대로 실행됩니다.
    -   `./node_modules/something/foo`
    -   `../node_modules/something/foo`
    -   `../../node_modules/something/foo`
    -   파일 시스템이 루트까지 찾습니다.

### What is _place_

제가 말한곳에서 체크 된 곳은 그 곳에서 다음과 같은 것들이 체크됨을 의미합니다. 예: `foo`

-   `foo.ts`, `foo/index.ts` 파일이거나 폴더내에 index.ts가 존재
-   `foo/package.json`에 키에 지정한 파일이 있고 `types`에 key가 정의
-   `foo/package.json`에 키에 지정한 파일이 있고 `main`에 key가 정의

파일이 실제로 의미하는 것은 `.ts` / `.d.ts` 그리고 `.js`.

그리고 그게 전부입니다. 이제 모듈 조회 전문가가 되었습니다.

### Overturning dynamic lookup _just for types_

`declare module 'somePath'` 사용해서 모듈을 프로젝트 전역에서 선언할 수 있습니다. 그리고 import는 경로를 모듈네임으로 지정합니다.

e.g.

```ts
// global.d.ts
declare module 'foo' {
    // Some variable declarations
    export var bar: number /*sample*/
}
```

and then:

```ts
// anyOtherTsFileInYourProject.ts
import * as foo from 'foo'
// TypeScript assumes (without doing any lookup) that
// foo is {bar:number}
```

### `import/require` for importing type only

다음 문:

```ts
import foo = require('foo')
```

두가지 실제 상황:

-   import는 foo 모듈의 타입 정보를 가져옵니다.
-   foo 모듈의 런타임의 종속성을 지정합니다.

지정한 타입 정보만 로드되고 런타임 종속성이 발생하지 않도록 선택할 수 있습니다.
계속하기전에 책의 섹션을 다시 요약할 수 있습니다. [_declaration spaces_](../project/declarationspaces.md)

변수 선언 공간에서 가져온 이름을 사용하지 않으면 생성된 자바스크립트에서 완전히 제거됩니다. 이것은 예제를 통해 가장 잘 설명됩니다.

#### Example 1

```ts
import foo = require('foo')
```

자바스크립트가 생성됨
will generate the JavaScript:

```js
```

맞아. foo를 사용하지 않으니 비어있습니다.

#### Example 2

```ts
import foo = require('foo')
var bar: foo
```

자바스크립트가 생성됨

```js
var bar
```

왜냐하면 `foo`가 (또는 `foo.bas`와 같은 속성) 있다고 가정하면 변수에서 사용되지 않기 때문입니다.

#### Example 3

```ts
import foo = require('foo')
var bar = foo
```

자바스크립트가 생성됨 (commonjs라고 가정)

```js
var foo = require('foo')
var bar = foo
```

`foo` 변수는 사용됨

### Use case: Lazy loading

타입 추론은 솔직해야합니다. `bar` 파일에서 `foo`파일의 어떤 타입을 사용하기를 원한다면

```ts
import foo = require('foo')
var bar: foo.SomeType
```

그러나 특정조건에서 `foo`파일만 불러오기를 원할 수 있습니다. 그런 경우에는 type annotation 및 **not**로 `import`를 변수이름으로 사용해야 합니다. 이렇게하면 타입스크립트에서 주입되는 런타임 종속성 코드가 제거됩니다. 그런 다음 모듈 로더와 관련된 코드를 사용하여 실제 모듈을 수동으로 가져오십시오.

다음 예제는 `commonjs`에 기반을 둔 코드입니다. `foo` 모듈을 특정 함수내에서 호출하고 있습니다.

```ts
import foo = require('foo')

export function loadFoo() {
    // This is lazy loading `foo` and using the original module *only* as a type annotation
    var _foo: typeof foo = require('foo')
    // Now use `_foo` as a variable instead of `foo`.
}
```

유사한 예제가 있습니다. (requirejs를 사용한)

```ts
import foo = require('foo')

export function loadFoo() {
    // This is lazy loading `foo` and using the original module *only* as a type annotation
    require(['foo'], (_foo: typeof foo) => {
        // Now use `_foo` as a variable instead of `foo`.
    })
}
```

이 패턴은 일반적으로 사용됩니다.

-   특정 경로에서 특정 자바스크립트를 로드하는 웹앱에서
-   애플리케이션 부팅 속도를 올리려면 당신은 특정 모듈을 로드하는 node 애플리케이션을 사용해야 합니다.

### Use case: Breaking Circular dependencies

lazy 로딩 사례와 마찬가지로 특정 모듈 로더 (commonjs/node 그리고 amd/requirejs) 는 순환 종속성과 함께 작동하지 않습니다.
그런 경우 한 방향으로 lazy 로딩 코드를 사용하고 다른 방향으로 모듈을 앞에 로드하는 것이 유리합니다.

### Use case: Ensure Import

때때로 당신은 파일을 로드할때 사이드 이펙트를 경험할 수 있습니다. (예: 모듈은 다음과 같은 라이브러리와 함께 등록할 수 있습니다. [CodeMirror addons](https://codemirror.net/doc/manual.html#addons) etc.) 그러나 `import/require`만 하면 변환된 자바스크립트에는 모듈에 의존성이 포함되어 있지 않으며 모듈 로더 (예: webpack)가 가져오기를 완전히 무시할 수 있습니다. 이 경우 `ensureImport` 변수를 사용하여 컴파일 된 자바스크립트가 모듈에 의존성을 갖도록 할 수 있습니다.

```ts
import foo = require('./foo');
import bar = require('./bar');
import bas = require('./bas');
const ensureImport: any =
    foo
    && bar
    && bas;
```
