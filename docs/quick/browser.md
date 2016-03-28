# TypeScript in the browser
If you are using TypeScript to create a web application here are my recommendations:

## General Machine Setup

* Install [NodeJS](https://nodejs.org/en/download/)

## Project Setup
* Create a project dir
```
mkdir your-project
cd your-project
```
* Create `tsconfig.json`. We discuss [modules here](../project/external-modules.md). Also good to have it setup for `tsx` compilation out of the box.
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
* Create an npm project:
```
npm init -y
```
* Install TypeScript-nightly, webpack, [`ts-loader`](https://github.com/TypeStrong/ts-loader/)
```
npm install typescript@next webpack ts-loader --save-dev
```
* Create a `webpack.config.js` to bundle your modules into a single `bundle.js` file that contains all your resources:
```js
module.exports = {
    entry: './src/app.ts',
    output: {
        filename: './dist/bundle.js'
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
* Setup an npm script to run a build. In your `package.json` add a `script` section:
```json
"scripts": {
  "watch": "webpack --watch"
},
```

Now just run the following (in the directory that contains `webpack.config.js`):

```
npm run watch
```

Now if you make edits to your `ts` or `tsx` file webpack will generate `bundle.js` for you. Serve this up using your web server 🌹.
