# TypeScript with NodeJS
TypeScript has had *first class* support for NodeJS since inception. Here's how to get setup with a NodeJS project in TypeScript: 

1. Compile with `--module` set to `"commonjs"` (as we mentioned in [modules](../project/external-modules.md))
1. Compile with `--declaration` set to `true`. This gets TypeScript to generate a `.d.ts` file which is what TypeScript looks for in your `node_modules` for using TypeScript NPM modules from other TypeScript modules.
1. Add `node.d.ts` (`tsd install node`) to your [compilation context](../project/compilation-context.md).

That's it! Now you can use all the built in node modules (e.g. `import fs = require('fs')`) with all the safety and developer ergonomics of TypeScript!

You can even use other node modules written in TypeScript (e.g. `npm install csx` [for csx](https://www.npmjs.com/package/csx) usage: `import csx = require('csx')`). One trick here is that you might want to have a `typings` field (e.g. `src/index`) in your `package.json` similar to the `main` field to point to the default TypeScript definition export. For an example look at [`package.json` for csx](https://github.com/basarat/csx/blob/gh-pages/package.json).
