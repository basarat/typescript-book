# TypeScript in the browser
If you are using TypeScript to create a web application here are my recommendations to get a quick TypeScript + React (my UI framework of choice) project setup.

## General Machine Setup

* Install [Node.js](https://nodejs.org/en/download/)
* Install [Git](https://git-scm.com/downloads)

## Project Setup Quick
Use [https://github.com/basarat/react-typescript](https://github.com/basarat/react-typescript) as a base. 

```
git clone https://github.com/basarat/react-typescript.git
cd react-typescript
npm install
```

Now jump to [develop your amazing application](#develop-your-amazing-application)

## Project Setup Detailed
To see how that project is created, its documented below.

* Create a project dir:

```
mkdir your-project
cd your-project
```

* Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react"
  },
  "include": [
    "src"
  ],
  "compileOnSave": false
}
```

* Create `package.json`.

```json
{
  "name": "react-typescript",
  "version": "0.0.0",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/basarat/typescript-react.git"
  },
  "scripts": {
    "build": "webpack ./webpack.config.js",
    "start": "webpack-dev-server ./webpack.config.js --content-base ./public"
  },
  "dependencies": {
    "@types/react": "16.0.18",
    "@types/react-dom": "16.0.2",
    "react": "16.0.0",
    "react-dom": "16.0.0",
    "ts-loader": "3.0.5",
    "typescript": "2.7.2",
    "webpack": "3.8.1",
    "webpack-dev-server": "2.9.3"
  }
}
```

* Create a `webpack.config.js` to bundle your modules into a single `app.js` file that contains all your resources:

```js
module.exports = {
  devtool: 'inline-source-map',
  entry: './src/app/app.tsx',
  output: {
    path: __dirname + '/public',
    filename: 'build/app.js'
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

* `public/index.html` file that will be served from your webserver: 

```html
<html>
  <body>
      <div id="root"></div>
      <script src="./build/app.js"></script>
  </body>
</html>
```

* `src/app/app.tsx` that is your frontend application entry point: 

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

> You can get the latest packages using `npm install typescript@latest react@latest react-dom@latest @types/react@latest @types/react-dom@latest webpack@latest ts-loader@latest webpack-dev-server@latest --save-dev --save-exact`

* Do live development by running `npm start`. 
    * Visit [http://localhost:8080](http://localhost:8080)
    * Edit the `app.tsx` (or any ts/tsx file in `src`) and application live reloads. 
* Build production assets by running `npm run build`. 
    * Serve the `public` folder (which contains the built assets) from your server.
