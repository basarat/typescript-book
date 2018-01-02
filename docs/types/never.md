# Never

> [A video lesson on the never type](https://egghead.io/lessons/typescript-use-the-never-type-to-avoid-code-with-dead-ends-using-typescript)

Programming language design does have a concept of *bottom* type that is a **natural** outcome as soon as you do *code flow analysis*. TypeScript does *code flow analysis* (😎) and so it needs to reliably represent stuff that might never happen.

The `never` type is used in TypeScript to denote this *bottom* type. Cases when it occurs naturally:

* A function never returns (e.g. if the function body has `while(true){}`)
* A function always throws (e.g. in `function foo(){throw new Error('Not Implemented')}` the return type of `foo` is `never`)

Of course you can use this annotation your self as well

```ts
let foo: never; // Okay
```

However `never` *can only ever be assigned to another never*. e.g.

```ts
let foo: never = 123; // Error: Type number is not assignable to never

// Okay as the function's return type is `never`
let bar: never = (() => { throw new Error('Throw my hands in the air like I just dont care') })();
```

Great. Now let's just jump into its key use case :)

# Use case: Exhaustive Checks

You can call never functions in a never context.

```ts
function foo(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }

  // Without a never type we would error :
  // - Not all code paths return a value (strict null checks)
  // - Or Unreachable code detected
  // But because typescript understands that `fail` function returns `never`
  // It can allow you to call it as you might be using it for runtime safety / exhaustive checks.
  return fail("Unexhaustive!");
}

function fail(message: string): never { throw new Error(message); }
```

And because `never` is only assignable to another `never` you can use it for *compile time* exhaustive checks as well. This is covered in the [*discriminated union* section](./discriminated-unions.md).

# Confusion with `void`

As soon as someone tells you that `never` is returned when a function never exits gracefully you intutively want to think of it as the same as `void` However `void` is a Unit. `never` is a falsum.

A function that *returns* nothing returns a Unit `void`. However a function *that never returns* (or always throws) returns `never`. `void` is something that can be assigned (without `strictNullChecking`) but `never` can `never` be assigned to anything other than `never`.

<!--
PR: https://github.com/Microsoft/TypeScript/pull/8652
Issue : https://github.com/Microsoft/TypeScript/issues/3076
Concept : https://en.wikipedia.org/wiki/Bottom_type
-->
