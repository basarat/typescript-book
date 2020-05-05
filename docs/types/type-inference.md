# Type Inference in TypeScript

TypeScript can infer (and then check) the type of a variable based on a few simple rules. Because these rules
are simple you can train your brain to recognize safe / unsafe code (it happened for me and my teammates quite quickly).

> The types flowing is just how I imagine in my brain the flow of type information.

## Variable Definition

Types of a variable are inferred by definition.

```ts
let foo = 123; // foo is a `number`
let bar = "Hello"; // bar is a `string`
foo = bar; // Error: cannot assign `string` to a `number`
```

This is an example of types flowing from right to left.

## Function Return Types

The return type is inferred by the return statements e.g. the following function is inferred to return a `number`.

```ts
function add(a: number, b: number) {
    return a + b;
}
```

This is an example of types flowing bottom out.

## Assignment

The type of function parameters / return values can also be inferred by assignment e.g. here we say that `foo` is an `Adder`, that makes `number` the type of `a` and `b`.

```ts
type Adder = (a: number, b: number) => number;
let foo: Adder = (a, b) => a + b;
```

This fact can be demonstrated by the below code which raises an error as you would hope:

```ts
type Adder = (a: number, b: number) => number;
let foo: Adder = (a, b) => {
    a = "hello"; // Error: cannot assign `string` to a `number`
    return a + b;
}
```

This is an example of types flowing from left to right.

The same *assignment* style type inference works if you create a function for a callback argument. After all an `argument -> parameter`is just another form of variable assignment.

```ts
type Adder = (a: number, b: number) => number;
function iTakeAnAdder(adder: Adder) {
    return adder(1, 2);
}
iTakeAnAdder((a, b) => {
    // a = "hello"; // Would Error: cannot assign `string` to a `number`
    return a + b;
})
```

## Structuring

These simple rules also work in the presence of **structuring** (object literal creation). For example in the following case the type of `foo` is inferred to be `{a:number, b:number}`

```ts
let foo = {
    a: 123,
    b: 456
};
// foo.a = "hello"; // Would Error: cannot assign `string` to a `number`
```

Similarly for arrays:

```ts
const bar = [1,2,3];
// bar[0] = "hello"; // Would error: cannot assign `string` to a `number`
```

And of course any nesting:

```ts
let foo = {
    bar: [1, 3, 4]
};
// foo.bar[0] = 'hello'; // Would error: cannot assign `string` to a `number`
```

## Destructuring

And of course, they also work with destructuring, both objects:

```ts
let foo = {
    a: 123,
    b: 456
};
let {a} = foo;
// a = "hello"; // Would Error: cannot assign `string` to a `number`
```

and arrays:

```ts
const bar = [1, 2];
let [a, b] = bar;
// a = "hello"; // Would Error: cannot assign `string` to a `number`
```

And if the function parameter can be inferred, so can its destructured properties. For example here we destructure the argument into its `a`/`b` members.

```ts
type Adder = (numbers: { a: number, b: number }) => number;
function iTakeAnAdder(adder: Adder) {
    return adder({ a: 1, b: 2 });
}
iTakeAnAdder(({a, b}) => { // Types of `a` and `b` are inferred
    // a = "hello"; // Would Error: cannot assign `string` to a `number`
    return a + b;
})
```

## Type Guards

We have already seen how [Type Guards](./typeGuard.md) help change and narrow down types (particularly in the case of unions). Type guards are just another form of type inference for a variable in a block.

## Warnings

### Be careful around parameters

Types do not flow into the function parameters if it cannot be inferred from an assignment. For example in the following case the compiler does not know the type of `foo` so it cannot infer the type of `a` or `b`.

```ts
const foo = (a,b) => { /* do something */ };
```

However, if `foo` was typed the function parameters type can be inferred (`a`,`b` are both inferred to be of type `number` in the example below).

```ts
type TwoNumberFunction = (a: number, b: number) => void;
const foo: TwoNumberFunction = (a, b) => { /* do something */ };
```

### Be careful around return

Although TypeScript can generally infer the return type of a function, it might not be what you expect. For example here function `foo` has a return type of `any`.

```ts
function foo(a: number, b: number) {
    return a + addOne(b);
}
// Some external function in a library someone wrote in JavaScript
function addOne(c) {
    return c + 1;
}
```

This is because the return type is impacted by the poor type definition for `addOne` (`c` is `any` so the return of `addOne` is `any` so the return of `foo` is `any`).

> I find it simplest to always be explicit about function returns. After all, these annotations are a theorem and the function body is the proof.

There are other cases that one can imagine, but the good news is that there is a compiler flag that can help catch such bugs.

## `noImplicitAny`

The flag `noImplicitAny` instructs the compiler to raise an error if it cannot infer the type of a variable (and therefore can only have it as an *implicit* `any` type). You can then

* either say that *yes I want it to be of type `any`* by *explicitly* adding an `: any` type annotation
* help the compiler out by adding a few more *correct* annotations.
