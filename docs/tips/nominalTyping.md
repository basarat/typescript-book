## Nominal Typing
The TypeScript type system is structural [and this is one of the main motivating benefits](../why-typescript.md). However, there are real-world use cases for a system where you want two variables to be differentiated because they have a different *type name* even if they have the same structure. A very common use case is *identity* structures (which are generally just strings with semantics associated with their *name* in languages like C#/Java).

There are a few patterns that have emerged in the community. I cover them in decreasing order of personal preference:

## Using literal types

This pattern uses generics and literal types: 

```ts
/** Generic Id type */
type Id<T extends string> = {
  type: T,
  value: string,
}

/** Specific Id types */
type FooId = Id<'foo'>;
type BarId = Id<'bar'>;

/** Optional: contructors functions */
const createFoo = (value: string): FooId => ({ type: 'foo', value });
const createBar = (value: string): BarId => ({ type: 'bar', value });

let foo = createFoo('sample')
let bar = createBar('sample');

foo = bar; // Error
foo = foo; // Okay
```

* Advantages
  - No need for any type assertions 
* Disadvantage
  - The structure `{type,value}` might not be desireable and need server serialization support

## Using Enums
[Enums in TypeScript](../enums.md) offer a certain level of nominal typing. Two enum types aren't equal if they differ by name. We can use this fact to provide nominal typing for types that are otherwise structurally compatible.

The workaround involves:
* Creating a *brand* enum.
* Creating the type as an *intersection* (`&`) of the brand enum + the actual structure.

This is demonstrated below where the structure of the types is just a string:

```ts
// FOO
enum FooIdBrand {}
type FooId = FooIdBrand & string;

// BAR
enum BarIdBrand {}
type BarId = BarIdBrand & string;

/**
 * Usage Demo
 */
var fooId: FooId;
var barId: BarId;

// Safety!
fooId = barId; // error
barId = fooId; // error

// Newing up
fooId = 'foo' as FooId;
barId = 'bar' as BarId;

// Both types are compatible with the base
var str: string;
str = fooId;
str = barId;
```

## Using Interfaces

Because `numbers` are type compatible with `enum`s the previous technique cannot be used for them. Instead we can use interfaces to break the structural compatibility. This method is still used by the TypeScript compiler team, so worth mentioning. Using `_` prefix and a `Brand` suffix is a convention I strongly recommend (and [the one followed by the TypeScript team](https://github.com/Microsoft/TypeScript/blob/7b48a182c05ea4dea81bab73ecbbe9e013a79e99/src/compiler/types.ts#L693-L698)).

The workaround involves the following:
* adding an unused property on a type to break structural compatibility.
* using a type assertion when needing to new up or cast down.

This is demonstrated below:

```ts
// FOO
interface FooId extends String {
    _fooIdBrand: string; // To prevent type errors
}

// BAR
interface BarId extends String {
    _barIdBrand: string; // To prevent type errors
}

/**
 * Usage Demo
 */
var fooId: FooId;
var barId: BarId;

// Safety!
fooId = barId; // error
barId = fooId; // error
fooId = <FooId>barId; // error
barId = <BarId>fooId; // error

// Newing up
fooId = 'foo' as any;
barId = 'bar' as any;

// If you need the base string
var str: string;
str = fooId as any;
str = barId as any;
```
