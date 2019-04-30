# Creating TypeScript node modules

* [A lesson on creating TypeScript node modules](https://egghead.io/lessons/typescript-create-high-quality-npm-packages-using-typescript)

Using modules written in TypeScript is super fun as you get great compile time safety and autocomplete (essentially executable documentation).

TypeScript modules can be consumed both in the nodejs (as is) browser (with something like webpack).

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
  ├─ index.d.ts.map
  ├─ index.d.ts
  ├─ index.js
  ├─ foo.d.ts.map
  ├─ foo.d.ts
  ├─ foo.js
  └─ ...
```


* In your `tsconfig.json`
  * have `compilerOptions`: `"outDir": "lib"` + `"declaration": true` + `"declarationMap" : true` < This generates `.js` (JavaScript) `.d.ts` (declarations for TypeSafety) and `.d.ts.map` (enables `declaration .d.ts` => `source .ts` IDE navigation) in the lib folder.
  * have `include: ["src"]` < This includes all the files from the `src` dir.

* In your `package.json` have
  * `"main": "lib/index"` < This tells to load `lib/index.js` for runtime code.
  * `"types": "lib/index"` < This tells TypeScript to load `lib/index.d.ts` for type checking. 


Example package:
* `npm install typestyle` [for TypeStyle](https://www.npmjs.com/package/typestyle)
* Usage: `import { style } from 'typestyle';` will be completely type safe.

MORE:

* If your package depends on other TypeScript authored packages, put them in `dependencies`/`devDependencies`/`peerDependencies` just like you would with raw JS packages.
* If your package depends on other JavaScript authored packages and you want to use it with type safety in your project, put their types (e.g. `@types/foo`) in `devDependencies`. JavaScript types should be managed *out of bound* from the main NPM streams. The JavaScript ecosystem breaks types without semantic versioning too commonly, so if your users need types for these they should install the `@types/foo` version that works for them.
