# Moving Types

TypeScript's type system is extremely powerful and allows moving and slicing types in ways not possible in any other single language out there.

This is because TypeScript is designed to allow you to work seamlessly with a *highly dynamic* language like JavaScript. Here we cover a few tricks for moving types around in TypeScript.

Key motivation for these : You change one thing and everything else just updates automatically and you get nice errors if something is going to break, like a well designed constraint system.

## Copying both the Type + Value

If you want to move a class around, you might be tempted to do the following:

```ts
class Foo { }
var Bar = Foo;
var bar: Bar; // ERROR: cannot find name 'Bar'
```

This is an error because `var` only copied the `Foo` into the *variable* declaration space and you therefore cannot use `Bar` as a type annotation. The proper way is to use the `import` keyword. Note that you can only use the `import` keyword in such a way if you are using *namespaces* or *modules* (more on these later):

```ts
namespace importing {
    export class Foo { }
}

import Bar = importing.Foo;
var bar: Bar; // Okay
```

This `import` trick only works for things that are *both type and variable*.

## Capturing the type of a variable

You can actually use a variable in a type annotation using the `typeof` operator. This allows you to tell the compiler that one variable is the same type as another. Here is an example to demonstrate this:

```ts
var foo = 123;
var bar: typeof foo; // `bar` has the same type as `foo` (here `number`)
bar = 456; // Okay
bar = '789'; // ERROR: Type `string` is not `assignable` to type `number`
```

## Capturing the type of a class member

You can traverse into any non-nullable object type to retrieve the type of a property:

```ts
class Foo {
  foo: number; // some member whose type we want to capture
}

let bar: Foo['foo']; // `bar` has type `number`
```

Alternatively, similar to capturing the type of a variable, you just declare a variable purely for type capturing purposes:

```ts
// Purely to capture type
declare let _foo: Foo;

// Same as before
let bar: typeof _foo.foo; // `bar` has type `number`
```

## Capturing the type of magic strings

Lots of JavaScript libraries and frameworks work off of raw JavaScript strings. You can use `const` variables to capture their type e.g.

```ts
// Capture both the *type* _and_ *value* of magic string:
const foo = "Hello World";

// Use the captured type:
let bar: typeof foo;

// bar can only ever be assigned to `Hello World`
bar = "Hello World"; // Okay!
bar = "anything else "; // Error!
```

In this example `bar` has the literal type `"Hello World"`. We cover this more in the [literal type section](./literal-types.md).

## Capturing Key Names

The `keyof` operator lets you capture the key names of a type. E.g. you can use it to capture the key names of a variable by first grabbing its type using `typeof`:

```ts
const colors = {
  red: 'reddish',
  blue: 'bluish'
}
type Colors = keyof typeof colors;

let color: Colors; // same as let color: "red" | "blue"
color = 'red'; // okay
color = 'blue'; // okay
color = 'anythingElse'; // Error: Type '"anythingElse"' is not assignable to type '"red" | "blue"'
```

This allows you to have stuff like string enums + constants quite easily, as you just saw in the above example.
