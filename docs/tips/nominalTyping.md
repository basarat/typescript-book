## Nominal Typing
The TypeScript type system is structural [and this is one of the main motivating benefits](../why-typescript.md). However, there are real-world use cases for a system where you want two variables to be differentiated because they have a different *type name* even if they have the same structure. A very common use case is *identity* structures (which are generally just strings with semantics associated with their *name* in languages like C#/Java).

The workaround involves the following:
* adding an unused property on a type to break structural compatability.
* using a type assertion when needing to new up or cast down.

This is demonstrated below:

```ts
// FOO
interface FooId extends String {
    _fooIdBrand: string; // To prevent type errors
}

// BAR
interface BarId extends String {
    _brandIdBrand: string; // To prevent type errors
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

Using `_` prefix and a `Brand` suffix is a convention I strongly recommend (and [the one followed by the TypeScript team](https://github.com/Microsoft/TypeScript/blob/7b48a182c05ea4dea81bab73ecbbe9e013a79e99/src/compiler/types.ts#L693-L698)).
