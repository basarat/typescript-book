# TypeScript in the browser

[![DesignTSX](https://raw.githubusercontent.com/basarat/typescript-book/master/images/designtsx-banner.png)](https://designtsx.com)

만약 당신이 웹 애플리케이션을 만들기 위해 타입스크립트를 사용한다면 타입스크립트 + 리액트 (나의 UI 프레임워크 선택) 프로젝트 구성을 다음과 같이 할 수 있습니다.

## 일반적인 프로그램 설정

-   설치 [Node.js](https://nodejs.org/en/download/)
-   설치 [Git](https://git-scm.com/downloads)

## 빠르게 프로젝트를 구성

다음을 기본으로 구성하십시요 [https://github.com/basarat/react-typescript](https://github.com/basarat/react-typescript)

```
git clone https://github.com/basarat/react-typescript.git
cd react-typescript
npm install
```

이걸 기본으로 하여 [당신의 멋진운 애플리케이션을 개발하세요.](#develop-your-amazing-application)

## 프로젝트를 구성하는 자세한 방법

이 프로젝트가 어떤 식으로 만들어졌는지 자세한 내용을 알고 싶다면 (그냥 기반으로 사용하는 것이 아니라), 다음에 나온대로 처음부터 만들어 볼 수 있습니다:

-   프로젝트 폴더를 생성

```
mkdir your-project
cd your-project
```

-   Create `tsconfig.json`:

```json
{
    "compilerOptions": {
        "sourceMap": true,
        "module": "commonjs",
        "esModuleInterop": true,
        "resolveJsonModule": true,
        "experimentalDecorators": true,
        "target": "es5",
        "jsx": "react",
        "lib": ["dom", "es6"]
    },
    "include": ["src"],
    "compileOnSave": false
}
```

-   Create `package.json`.

```json
{
    "name": "react-typescript",
    "version": "0.0.0",
    "license": "MIT",
    "repository": {
        "type": "git",
        "url": "https://github.com/basarat/react-typescript.git"
    },
    "scripts": {
        "build": "webpack -p",
        "start": "webpack-dev-server -d --content-base ./public"
    },
    "dependencies": {
        "@types/react": "16.4.10",
        "@types/react-dom": "16.0.7",
        "clean-webpack-plugin": "0.1.19",
        "html-webpack-plugin": "3.2.0",
        "react": "16.4.2",
        "react-dom": "16.4.2",
        "ts-loader": "4.4.2",
        "typescript": "3.0.1",
        "webpack": "4.16.5",
        "webpack-cli": "3.1.0",
        "webpack-dev-server": "3.1.5"
    }
}
```

-   `webpack.config.js`는 당신의 모듈을 번들해서 모든 리소스가 담긴 하나의 `app.js` 파일을 생성할 것 입니다.

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/app.tsx',
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['public/build']
    }),
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html'
    }),
  ],
  output: {
    path: __dirname + '/public',
    filename: 'build/[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}
```

-   `src/templates/index.html` 파일은 웹팩을 사용하면 `index.html` 이 생성됩니다. 이 파일은 웹 서버내에 `public` 폴더에 생성됩니다.

```html
<html>
    <body>
        <div id="root"></div>
    </body>
</html>
```

-   `src/app/app.tsx` 파일은 당신의 프론트 애플리케이션의 시작 지점입니다.

```js
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const Hello: React.FunctionComponent<{
    compiler: string,
    framework: string
}> = props => {
    return (
        <div>
            <div>{props.compiler}</div>
            <div>{props.framework}</div>
        </div>
    )
}

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById('root')
)
```

# 당신은 놀라운 애플리케이션 개발을 할 수 있습니다.

> 당신은 최신 패키지를 사용할 수 있습니다. `npm install typescript@latest react@latest react-dom@latest @types/react@latest @types/react-dom@latest webpack@latest webpack-dev-server@latest webpack-cli@latest ts-loader@latest clean-webpack-plugin@latest html-webpack-plugin@latest --save-exact`

-   `npm start`를 실행하십시요.
-   [http://localhost:8080](http://localhost:8080) 이 url에 접속하십시요.
-   `src/app/app.tsx` 이 파일을 수정하면 애플리케이션이 실시간으로 새로고침 됩니다.
-   `src/templates/index.html` 이 파일을 수정하면 웹서버에서 실시간으로 새로고침 됩니다.
-   제품을 빌드하려면 `npm run build` 을 실행하십시요.
-   빌드가 끝나면 `public` 폴더를 서버에 제공하십시요.
