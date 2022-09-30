# Never
> [Youtube: Video lesson on the never type](https://www.youtube.com/watch?v=aldIFYWu6xc)

> [Egghead: Video lesson on the never type](https://egghead.io/lessons/typescript-use-the-never-type-to-avoid-code-with-dead-ends-using-typescript)

Programming language design does have a concept of *bottom* type that is a **natural** outcome as soon as you do *code flow analysis*. TypeScript does *code flow analysis* (😎) and so it needs to reliably represent stuff that might never happen.

The `never` type is used in TypeScript to denote this *bottom* type. Cases when it occurs naturally:

* A function never returns (e.g. if the function body has `while(true){}`)
* A function always throws (e.g. in `function foo(){throw new Error('Not Implemented')}` the return type of `foo` is `never`)
* A particular piece of code will never execute (e.g. previous flow control statements ensure it never gets there)


Of course you can use this annotation yourself as well

```ts
let foo: never; // Okay
```

However, *only `never` can be assigned to another never*. e.g.

```ts
let foo: never = 123; // Error: Type number is not assignable to never

// Okay as the function's return type is `never`
let bar: never = (() => { throw new Error(`Throw my hands in the air like I just don't care`) })();
```

Great. Now let's just jump into its key use case :)

# Use case: Exhaustive Checks


```ts
function foo(x: string | number): boolean {
  if (typeof x === "string") {
    // We will only ever up in this block if x is of type string, so the
    // compiler knows x will definitely be a string here. If you try calling
    // number methods on x here, the compiler will throw an error.
    return true;
  } else if (typeof x === "number") {
    // Similar to above, this code block only gets executed if x is a number. We
    // also know that x cannot be a string because of the previous if check.
    return false;
  }

  // What is the type of x here? We can only ever end up executing code past
  // this line if x isn't a string and isn't a number. But the type of x says it
  // can only be number or a string. So this code doesn't seem it will ever
  // run but if asked what is the type of x here typescript has to give us
  // something. So it gives us the bottom type aka never.

  // Thus calling the fail function here type-checks because the fail function
  // wants to take an x of type never. However, if we forget to handle the case
  // of x being string, for example, Typescript will see that we are calling a
  // function that wants an argument of type never with an argument of type
  // string and that is a type error.
  return fail(x, "Unexhaustive!");
}

function fail(val: never, message: string): never { throw new Error(message); }
```

And because `never` is only assignable to another `never` you can use it for *compile time* exhaustive checks as well. This is covered in the [*discriminated union* section](./discriminated-unions.md).

# Confusion with `void`

As soon as someone tells you that `never` is returned when a function never exits gracefully you intuitively want to think of it as the same as `void`. However, `void` is a Unit. `never` is a falsum.

A function that *returns* nothing returns a Unit `void`. However, a function *that never returns* (or always throws) returns `never`. `void` is something that can be assigned (without `strictNullChecking`) but `never` can *never* be assigned to anything other than `never`.

# Type inference in never returning functions

For function declarations TypeScript infers `void` by default as shown below:

```ts
// Inferred return type: void
function failDeclaration(message: string) {
  throw new Error(message);
}

// Inferred return type: never
const failExpression = function(message: string) {
  throw new Error(message);
};
```

Of course you can fix it by an explict annotation: 

```ts
function failDeclaration(message: string): never {
  throw new Error(message);
}
```

Key reason is backword compatability with real world JavaScript code: 

```ts
class Base {
    overrideMe() {
        throw new Error("You forgot to override me!");
    }
}

class Derived extends Base {
    overrideMe() {
        // Code that actually returns here
    }
}
```

If `Base.overrideMe` . 

> Real world TypeScript can overcome this with `abstract` functions but this inferrence is maintained for compatability.

<!--
PR: https://github.com/Microsoft/TypeScript/pull/8652
Issue : https://github.com/Microsoft/TypeScript/issues/3076
Concept : https://en.wikipedia.org/wiki/Bottom_type
-->
