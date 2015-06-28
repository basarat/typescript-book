## `lib.d.ts`

A special declaration file `lib.d.ts` ships with every installation of TypeScript. This file contains the ambient declarations for various common JavaScript constructs present in JavaScript runtimes and the DOM. 

* This file is automatically included in the compilation context of a TypeScript project.
* The objective of this file to make it easy for you start writing *type checked* JavaScript code.

You can exclude this file from the compilation context by specifying the `--noLib` compiler command line flag (or `"noLib" : true` in `tsconfig.json`).

### Example Usage

As always lets look at examples of this file being used in action.

```ts
var foo = 123;
var bar = foo.toString();
```
This code type checks fine *because* the `toString` function is defined in `lib.d.ts` for all JavaScript objects.

If you use the same sample code with the `noLib` option you can a type check error: 

```ts
var foo = 123; 
var bar = foo.toString(); // ERROR: Property 'toString' does not exist on type 'number'.
```
So now that you understand the importance of `lib.d.ts` what does its contents look like? We examine that next.

### `lib.d.ts` inside look

The contents of `lib.d.ts` are primarily a bunch of *variable* declarations e.g. `window`, `document`, `math` and a bunch of similar *interface* declarations e.g. `Window` , `Document`, `Math`. 

Lets look at a sample *variable* declaration, e.g. `window` is defined as:
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
```
You can see that here is a *lot* of type information in these interfaces. In the absence of TypeScript *you* would need to keep this in *your* head. Now you can offload that knowledge on the compiler with easy access to it using things like `intellisence`.

There is a good reason for using *interfaces* for these globals. It allows you to *add additional properties* to these globals *without* a need to change `lib.d.ts`. We will cover this concept next.

### Modifying native types

// TODO:

Since an `interface` in TypeScript is open ended this means that you can just add members to the interfaces declared in `lib.d.ts` and TypeScript will pick up on the additions

### Using your own custom lib.d.ts
As we mentioned earlier using the `noLib` boolean compiler flag causes TypeScript to exclude the automatic inclusion of `lib.d.ts`. There are various reasons why this is a useful feature. Here are a few of the common ones: 

* You are running in a custom JavaScript environment that differs *significantly* from the standard browser based runtime environment.
* You like to have *strict* control over the *globals* available in your code. E.g. lib.d.ts defines `item` as a global variable and you don't want this to leak into your code.

Once you have excluded the default `lib.d.ts` you can include a similarly named file into your compilation context and TypeScript will pick it up for type checking.

Note: Be careful with `--noLib`. Once you are in noLib land, if you chose to share your project others, they will be *forced* into noLib land (or rather *your lib* land). Even worse if you bring *their* code into your project you might need to port it to *your lib* based code.

### Compiler target effect on `lib.d.ts`

Setting the compiler target to be `es6` causes the `lib.d.ts` to include *addtional* ambient declarations for more modern stuff like `Promise`. This magical effect of the compiler target changing the *ambience* of the code is desirable for some people and for others its problematic as it compiles *code generation* with *code ambience*. For people that want to compile with both targets it is recommended that they compile with `--noLib` and include their own cutomized `lib.d.ts` as mentioned before.

