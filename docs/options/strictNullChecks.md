## `strictNullChecks`
By default `null` and `undefined` are assignable to all types in TypeScript e.g.

```ts
let foo: number = 123;
foo = null; // Okay
foo = undefined; // Okay
```

This is modelled after how a lot of people write JavaScript. However like all things TypeScript allows you to be *explicit* about what *can and cannot be* assigned a `null` or `undefined`.
