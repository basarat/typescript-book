# TypeScript в браузере

[![DesignTSX](https://raw.githubusercontent.com/basarat/typescript-book/master/images/designtsx-banner.png)](https://designtsx.com)

Если вы используете TypeScript для создания веб-приложения, вот мои рекомендации по быстрой настройке проекта TypeScript + React (мой выбор для пользовательского интерфейса).

## Общая настройка системы

* Установите [Node.js](https://nodejs.org/en/download/)
* Установите [Git](https://git-scm.com/downloads)

## Быстрая настройка проекта
Используйте [https://github.com/basarat/react-typescript](https://github.com/basarat/react-typescript) в качестве базы.

```
git clone https://github.com/basarat/react-typescript.git
cd react-typescript
npm install
```

Теперь перейдите к [разработке своего удивительного приложения](#develop-your-amazing-application)

## Подробная настройка проекта
Ниже можно проследить как этот проект был создан.

* Создайте директорию для проекта:

```
mkdir your-project
cd your-project
```

* Создайте `tsconfig.json`:

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
    "lib": [
      "dom",
      "es6"
    ]
  },
  "include": [
    "src"
  ],
  "compileOnSave": false
}
```

* Создайте `package.json`.

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

* Создайте `webpack.config.js`, чтобы собрать ваши модули в один файл `app.js`, который содержит все ваши ресурсы:

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

* Файл `src/templates/index.html`. Он будет использоваться в качестве шаблона для `index.html`, сгенерированного webpack. Сгенерированный файл будет в папке `public` и затем будет раздаваться с вашего веб-сервера:

```html
<html>
  <body>
      <div id="root"></div>
  </body>
</html>

```

* `src/app/app.tsx` - это точка входа вашего веб-приложения:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Hello: React.FunctionComponent<{ compiler: string, framework: string }> = (props) => {
  return (
    <div>
      <div>{props.compiler}</div>
      <div>{props.framework}</div>
    </div>
  );
}

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById("root")
);
```

# Разрабатывайте свое удивительное приложение

> Вы можете установить самые последние пакеты, используя `npm install typescript@latest react@latest react-dom@latest @types/react@latest @types/react-dom@latest webpack@latest webpack-dev-server@latest webpack-cli@latest ts-loader@latest clean-webpack-plugin@latest html-webpack-plugin@latest --save-exact`

* Используйте реагирующий на изменения сервер, запустив `npm start`.
    * Откройте [http://localhost:8080](http://localhost:8080)
    * Отредактируйте `src/app/app.tsx` (или любой файл ts/tsx, используемый каким-либо образом `src/app/app.tsx`) и приложение обновится.
    * Отредактируйте файл `src/templates/index.html` и сервер обновится.
* Соберите продакшн сборку, запустив `npm run build`.
    * Раздавайте из папки `public` (которая содержит собранные ресурсы) вашего сервера.