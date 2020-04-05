# `@types`

[Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) 는 타입스크립트의 가장 큰 장점 중 하나입니다. 커뮤니티는 효과적으로 자바스크립트 프로젝트의 거의 90%가 자연스럽게 진행되고 **문서화**되었습니다.

즉, 이러한 프로젝트를 상호적인 또는 탐색 방식으로 사용할 수 있으며 별도의 창에서 문서를 열 필요가 없으며 오타가 발생하지 않도록 해야 합니다.

## `@types` 사용

`npm`을 이용해서 꽤 간단하게 설치가 가능합니다. 예를 들어 `jquery`에 대한 타입 정의를 다음과 같이 간단히 할 수 있습니다.

```
npm install @types/jquery --save-dev
```

`@types`는 **전역** 과 **모듈** 타입 정의를 모두 지원합니다.

### 전역 `@types`

기본적으로 전역 소비를 지원하는 모든 정의가 자동으로 포함됩니다. 예: `jquery`의 경우 프로젝트 전역에서 `$`를 사용할 수 있어야 합니다.

그러나 `jquery`와 같은 라이브러리의 경우 일반적으로 모듈로 사용하는 걸 추천합니다.

### 모듈 `@types`

설치 후 특별한 구성이 필요하지 않습니다. 모듈처럼 사용하십시요. 아래 참고

```ts
import * as $ from 'jquery'

// Use $ at will in this module :)
```

## 전역 통제

위에서 보듯이 전역 누출을 자동으로 허용하는 정의를 갖는 것은 일부 팀에게 문제가 될 수 있습니다. 따라서 **명쾌하게** 선택하면 `tsconfig.json` `compilerOptions.types` 를 사용하여 적합한 유형만 가져올 수 있습니다.

```json
{
    "compilerOptions": {
        "types": ["jquery"]
    }
}
```

위의 예제는 `jquery`만 사용할 수 있는 예제를 보여줍니다. 사용자가 `npm install @types/node`와 같은 다른 정의를 설치하더라도 (예: [`process`](https://nodejs.org/api/process.html)) 전역은 `tsconfig.json`에 types 옵션으로 추가할때 까지 코드에 누출되지 않습니다.
