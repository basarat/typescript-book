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

In type compatibility of complex types composed of such `Base` and `Child` depending on where the `Base` and `Child` in similar scenarios is driven by *variance*.

* Covariant : (corporate) only in *same direction*
* Contravariant : (contra aka negative) only in *opposite direction*
* Bivariant : (bi aka both) both co and contra.
* Invariant : if the types are aren't exact then they are incompatible.

> Note: For a completely sound type system in the presence of mutable data like JavaScript, `invariant` is the only valid option. But as mentioned *convenience* forces us to make unsound choices.



## FootNote: Invariance

We said invariance is the only sound option. Here is an example where both `contra` and `co` variance are shown to be unsafe for arrays.

```ts
/** Heirarchy */
class Animal { constructor(public name: string){} }
class Cat extends Animal { meow() { } }

/** An item of each */
var animal = new Animal("animal");
var cat = new Cat("cat");

/**
 * Demo : polymorphism 101
 * Animal <= Cat
 */
animal = cat; // Okay
cat = animal; // ERROR: cat extends animal

/** Array of each to demonstrate variance */
let animalArr: Animal[] = [animal];
let catArr: Cat[] = [cat];

/**
 * Obviously Bad : Contravariance
 * Animal <= Cat
 * Animal[] >= Cat[]
 */
catArr = animalArr; // Okay if contravariant
catArr[0].meow(); // Allowed but BANG 🔫 at runtime


/**
 * Also Bad : covariance
 * Animal <= Cat
 * Animal[] <= Cat[]
 */
animalArr = catArr; // Okay if covariant
animalArr.push(new Animal('another animal')); // Just pushed an animal into catArr too!
catArr.forEach(c => c.meow()); // Allowed but BANG 🔫 at runtime
```
