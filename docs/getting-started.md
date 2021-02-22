-   [타입스크립트 시작하기](#getting-started-with-typescript)
-   [타입스크립트 버전](#typescript-version)

# 타입스크립트 시작하기

타입스크립트는 자바스크립트로 컴파일이 되고 자바스크립트는 브라우저 또는 서버에서 실행될 것 입니다. 그래서 다음에 정의된 목록이 타입스크립트를 시작하는데 필요할 것 입니다.

-   타입스크리트 컴파일러 (OSS available [in source](https://github.com/Microsoft/TypeScript/) and on [NPM](https://www.npmjs.com/package/typescript))
-   타입스크립트 IDE (메모장도 가능하지만 나라면 [vscode 🌹](https://code.visualstudio.com/) 이것을 사용하겠습니다. 또는 [lots of other IDES support it as well](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support))

## 타입스크립트 버전

안정적인 타입스크립트를 사용하는 대신에 이 책에서 버전과 관련이 없는 새로운 내용을 소개할 예정입니다. nightly 버전을 사용하면 버그를 더 많이 찾아낼 수 있기 때문에 추천합니다.

커맨드 라인에 다음 명령어를 실행하십시요

```
npm install -g typescript@next
```

그리고 `tsc` 명령어를 다양한 IDE에서 지원합니다.

-   `.vscode/settings.json`을 통해 타입스크립트 버전을 명시적으로 지정할 수 있습니다.

```json
{
    "typescript.tsdk": "./node_modules/typescript/lib"
}
```

## 소스코드 가져오기

이 책의 출처는 [링크](https://github.com/basarat/typescript-book/tree/master/code) 에서 구할 수 있습니다. 대부분의 코드 샘플을 vscode로 복사할 수 있으며 그대로 사용할 수 있습니다. 추가 설정이 (npm 모듈) 필요한 코드 샘플의 경우 코드를 제시하기 전에 코드를 연결합니다.

`this/will/be/the/link/to/the/code.ts`

```ts
// This will be the code under discussion
```

모두 개발 설정을 하고 타입스크립트 문법 속으로 들어가 봅시다.
