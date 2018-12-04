# TypeScript no navegador

Se você estiver usando o TypeScript para criar um aplicativo da Web, aqui estão minhas recomendações para obter uma configuração rápida do projeto do TypeScript + React(minha estrutura de interface do usuário preferida).

## Configuração geral da Máquina

* Instale o [Node.js](https://nodejs.org/en/download/)
* Instale o [Git](https://git-scm.com/downloads)

## Project Setup Quick
Use [https://github.com/basarat/react-typescript](https://github.com/basarat/react-typescript) como base. 

```
git clone https://github.com/basarat/react-typescript.git
cd react-typescript
npm install
```

Agora pule para [desenvolver sua incrível aplicação](#develop-your-amazing-application)

## Configuração do projeto detalhada
Para ver como esse projeto é criado, é documentado abaixo.

* Crie um diretório do projeto:

```
mkdir seu-projecto
cd seu-projecto
```

* Crie o arquivo `tsconfig.json`:

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "module": "commonjs",
    "esModuleInterop": true,
    "resolveJsonModule": true,
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

* Crie o arquivo `package.json`.

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

* Crie um `webpack.config.js` para agrupar seus módulos em um único arquivo `app.js` que contenha todos os seus recursos:

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/app.tsx',
  plugins: [
    new CleanWebpackPlugin(['public/build']),
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

* O arquivo `src/templates/index.html`. Ele será usado como template para o `index.html` gerado pelo webpack. O arquivo gerado estará na pasta `public` e depois será servido no seu servidor web: 

```html
<html>
  <body>
      <div id="root"></div>
  </body>
</html>

```

* `src/app/app.tsx` esse é o seu ponto de entrada do aplicativo frontend: 

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Hello: React.SFC<{ compiler: string, framework: string }> = (props) => {
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

# Develop your amazing application 

> Você pode obter os últimos pacotes usando `npm install typescript@latest react@latest react-dom@latest @types/react@latest @types/react-dom@latest webpack@latest webpack-dev-server@latest webpack-cli@latest ts-loader@latest clean-webpack-plugin@latest html-webpack-plugin@latest --save-exact`

* Inicie o mode desenvolvimento executando `npm start`.
     * Visite [http://localhost:8080](http://localhost:8080)
     * Edite o arquivo `src/app/app.tsx` (ou qualquer arquivo ts/tsx usado de alguma forma por `src/app/app.tsx`) e o aplicativo live reloads.
     * Edite o `src/templates/index.html` e o servidor recarrega em tempo real.
* Construa ativos de produção executando `npm run build`.
     * Servir a pasta `public` (que contém os recursos construídos) do seu servidor.
