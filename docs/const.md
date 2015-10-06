### const

`const` is a very welcome addition offered by ES6 / TypeScript. It allows you to be immutable with variables. This is good from a documentation as well as a runtime perspective. To use const just replace `var` with `const`:

```ts
const foo = 123;
```

It is a good practice for both readability and maintainability and avoids using *magic literals* e.g.

```ts
// Low readability
if (x > 10) {
}

// Better!
const maxRows = 10;
if (x > maxRows) {
}
```

> The syntax is much better (IMHO) than other languages that force the user to type something like `let constant foo` i.e. a variable + behavior specifier.

#### Left hand side of assignment cannot be a constant
Constants are immutable after creation

#### const declarations must be initialized
The following is a compiler error:



#### Deep immutability
// TODO
