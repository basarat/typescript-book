# TypeScript in the browser
If you are using TypeScript to create a web application here are my recommendations:

## General Machine Setup
Install `webpack`:
```
npm install webpack -g
```

## Project Setup
* Use external modules in tsconfig (best `"module":"commonjs"`). We discuss [modules here](../project/external-modules.md))
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

* Install [`ts-loader`](https://github.com/TypeStrong/ts-loader/) `npm install ts-loader --save-dev`
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
