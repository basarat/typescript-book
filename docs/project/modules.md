## Modules

### Global Module

By default when you start typing code in a new TypeScript file your code is in a *global* namespace. As a demo consider a file `foo.ts`:

```ts
var foo = 123;
```

If you now create a *new* file `bar.ts` in the same project, you will be *allowed* by the TypeScript type system to use the variable `foo` as if it was available globally:

```ts
var bar = foo; // allowed
```
Needless to say having a global namespace is dangerous as it opens your code up for naming conflicts. We recommend using file modules which are presented next.

### File Module
Also called *external modules*. If you have an `import` or an `export` at the root level of a TypeScript file then it creates a *local* scope within that file. So if we were to change the previous `foo.ts` to the following (note the `export` usage):

```ts
export var foo = 123;
```

We will no longer have `foo` in the global namespace. This can be demonstrated by creating a new file `bar.ts` as follows:

```ts
var bar = foo; // ERROR: "cannot find name 'foo'"
```

If you want to use stuff from `foo.ts` in `bar.ts` *you need to explicitly import it*. This is shown in an updated `bar.ts` below:

```ts
import { foo } from "./foo";
var bar = foo; // allowed
```
Using an `import` in `bar.ts` not only allows you to bring in stuff from other files, but also marks the file `bar.ts` as a *module* and therefore, declarations in `bar.ts` don't pollute the global namespace either.

What JavaScript is generated from a given TypeScript file that uses external modules is driven by the compiler flag called `module`.
