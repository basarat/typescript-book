# `--outFile` is BAD {#outFile}

Its a bad idea for you to use because of the following reasons:

* Runtime Errors
* Fast compile
* Global scope
* Hard to analyze
* Hard to scale
* `_references`
* Code reuse
* Multiple Targets
* Isolated Compile

## Runtime Errors

If your code depends on any form of js ordering you will get random errors at runtime.

* **class inheritance can break at runtime.**

Consider `foo.ts`: 
```ts
class Foo {
    
}
```

and a `bar.ts`:
```ts
class Bar extends Foo {
    
}
```

If you fail to compile it in correct order e.g. perhaps alphabetically `tsc bar.ts foo.ts` the code will compile fine but error at runtime with `ReferenceError`. 

* **module splitting can fail at runtime.**

Consider `foo.ts`: 
```ts
module App {
    export var foo = 123;
}
```
And `bar.ts`: 
```ts
module App {
    export var bar = foo + 456;
}
```

If you fail to compile it in correct order e.g. perhaps alphabetically `tsc bar.ts foo.ts` the code will compile fine but  *silently* fail at runtime with `bar` set to `NaN`. 

## Fast compile
If you use `--out` then single `.ts` files cannot be codegened into single `.js` files in isolation without unnecessary hacks. `--out` essentially forces a slower incremental build.

Also source maps are positionally sensitive and run-length encoded so most of the map has to be rebuilt on a recompile if you use source maps (which you should!). At high-10s to 100s kloc combined it’s going to get slow.

## Global Scope
Sure you can use name spaces but its still on `window` if you run it in the browser. Namespaces are just an unnecessary workaround. Also `/// <reference` comments introduce a global context in *your code* that can get hard to maintain.

Also if your company has several teams working independently and then someone decides to try integrating two independently written apps there is a high likelihood of a name conflict.

## Hard to analyze
We wish to provide more code analysis tools. These will be easier if you provide us with the dependency chain (implicitly there on a silver platter using external modules). 

Also its not just the *dev tools* that have a hard time making sense of the code. The next human needs to understand a lot of the code base before they start to understand where stuff is actually imported from. Using internal modules also makes code difficult to review in isolation e.g. on github.

## Hard to scale
Really just a result of random runtime errors + slower and slower compile times + difficulty in understanding someone else's code.

## `_references.ts`
Isn't supported by `tsconfig.json` : https://github.com/Microsoft/TypeScript/issues/2472#issuecomment-85330803 You'll have to manually sort the  `files` array. 

## Code reuse
If you want to reuse a portion of your code in another project, with all that *implicit* dependency management, it will be difficult to port it over without potential runtime errors. 

## Multiple Targets
Also if you decide to reuse your browser code in something like nodejs (e.g. for *testing* APIs) you are going to need to port it over to a module system or come up with ugly hacks to make the nodejs `global` your new global scope (i.e. `window`).

## Isolated Compile
Files cannot be compiled in isolation. E.g. consider `a.ts`: 
```ts
module M {
  var s = t;
}
```
Will have different output depending upon whether there is a `b.ts` of the form: 
```ts
module M {
  export var t = 5;
}
```
or 
```ts
var t = 5;
```
So `a.ts` [cannot be compiled in isolation](https://github.com/Microsoft/TypeScript/issues/2715).

## Summary
`--out` is really the job of some build tool. And even such a build tool can benefit from the dependency mentions provided by external modules. So we recommend you use external modules and then let the build tool create a single `.js` for you if you so desire.

https://twitter.com/nycdotnet/status/613705850574778368 

![The Bas Signal](https://pbs.twimg.com/media/CIRSOBmWsAQdzvP.jpg)
