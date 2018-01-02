* [lib.d.ts](#libdts)
* [Example Usage](#example-usage)
* [Inside look](#libdts-inside-look)
* [Modifying Native types](#modifying-native-types)
* [Using custom lib.d.ts](#using-your-own-custom-libdts)
* [Compiler `target` effect on lib.d.ts](#compiler-target-effect-on-libdts)
* [`lib` option](#lib-option)
* [Polyfill for old JavaScript engines](#polyfill-for-old-javascript-engines)

## `lib.d.ts`

A special declaration file `lib.d.ts` ships with every installation of TypeScript. This file contains the ambient declarations for various common JavaScript constructs present in JavaScript runtimes and the DOM.

* This file is automatically included in the compilation context of a TypeScript project.
* The objective of this file is to make it easy for you to start writing *type checked* JavaScript code.

You can exclude this file from the compilation context by specifying the `--noLib` compiler command line flag (or `"noLib" : true` in `tsconfig.json`).

### Example Usage

As always let's look at examples of this file being used in action:

```ts
var foo = 123;
var bar = foo.toString();
```
This code type checks fine *because* the `toString` function is defined in `lib.d.ts` for all JavaScript objects.

If you use the same sample code with the `noLib` option you get a type check error:

```ts
var foo = 123;
var bar = foo.toString(); // ERROR: Property 'toString' does not exist on type 'number'.
```
So now that you understand the importance of `lib.d.ts` what does its contents look like? We examine that next.

### `lib.d.ts` inside look

The contents of `lib.d.ts` are primarily a bunch of *variable* declarations e.g. `window`, `document`, `math` and a bunch of similar *interface* declarations e.g. `Window` , `Document`, `Math`.

The simplest way to discover what is what is to type in code *that you know works* e.g. `Math.floor` and then F12 (go to definition) using your IDE (atom-typescript has great support for this).

Let's look at a sample *variable* declaration, e.g. `window` is defined as:
```ts
declare var window: Window;
```
That is just a simple `declare var` followed by the variable name (here `window`) and an interface for a type annotation (here the `Window` interface). These variables generally point to some global *interface* e.g. here is a small sample of the (actually quite massive) `Window` interface:

```ts
interface Window extends EventTarget, WindowTimers, WindowSessionStorage, WindowLocalStorage, WindowConsole, GlobalEventHandlers, IDBEnvironment, WindowBase64 {
    animationStartTime: number;
    applicationCache: ApplicationCache;
    clientInformation: Navigator;
    closed: boolean;
    crypto: Crypto;
    // so on and so forth...
}
```
You can see that here is a *lot* of type information in these interfaces. In the absence of TypeScript *you* would need to keep this in *your* head. Now you can offload that knowledge on the compiler with easy access to it using things like `intellisense`.

There is a good reason for using *interfaces* for these globals. It allows you to *add additional properties* to these globals *without* a need to change `lib.d.ts`. We will cover this concept next.

### Modifying native types

Since an `interface` in TypeScript is open ended this means that you can just add members to the interfaces declared in `lib.d.ts` and TypeScript will pick up on the additions. Note that you need to make these changes in a [*global module*](../project/modules.md) for these interfaces to get associated with `lib.d.ts`. We even recommend creating a special file called [`globals.d.ts`](../project/globals.md) for this purpose.

Here are a few example cases where we add stuff to `window`, `Math`, `Date`:

#### Example `window`

Just add stuff to the `Window` interface e.g.:

```ts
interface Window {
    helloWorld(): void;
}
```

This will allow you to use it in a *type safe* manner:

```ts
// Add it at runtime
window.helloWorld = () => console.log('hello world');
// Call it
window.helloWorld();
// Misuse it and you get an error:
window.helloWorld('gracius'); // Error: Supplied parameters do not match the signature of the call target
```

#### Example `Math`
The global variable `Math` is defined in `lib.d.ts` as (again, use your dev tools to navigate to definition):

```ts
/** An intrinsic object that provides basic mathematics functionality and constants. */
declare var Math: Math;
```

i.e. the variable `Math` is an instance of the `Math` interface. The `Math` interface is defined as:

```ts
interface Math {
    E: number;
    LN10: number;
    // others ...
}
```

This means that if you want to add stuff to the `Math` global variable you just need to add it to the `Math` global interface, e.g. consider the [`seedrandom` project](https://www.npmjs.com/package/seedrandom) which adds a `seedrandom` function to the global `Math` object. This can be declared quite easily:

```ts
interface Math {
    seedrandom(seed?: string);
}
```

And then you can just use it:

```ts
Math.seedrandom();
// or
Math.seedrandom("Any string you want!");
```

#### Example `Date`

If you will look on the definition of the `Date` *variable* in `lib.d.ts` you will find:

```ts
declare var Date: DateConstructor;
```
The interface `DateConstructor` is similar to what you have seen before with `Math` and `Window` in that it contains members you can use off of the `Date` global variable e.g. `Date.now()`. In addition to these members it contains *construct* signatures which allow you to create `Date` instances (e.g. `new Date()`). A snippet of the `DateConstructor` interface is shown below:

```ts
interface DateConstructor {
    new (): Date;
    // ... other construct signatures

    now(): number;
    // ... other member functions
}
```

Consider the project [`datejs`](https://github.com/abritinthebay/datejs). DateJS adds members to both the `Date` global variable and `Date` instances. Therefore a TypeScript definition for this library would look like ([BTW the community has already written this for you in this case](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/datejs/index.d.ts)):

```ts
/** DateJS Public Static Methods */
interface DateConstructor {
    /** Gets a date that is set to the current date. The time is set to the start of the day (00:00 or 12:00 AM) */
    today(): Date;
    // ... so on and so forth
}

/** DateJS Public Instance Methods */
interface Date {
    /** Adds the specified number of milliseconds to this instance. */
    addMilliseconds(milliseconds: number): Date;
    // ... so on and so forth
}
```
This allows you to do stuff like the following in a TypeSafe manner:

```ts
var today = Date.today();
var todayAfter1second = today.addMilliseconds(1000);
```

#### Example `string`

If you look inside `lib.d.ts` for string you will find stuff similar to what we saw for `Date` (`String` global variable, `StringConstructor` interface, `String` interface). One thing of note though is that the `String` interface impacts string *literals* as well as demonstrated in the below code sample:

```ts

interface String {
    endsWith(suffix: string): boolean;
}

String.prototype.endsWith = function(suffix: string): boolean {
    var str: string = this;
    return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
}

console.log('foo bar'.endsWith('bas')); // false
console.log('foo bas'.endsWith('bas')); // true
```

Similar variable / interfaces exist for other things that have both static and instance member like `Number`, `Boolean`, `RegExp`, etc. and these interfaces affect literal instances of these types as well.

### Example `string` redux

We recommended creating a `global.d.ts` for maintainability reasons. However you can break into the *global namespace* from within *a file module* if you desire so. This is done using `declare global { /*global namespace here*/ }`. E.g. the previous example can also be done as:

```ts
// Ensure this is treated as a module.
export {};

declare global {
    interface String {
        endsWith(suffix: string): boolean;
    }
}

String.prototype.endsWith = function(suffix: string): boolean {
    var str: string = this;
    return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
}

console.log('foo bar'.endsWith('bas')); // false
console.log('foo bas'.endsWith('bas')); // true
```

### Using your own custom lib.d.ts
As we mentioned earlier using the `noLib` boolean compiler flag causes TypeScript to exclude the automatic inclusion of `lib.d.ts`. There are various reasons why this is a useful feature. Here are a few of the common ones:

* You are running in a custom JavaScript environment that differs *significantly* from the standard browser based runtime environment.
* You like to have *strict* control over the *globals* available in your code. E.g. lib.d.ts defines `item` as a global variable and you don't want this to leak into your code.

Once you have excluded the default `lib.d.ts` you can include a similarly named file into your compilation context and TypeScript will pick it up for type checking.

> Note: be careful with `--noLib`. Once you are in noLib land, if you chose to share your project with others, they will be *forced* into noLib land (or rather *your lib* land). Even worse, if you bring *their* code into your project you might need to port it to *your lib* based code.

### Compiler target effect on `lib.d.ts`

Setting the compiler target to be `es6` causes the `lib.d.ts` to include *additional* ambient declarations for more modern (es6) stuff like `Promise`. This magical effect of the compiler target changing the *ambience* of the code is desirable for some people and for others it's problematic as it conflates *code generation* with *code ambience*.

However if you want finer grained control of your environment you should use the `--lib` option which we discuss next.

### lib option

Sometimes (many times) you want to decouple the relationship between the compile target (the generated JavaScript version) and the ambient library support. A common example is `Promise`, e.g. today (in June 2016) you most likely want to `--target es5` but still use latest stuff like `Promise`. To support this you can take explicit control of `lib` using the `lib` compiler option.

> Note: using `--lib` decouples any lib magic from `--target` giving you better control.

You can provide this option on the command line or in `tsconfig.json` (recommended):

**Command line**:
```
tsc --target es5 --lib dom,es6
```
**tsconfig.json**:
```json
"compilerOptions": {
    "lib": ["dom", "es6"]
}
```

The libs can be categorized into categories:

* JavaScript Bulk Feature:
    * es5
    * es6
    * es2015
    * es7
    * es2016
    * es2017
    * esnext
* Runtime Environment
    * dom
    * dom.iterable
    * webworker
    * scripthost
* ESNext By-feature options (even smaller than bulk feature)
    * es2015.core
    * es2015.collection
    * es2015.generator
    * es2015.iterable
    * es2015.promise
    * es2015.proxy
    * es2015.reflect
    * es2015.symbol
    * es2015.symbol.wellknown
    * es2016.array.include
    * es2017.object
    * es2017.sharedmemory
    * esnext.asynciterable


> NOTE: the `--lib` option provides extremely fine tuned control. So you most likey want to pick an item from the bulk + enviroment categories.
> If --lib is not specified a default library is injected:
  - For --target es5 => es5, dom, scripthost
  - For --target es6 => es6, dom, dom.iterable, scripthost

My Personal Recommentation:

```json
"compilerOptions": {
    "target": "es5",
    "lib": ["es6", "dom"]
}
```

Example Including Symbol with ES5
Symbol API is not included when target is es5. In fact, we receive an error like: [ts] Cannot find name 'Symbol'.
We can use "target": "es5" in combination with "lib" to provide Symbol API in TypeScript:
```json
"compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom", "scripthost", "es2015.symbol"]
}
```

# Polyfill for old JavaScript engines

> [Egghead PRO Video on this subject](https://egghead.io/lessons/typescript-using-es6-and-esnext-with-typescript)

There are quite a few runtime features that are like `Map` / `Set` and even `Promise` (this list will ofcourse change over time) that you can use with modern `lib` options. To use these all you need to do is use `core-js`. Simply install: 

```
npm install core-js --save-dev
```
And add an import to your application entry point: 

```js
import "core-js";
```

And it should polyfill these runtime features for you 🌹.
