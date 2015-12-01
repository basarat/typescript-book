### Declaration file
You can tell TypeScript that you are trying to describe code that exists elsewhere (e.g. written in JavaScript/CoffeeScript/The runtime environment like the browser or nodejs) using the `declare` keyword. As a quick example: 

```ts
foo = 123; // Error: `foo` is not defined
```
vs.
```ts
declare var foo:any;
foo = 123; // allowed 
```

You have the option of putting these declarations in a `.ts` file or in a `.d.ts` file. We highly recommend you in your real world projects you use a separate `.d.ts` (start with one called something like `globals.d.ts` or `vendor.d.ts`).

If a file has the extension `.d.ts` then each root level definition much have the `declare` keyword prefixed to it to make it clear that the author knows that there will be *no code emitted by TypeScript to ensure that this defined item will exist at runtime*. 

> 
* Ambient declarations is a promise that you are making with the compiler. If these do not exist at runtime and you try to you them, things will break without warning.
* Ambient declarations are like docs. If the source changes the docs need to be kept updated. So you might have new behaviours that work at runtime but no one's updated the ambient declaration and hence you get compiler errors.
