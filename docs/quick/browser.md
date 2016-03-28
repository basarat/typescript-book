# TypeScript in the browser
If you are using TypeScript to create a web application here are my recommendations:

## General Machine Setup

* Install [NodeJS](https://nodejs.org/en/download/)
* Install `webpack`:
```
npm install webpack -g
```

## Project Setup
* Create a project dir
```
mkdir your-project
cd your-project
```
* Create an npm project: 
```
npm init -y
```
* Use external modules in `tsconfig.json` (best `"module":"commonjs"`). We discuss [modules here](../project/external-modules.md). Also good to have it setup for `tsx` compilation out of the box.
```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true,
        "jsx": "react"
    },
    "exclude": [
        "node_modules"
    ]
}
```
* Install TypeScript nightly
```
npm install typescript@next --save-dev
```
* Install [`ts-loader`](https://github.com/TypeStrong/ts-loader/)
```bash
npm install ts-loader --save-dev
```
* Create a `webpack.config.js` to bundle your modules into a single `bundle.js` file that contains all your resources:
```js
module.exports = {
    entry: './app.ts',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}
```

Now just run the following (in the directory that contains `webpack.config.js`):

```
webpack --watch
```

Now if you make edits to your `ts` or `tsx` file webpack will generate `bundle.js` for you. Serve this up using your web server 🌹.
