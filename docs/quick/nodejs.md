# TypeScript with Node.js

타입스크립트는 처음부터 Node.js에 대해 *first class*를 지원했습니다. 빠르게 Node.js로 프로젝트를 구성하는 방법은 다음과 같습니다.

> 메모: 이러한 많은 단계는 일반적인 Node.js 설정 단계입니다.

1. Node.js 프로젝트 설정에는 `package.json`이 필요합니다. 이 파일을 빠르게 생성하는 방법은 `npm init -y`
1. 타입스크립트를 추가 (`npm install typescript --save-dev`)
1. `node.d.ts`를 추가 (`npm install @types/node --save-dev`)
1. 타입스크립트 옵션은 `tsconfig.json`을 이용해서 초기화하고 설정할수 있습니다. (`npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs`)

타입스크립트는 node modules에 설치된 모든것을 (예: `import * as fs from 'fs';`)를 이용해서 안전하게 가져올수 있습니다.

타입스크립트 `src`에 있는 모든 코드는 자바스크립트의 `lib`에 생성됩니다.

## 보너스: Live compile + run (실시간 컴파일 + 실행)

-   `ts-node`는 어떤것이든 실행이후 실시간 컴파일을 지원합니다. 추가는 (`npm install ts-node --save-dev`)
-   `nodemon`은 `ts-node`가 파일이 변경될때마다 동작합니다. 추가는 (`npm install nodemon --save-dev`)

`package.json`에서 `script`를 지정할 수 있고 기본적인 진입점을 가정하면 예:`index.ts`:

```json
  "scripts": {
    "start": "npm run build:live",
    "build": "tsc -p .",
    "build:live": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts"
  },
```

이제 `npm start`를 실행하면 `index.ts`를 수정할 수 있습니다.

-   nodemon이 해당 명령어를 재실행합니다. (ts-node)
-   ts-node 트랜스파일이 tsconfig.json 및 설치된 타입스크립트 버전을 자동으로 선택합니다.
-   Node.js를 통해 ts-node가 실행되면 자바스크립트를 출력합니다.

자바스크립트 애플리케이션을 배포할 준비가 되면 `npm run build`를 실행하십시요.

## 타입스크립트에서 node modules를 생성

-   [타입스크립트에서 node modules를 생성하는 수업](https://egghead.io/lessons/typescript-create-high-quality-npm-packages-using-typescript)

컴파일 시간 안정성과 자동완성 기능이 향상되어 타입스크립트로 작성된 모듈을 사용하는 것은 매우 재미있습니다.

고품질의 타입스크립트 모듈을 만드는 것은 간단합니다. 패키지에 대해 원하는 폴더 구조를 가정하십시요.

```text
package
├─ package.json
├─ tsconfig.json
├─ src
│  ├─ All your source files
│  ├─ index.ts
│  ├─ foo.ts
│  └─ ...
└─ lib
  ├─ All your compiled files
  ├─ index.d.ts
  ├─ index.js
  ├─ foo.d.ts
  ├─ foo.js
  └─ ...
```

-   내부에 `tsconfig.json`가 있고

    -   옵션에는 `compilerOptions`: `"outDir": "lib"` 그리고 `"declaration": true` 이것은 컴파일된 js파일을 lib폴더 생성 하겠다고 선언한것입니다.
    -   또 다른 옵션으로는 `include: ["./src/**/*"]` 포함할 모든 파일은 `src`폴더에 지정

-   그리고 `package.json` 파일도 있습니다.
    -   `"main": "lib/index"` Node.js로 로드할 경우 `lib/index.js`를 지정
    -   `"types": "lib/index"` 타입도 마찬가지로 `lib/index.d.ts`를 지정

Example 패키지:

-   `npm install typestyle` [타입스타일](https://www.npmjs.com/package/typestyle)
-   Usage: `import { style } from 'typestyle';` 타입을 안전하게 사용하는 방법.

MORE:

-   패키지가 다른 타입스크립트 패키지에 의존하는 경우 원시 JS 패키지와 마찬가지로 `dependencies`/`devDependencies`/`peerDependencies`에 넣으십시요.
-   패키지가 다른 자바스크립트 패키지에 의존하는 경우에는 프로젝트에 안전하게 타입을 이용하려면 (예: `@types/foo`) 를 `devDependencies`에 넣으십시요. 자바스크립트 타입은 NPM 스트림에서 *out of bound*로 관리되어야 합니다. 자바스크립트는 일반적으로 타입을 구분하므로 만약 당신이 `@types/foo` 타입이 필요한 경우에는 해당 버전을 설치하십시요.

## 보너스 포인트

앞에서 이미 언급한 NPM 모듈은 browserify에서 (tsify) 사용하거나 웹팩에서 (ts-loader)를 사용
