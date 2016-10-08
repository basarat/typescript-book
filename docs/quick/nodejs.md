# TypeScript with NodeJS
TypeScript has had *first class* support for NodeJS since inception. Here's how to get setup with a NodeJS project in TypeScript:

1. Add `node.d.ts` (`npm install @types/node --save-dev`) to your [compilation context](../project/compilation-context.md).
1. Compile with `--module` set to `"commonjs"`.
1. Add node to the global resolution by simply adding it to `types` in your tsconfig.

So your tsconfig will look like:

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "types": [
            "node"
        ]
    }
}
```

That's it! Now you can use all the built in node modules (e.g. `import fs = require('fs')`) with all the safety and developer ergonomics of TypeScript!


## Creating TypeScript node modules

You can even use other node modules written in TypeScript. As a module author, one real thing you should do:

* you might want to have a `typings` field (e.g. `src/index`) in your `package.json` similar to the `main` field to point to the default TypeScript definition export. For an example look at [`package.json` for csx](https://github.com/basarat/csx/blob/gh-pages/package.json).


Example package: `npm install csx` [for csx](https://www.npmjs.com/package/csx),  usage: `import csx = require('csx')`.


## Bonus points

Such NPM modules work just fine with browserify (using tsify) or webpack (using ts-loader).
