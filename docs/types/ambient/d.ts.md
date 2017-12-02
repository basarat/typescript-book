### Declaration file
You can tell TypeScript that you are trying to describe code that exists elsewhere (e.g. written in JavaScript/CoffeeScript/The runtime environment like the browser or Node.js) using the `declare` keyword. As a quick example:

```ts
foo = 123; // Error: `foo` is not defined
```
vs.
```ts
declare var foo: any;
foo = 123; // allowed
```

You have the option of putting these declarations in a `.ts` file or in a `.d.ts` file. We highly recommend that in your real world projects you use a separate `.d.ts` (start with one called something like `globals.d.ts` or `vendor.d.ts`).

If a file has the extension `.d.ts` then each root level definition must have the `declare` keyword prefixed to it. This helps make it clear to the author that there will be *no code emitted by TypeScript*. The author needs to ensure that the declared item will exist at runtime.

> * Ambient declarations is a promise that you are making with the compiler. If these do not exist at runtime and you try to use them, things will break without warning.
* Ambient declarations are like docs. If the source changes the docs need to be kept updated. So you might have new behaviours that work at runtime but no one's updated the ambient declaration and hence you get compiler errors.
