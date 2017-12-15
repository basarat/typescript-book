# TypeScript with Node.js
TypeScript has had *first class* support for Node.js since inception. Here's how to setup a quick Node.js project:

> Note: many of these steps are actually just common practice Node.js setup steps

1. Setup a Node.js project `package.json`. Quick one : `npm init -y`
1. Add TypeScript (`npm install typescript --save-dev`)
1. Add `node.d.ts` (`npm install @types/node --save-dev`)
1. Init a `tsconfig.json` for TypeScript options (`npx tsc --init`)
1. Make sure you have `compilerOptions.module:commonjs` in your tsconfig.json

That's it! Fire up your IDE (e.g. `alm -o`) and play around. Now you can use all the built in node modules (e.g. `import fs = require('fs');`) with all the safety and developer ergonomics of TypeScript!

## Bonus: Live compile + run
* Add `ts-node` which we will use for live compile + run in node (`npm install ts-node --save-dev`)
* Add `nodemon` which will invoke `ts-node` whenever a file is changed (`npm install nodemon --save-dev`)

Now just add a `script` target to your `package.json` based on your application entry e.g. assuming its `index.ts`:

```json
  "scripts": {
    "start": "npm run build:live",
    "build:live": "nodemon --exec ./node_modules/.bin/ts-node -- ./index.ts"
  },
```

So you can now run `npm start` and as you edit `index.ts`:

* nodemon reruns its command (ts-node)
* ts-node transpiles automatically picking up tsconfig.json and the installed typescript version,
* ts-node runs the output javascript through Node.js.

## Creating TypeScript node modules

* [A lesson on creating typescript node modules](https://egghead.io/lessons/typescript-create-high-quality-npm-packages-using-typescript)

Using modules written in TypeScript is super fun as you get great compile time safety and autocomplete (essentially executable documentation).

Creating a high quality TypeScript module is simple. Assume the following desired folder structure for your package:

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


* In your `tsconfig.json`
  * have `compilerOptions`: `"outDir": "lib"` and `"declaration": true` < This generates declaration and js files in the lib folder
  * have `include: ["./src/**/*"]` < This includes all the files from the `src` dir.

* In your `package.json` have
  * `"main": "lib/index"` < This tells Node.js to load `lib/index.js`
  * `"types": "lib/index"` < This tells TypeScript to load `lib/index.d.ts`


Example package:
* `npm install typestyle` [for TypeStyle](https://www.npmjs.com/package/typestyle)
* Usage: `import { style } from 'typestyle';` will be completely type safe.

MORE:

* If you package depends on other TypeScript authored packages, put them in `dependencies`/`devDependencies`/`peerDependencies` just like you would with raw JS packages.
* If you package depends on other JavaScript authored packages and you want to use it type safely in your project, put their types e.g. `@types/foo` in `devDependencies`. JavaScript types should be managed *out of bound* from the main NPM streams. The JavaScript ecosystem breaks types without semantic versioning too commonly, so if your users need types for these they should install the `@types/foo` version that works for them.

## Bonus points

Such NPM modules work just fine with browserify (using tsify) or webpack (using ts-loader).
