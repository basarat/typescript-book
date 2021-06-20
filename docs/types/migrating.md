## Migrating From JavaScript

가령 다음을 가정하면:

-   당신은 자바스크립트를 알고 있습니다.
-   당신은 프로젝트 내에서 사용해야 할 패턴과 도구들을 알고 있습니다. (예: 웹팩).

그 가정을 벗어나면 일반적인 프로세스는 다음 단계로 구성됩니다.

-   `tsconfig.json` 추가
-   `.js` 을 `.ts` 로 소스 코드 파일을 확장할때 `any`를 사용해서 에러가 표시되지 않도록 합니다.
-   타입스크립트에서 새로운 코드를 작성할 때 `any`는 거의 사용하지 마십시오.
-   이전 코드로 돌아가서 타입 주석과 식별된 버그 수정
-   타사 자바스크립트 코드 주변에 definition 사용

이러한 몇가지 사항에 대해 더 자세히 논의하겠습니다.

타입스크립트는 유효한 모든 자바스크립트입니다. 만약 당신이 타입스크립트 컴파일러에 자바스크립트를 컴파일을 시도하면 타입스크립트 컴파일러는 정확히 원래의 자바스크립트를 만듭니다. 이것은 확장자를 `.js` 에서 `.ts` 로 변경해도 코드베이스에 부정적인 영향을 미치지 않습니다.

### 에러 진압

타입스크립트는 원래 자바스크립트 코드와 타입체킹 코드를 확인합니다. 하지만 에러 진단이 생각보다 깔끔하지 않을 수 있습니다. `any`를 사용하면 이런 많은 오류를 진압할 수 있습니다.

```ts
var foo = 123
var bar = 'hey'

bar = foo // ERROR: cannot assign a number to a string
```

비록 **오류가 유효하더라도** (대부분의 경우, 추측 된 정보는 코드 기반의 다양한 부분의 원래 저자가 상상 한 것보다 우수합니다.) 당신의 초점은 이전의 코드를 업데이트 하면서 타입스크립트에서 새로운 코드를 작성하는 것입니다. 아래에서 타입 형식을 사용하여 에러를 억제할수 있습니다.

```ts
var foo = 123
var bar = 'hey'

bar = foo as any // Okay!
```

다른 곳에서는 `any`로 타입 선언을 할 수 있습니다.

```ts
function foo() {
    return 1
}
var bar = 'hey'
bar = foo() // ERROR: cannot assign a number to a string
```

Suppressed:

```ts
function foo(): any {
    // Added `any`
    return 1
}
var bar = 'hey'
bar = foo() // Okay!
```

> 메모: 오류를 억제하는 것은 위험합니다. 그러나 타입스크립트 코드에서 오류를 알 수 있습니다. 대신 주석을 남길 수 있습니다. `//TDOO:`

### 외부 자바스크립트

당신은 자바스크립트를 타입스크립트로 변경할 수 있습니다. 하지만 타입스크립트를 사용하도록 세상을 바꿀수는 없습니다. 여기에서 타입스크립트의 주변 정의 지원이 제공됩니다. 처음에는 `vendor.d.ts`를 만드는 것을 추천합니다. (`.d.ts` 확장자는 이것이 _declaration file_ 이라는 사실을 지정합니다.) 그리고 더러운 것들을 추가하기 시작합니다. 또한 라이브러리에 맞는 파일을 만듭니다. 예. jquery를 위한 `jquery.d.ts`

> 메모: OSS폴더에는 90%이상의 자바스크립트 라이브러리에 대한 타입들이 정의되어 있습니다. [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped). 타입을 작성하기전에 이 링크를 보고 찾아 보는 것이 좋습니다. 그럼에도 불구하고 타입스크립트의 마찰을 줄이는 중요한 지식입니다.

`jquery`의 경우를 고려하면 사소한 정의를 아주 쉽게 만들수 있습니다.

```ts
declare var $: any
```

때로는 무언가 (예: `JQuery`)에 명시적인 주석을 추가하고 타입 선언 공간에 무언가가 필요할 수 있습니다. `type` 키워드를 이용하면 아주 쉽게 할 수 있습니다.

```ts
declare type JQuery = any
declare var $: JQuery
```

이것은 당신에게 업데이트 하기 쉬운 방법을 제공합니다.

앞서 살펴봤던 링크에서 고품질의 `jquery.d.ts`가 존재합니다. [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped). 그러나 이제 타사 자바스크립트를 -> 타입스크립트로 사용할때 마찰을 빠르게 극복하는 방법을 알았습니다. 다음은 주위 선언을 자세하게 살펴보겠습니다.

# 서드파티 NPM 모듈 (Third Party NPM modules)

전역 변수 선언과 유사하게 전역 모듈을 매우 쉽게 선언 할 수 있습니다. 예: `jquery`의 경우 모듈(https://www.npmjs.com/package/jquery)로 사용하려면 다음을 직접 작성해야 합니다.

```ts
declare module 'jquery'
```

그런 다음 필요에 따라 파일로 가져올 수 있습니다.

```ts
import * as $ from 'jquery'
```

> 다시 고품질의 `jquery.d.ts`를 [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) 여기서 훨씬 높은 품질의 제이쿼리 모듈을 획득할 수 있습니다. 그러나 라이브러리에 존재하지 않을 수 있으므로 이제 마이그레이션을 계속하는 마찰이 적은 빠른 방법이 있습니다.

# 외부의 JS가 아닌 리소스 (External non js resources)

어떤 파일이든 예: `.css`파일(웹팩 style loader 또는 css 모듈과 같은 것을 사용하는 경우)은 `*`을 이용하면 간단하게 스타일 선언을 할 수 있습니다. [`globals.d.ts` file](../project/globals.md)

```ts
declare module '*.css'
```

이제 사람들은 css를 가져올 수 있습니다. `import * as foo from "./some/file.css";`

마찬가지로 html 템플릿(예: angular)을 사용하는 경우

```ts
declare module '*.html'
```

# More 
If you want to be more silent about your upgrade because you couldn't get team buy in to move to TypeScript, [TypeScript has a blog post on upgrading silently without having to convince your team up front](https://devblogs.microsoft.com/typescript/how-to-upgrade-to-typescript-without-anybody-noticing-part-1/).
