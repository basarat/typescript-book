## `strictNullChecks`
By default `null` and `undefined` are assignable to all types in TypeScript e.g.

```ts
let foo: number = 123;
foo = null; // Okay
foo = undefined; // Okay
```

This is modelled after how a lot of people write JavaScript. However like all things TypeScript allows you to be *explicit* about what *can and cannot be* assigned a `null` or `undefined`.

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

Not every member will provide theire age, so the `age` is an optional property. It means the value of  `age` will probably be `undefined`.

`undefined` is the root of all evil. It always lead to runtime error. We are always easy to write some code that will probably throw `Error`:

```ts
getMember()
  .then(member: Member => {
    const stringifyAge = member.age.toString() // probably throw Cannot read property 'toString' of undefined
  })
```

But in strict null checking mode, it will throw an error at compile time:

```ts
getMember()
  .then(member: Member => {
    const stringifyAge = member.age.toString() // Object is possibly 'undefined'
  })
```
