## Type Compatibility

Type Compatibility determines if one thing can be assigned to another. E.g. `string` and `number` are not compatible:

```ts
let str: string = "Hello";
let num: number = 123;

str = num; // ERROR: `number` is not assignable to `string`
num = str; // ERROR: `string` is not assignable to `number`
```

## Soundness

TypeScript's type system is designed to be convenient and allows for *unsound* behaviours e.g. anything can be assigned to `any` which essentially means you telling the compiler to allow you to do whatever you want:

```ts
let foo: any = 123;
foo = "Hello";

// Later
foo.toPrecision(3); // Allowed as you typed it as `any`
```

## Structural

TypeScript objects are structurally typed. This means the *names* don't matter as long as the structures match

```ts
interface Point {
    x: number,
    y: number
}

class Point2D {
    constructor(public x:number, public y:number){}
}

let p: Point;
// OK, because of structural typing
p = new Point2D(1,2);
```

This allows you to create objects on the fly (like you do in pre JS) and still have safety for whenever it can be inferred.

## Variance

Variance is an easy to understand and important concept for type compatibility analysis.

For simple types `Base` and `Child`, if `Child` is a child of `Base`, then instances of `Child` can be assigned to a variable to type `Base`.

> This is polymorphism 101

In type compatibility of complex types composed of such `Base` and `Child` depending on where the `Base` and `Child` in similar scenarios is driven by variance.
