## `strictNullChecks`
By default `null` and `undefined` are assignable to all types in TypeScript e.g.

```ts
let foo: number = 123;
foo = null; // Okay
foo = undefined; // Okay
```

This is modelled after how a lot of people write JavaScript. However like all things, TypeScript allows you to be *explicit* about what *can and cannot be* assigned a `null` or `undefined`.

In strict null checking mode, `null` and `undefined` are different:

```ts
let foo = undefined;
foo = null; // NOT Okay
``` 

Let say we have a `Member` interface:

```ts
interface Member {
  name: string,
  age?: number
}
```

Not every `Member` will provide their age, so `age` is an optional property, meaning the value of `age` may or may not be `undefined`.

`undefined` is the root of all evil. It often leads to runtime errors. It is easy to write code that will throw `Error` at runtime:

```ts
getMember()
  .then(member: Member => {
    const stringifyAge = member.age.toString() // Cannot read property 'toString' of undefined
  })
```

But in strict null checking mode, this error will be caught at compile time:

```ts
getMember()
  .then(member: Member => {
    const stringifyAge = member.age.toString() // Object is possibly 'undefined'
  })
```

### Non-Null Assertion Operator

A new `!` post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts where the type checker is unable to conclude that fact. For example: 

```ts
// Compiled with --strictNullChecks
function validateEntity(e?: Entity) {
    // Throw exception if e is null or invalid entity
}

function processEntity(e?: Entity) {
    validateEntity(e);
    let a = e.name;  // TS ERROR: e may be null.
    let b = e!.name;  // Assert that e is non-null. This allows you to access name
}
```
> Note that it is just an assertion, and just like type assertions *you are responsible* for making sure the value is not null. A non-null assertion is essentially you telling the compiler "I know it's not null so let me use it as though it's not null".
