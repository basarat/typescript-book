## Dynamic import expressions 

**Dynamic import expressions** are a new feature and part of **ECMAScript** that allows users to asynchronously request a module at any arbitrary point in your program.
**TC39** JavaScript committee has it’s own proposal which is in stage 3, and it’s called [import() proposal for JavaScript](https://github.com/tc39/proposal-dynamic-import).

From other side, **webpack** bundler has a feature called [**Code Splitting**](https://webpack.js.org/guides/code-splitting/) which allows you to split your bundle into chunks which can be downloaded asynchronously at a later time. For instance, this allows to serve a minimal bootstrap bundle first and to asynchronously load additional features later.

At first glance, it’s natural to think (if we are using webpack in our dev workflow) that by using [TypeScript 2.4 dynamic import expressions](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#dynamic-import-expressions), will **automatically produce** bundle chunks and automatically code-split you JS final bundle. BUT, that is not as easy as it seems, because it depends on the **tsconfig.json configuration** we are working with.

The thing is that webpack code splitting supports two similar techniques to achieve this goal: using **import()** (preferred, ECMAScript proposal) and **require.ensure()** (legacy, webpack specific). And what that means is the expected TypeScript output is **leave the import() statement as it is** instead of transpile it to anything else.

Let’s see and example to figure out how to configure webpack + TypeScript 2.4.

In the following code I want to **lazy load the library moment** but I am interested on code splitting as well, which means, having moment library in a separate chunk of JS (javascript file) and that will be loaded only when required.

```ts
import(/* webpackChunkName: "momentjs" */ "moment")
  .then((moment) => {
      // lazyModule has all of the proper types, autocomplete works,
      // type checking works, code references work \o/
      const time = moment().format();
      console.log("TypeScript >= 2.4.0 Dynamic Import Expression:");
      console.log(time);
  })
  .catch((err) => {
      console.log("Failed to load moment", err);
  });
```

Here is the tsconfig.json:

```json
{
    "compilerOptions": {
        "target": "es5",                          
        "module": "esnext",                     
        "lib": [
            "dom",
            "es5",
            "scripthost",
            "es2015.promise"
        ],                                        
        "jsx": "react",                           
        "declaration": false,                     
        "sourceMap": true,                        
        "outDir": "./dist/js",                    
        "strict": true,                           
        "moduleResolution": "node",               
        "typeRoots": [
            "./node_modules/@types"
        ],                                        
        "types": [
            "node",
            "react",
            "react-dom"
        ]                                       
    }
}
```


**Important notes**:

- Using **"module": "esnext"** TypeScript produces the mimic import() statement to be input for Webpack Code Splitting.
- For further information read this article: [Dynamic Import Expressions and webpack 2 Code Splitting integration with TypeScript 2.4](https://blog.josequinto.com/2017/06/29/dynamic-import-expressions-and-webpack-code-splitting-integration-with-typescript-2-4/).


You can see full example [here][dynamicimportcode].

[dynamicimportcode]:https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/dynamic-import-expressions/dynamicImportExpression.js
