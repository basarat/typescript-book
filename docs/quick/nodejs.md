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
    "build:live": "nodemon --watch 'src/**/*.ts' --exec \"ts-node\" src/index.ts"
  },
```

이제 `npm start`를 실행하면 `index.ts`를 수정할 수 있습니다.

-   nodemon이 해당 명령어를 재실행합니다. (ts-node)
-   ts-node 트랜스파일이 tsconfig.json 및 설치된 타입스크립트 버전을 자동으로 선택합니다.
-   Node.js를 통해 ts-node가 실행되면 자바스크립트를 출력합니다.

자바스크립트 애플리케이션을 배포할 준비가 되면 `npm run build`를 실행하십시요.

## 보너스 포인트

앞에서 이미 언급한 NPM 모듈은 browserify에서 (tsify) 사용하거나 웹팩에서 (ts-loader)를 사용
