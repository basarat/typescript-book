## Lazy Object Literal Initialization

Quite commonly in JavaScript code bases you would initialize and object literals in the following manner:

```ts
let foo = {};
foo.bar = 123;
foo.bas = "Hello World";
```

As soon as you move the code to TypeScript you will start to get Errors like the following:

```ts
let foo = {};
foo.bar = 123; // Error: Property 'bar' does not exist on type '{}'
foo.bas = "Hello World"; // Error: Property 'bas' does not exist on type '{}'
```

This is because from the state `let foo = {}`, TypeScript *infers* the type of `foo` (left hand side of initializing assignment) to be the type of the right hand side `{}` (i.e. an object with no properties). So, it error if you try to assign to a property it doesn't know about.

### Ideal Fix

The *proper* way to initialize an object in TypeScript is to do it in the assignment:

```ts
let foo = {
    bar: 123,
    bas: "Hello World",
};
```

This is also great for code review and code maintainability purposes.

### Quick Fix

If you have a large JavaScript code base that you are migrating to TypeScript the ideal fix might not be a viable solution for you. In that case you can carefully use a *type assertion* to silence the compiler:

```ts
let foo = {} as any;
foo.bar = 123;
foo.bas = "Hello World";
```

### Middle Ground

Of course using the `any` assertion can be very bad as it sort of defeats the safety of TypeScript. The middle ground fix is to create an `interface` to ensure

* Good Docs
* Safe assignment

This is shown below:

```ts
interface Foo {
    bar: number
    bas: string
}

let foo = {} as Foo;
foo.bar = 123;
foo.bas = "Hello World";
```

Here is a quick example that shows the fact that using the interface can save you:

```ts
interface Foo {
    bar: number
    bas: string
}

let foo = {} as Foo;
foo.bar = 123;
foo.bas = "Hello World";

// later in the codebase:
foo.bar = 'Hello Stranger'; // Error: You probably misspelled `bas` as `bar`, cannot assign string to number
}
```
