* [Type Compatibility](#type-compatibility)
* [Soundness](#soundness)
* [Structural](#structural)
* [Generics](#generics)
* [Variance](#variance)
* [Functions](#functions)
  * [Return Type](#return-type)
  * [Number of arguments](#number-of-arguments)
  * [Optional and rest parameters](#optional-and-rest-parameters)
  * [Types of arguments](#types-of-arguments)
* [Enums](#enums)
* [Classes](#classes)
* [Generics](#generics)
* [FootNote: Invariance](#footnote-invariance)

## Type Compatibility

Type Compatibility (as we discuss here) determines if one thing can be assigned to another. E.g. `string` and `number` are not compatible:

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

This allows you to create objects on the fly (like you do in vanilla JS) and still have safety for whenever it can be inferred.

Also *more* data is considered fine:

```ts
interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
var point2D: Point2D = { x: 0, y: 10 }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) { /* do something */ }

iTakePoint2D(point2D); // exact match okay
iTakePoint2D(point3D); // extra information okay
iTakePoint2D({ x: 0 }); // Error: missing information `y`
```

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

## Functions

There are a few subtle things to consider when comparing two functions.

### Return Type
`covariant`: The return type must contain at least enough data.

```ts
/** Type Heirarchy */
interface Point2D { x: number; y: number; }
interface Point3D { x: number; y: number; z: number; }

/** Two sample functions */
let iMakePoint2D = (): Point2D => ({ x: 0, y: 0 });
let iMakePoint3D = (): Point3D => ({ x: 0, y: 0, z: 0 });

/** Assignment */
iMakePoint2D = iMakePoint3D; // Okay
iMakePoint3D = iMakePoint2D; // ERROR: Point2D is not assignable to Point3D
```

### Number of arguments
Less arguments are okay (i.e. functions can chose to ignore additional args). After all you are guaranteed to be called with at least enough arguments.

```ts
let iTakeSomethingAndPassItAnErr
    = (x: (err: Error, data: any) => void) => { /* do something */ };

iTakeSomethingAndPassItAnErr(() => null) // Okay
iTakeSomethingAndPassItAnErr((err) => null) // Okay
iTakeSomethingAndPassItAnErr((err, data) => null) // Okay

// ERROR: function may be called with `more` not being passed in
iTakeSomethingAndPassItAnErr((err, data, more) => null); // ERROR
```

### Optional and Rest Parameters

Optional (pre determined count) and Rest parameters (any count of arguments) are compatible, again for convenience.

```ts
let foo = (x:number, y: number) => { /* do something */ }
let bar = (x?:number, y?: number) => { /* do something */ }
let bas = (...args: number[]) => { /* do something */ }

foo = bar = bas;
bas = bar = foo;
```

> Note: optional (in our example `bar`) and non optional (in our example `foo`) are only compatible if strictNullChecks is false.


### Types of arguments

`bivariant` : This is designed to support common event handling scenarios

```ts
/** Event Hierarchy */
interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }

/** Sample event listener */
enum EventType { Mouse, Keyboard }
function addEventListener(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}

// Unsound, but useful and common. Works as function argument comparison is bivariant
addEventListener(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

// Undesirable alternatives in presence of soundness
addEventListener(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y));
addEventListener(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + "," + e.y)));

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
addEventListener(EventType.Mouse, (e: number) => console.log(e));
```

Also makes `Array<Child>` assignable to `Array<Base>` (covariance) as the functions are compatible. Array covariance requires all `Array<Child>` functions to be assignable to `Array<Base>` e.g. `push(t:Child)` is assignable to `push(t:Base)` which is made possible by function argument bivariance.

**This can be confusing for people coming from other languages** who would expect the following to error but will not in TypeScript:

```ts
/** Type Heirarchy */
interface Point2D { x: number; y: number; }
interface Point3D { x: number; y: number; z: number; }

/** Two sample functions */
let iTakePoint2D = (point: Point2D) => { /* do something */ }
let iTakePoint3D = (point: Point3D) => { /* do something */ }

iTakePoint3D = iTakePoint2D; // Okay : Reasonable
iTakePoint2D = iTakePoint3D; // Okay : WHAT
```

## Enums

* Enums are compatible with numbers, and numbers are compatible with enums.

```ts
enum Status { Ready, Waiting };

let status = Status.Ready;
let num = 0;

status = num; // OKAY
num = status; // OKAY
```

* Enum values from different enum types are considered incompatible. This makes enums useable *nominally* (as opposed to structurally)

```ts
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
let color = Color.Red;

status = color; // ERROR
```

## Classes

* Only instance members and methods are compared. *constructors* and *statics* play no part.

```ts
class Animal {
    feet: number;
    constructor(name: string, numFeet: number) { /** do something */ }
}

class Size {
    feet: number;
    constructor(meters: number) { /** do something */ }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK
```

* `private` and `protected` members *must originate from the same class*. Such members essentially make the class *nominal*.

```ts
/** A class hierarchy */
class Animal { protected feet: number; }
class Cat extends Animal { }

let animal: Animal;
let cat: Cat;

animal = cat; // OKAY
cat = animal; // OKAY

/** Looks just like Animal */
class Size { protected feet: number; }

let size: Size;

animal = size; // ERROR
size = animal; // ERROR
```

## Generics

Since TypeScript has a structural type system, type parameters only affect compatibility when used by member. For example, in the  following `T` has no impact on compatibility:

```ts
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // okay, y matches structure of x
```

However if `T` is used, it will play a role in compatibility based on its *instantiation* as shown below:

```ts
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

x = y;  // error, x and y are not compatible
```

In cases where generic arguments haven't been *instantiated* they are substituted by `any` before checking compatibility:

```ts
let identity = function<T>(x: T): T {
    // ...
}

let reverse = function<U>(y: U): U {
    // ...
}

identity = reverse;  // Okay because (x: any)=>any matches (y: any)=>any
```

Generics involving classes are matched by relevant class compatability as mentioned before. e.g. 

```ts
class List<T> {
  add(val: T) { }
}

class Animal { name: string; }
class Cat extends Animal { meow() { } }

const animals = new List<Animal>();
animals.add(new Animal()); // Okay 
animals.add(new Cat()); // Okay 

const cats = new List<Cat>();
cats.add(new Animal()); // Error 
cats.add(new Cat()); // Okay
```

## FootNote: Invariance

We said invariance is the only sound option. Here is an example where both `contra` and `co` variance are shown to be unsafe for arrays.

```ts
/** Hierarchy */
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
animalArr.push(new Animal('another animal')); // Just pushed an animal into catArr!
catArr.forEach(c => c.meow()); // Allowed but BANG 🔫 at runtime
```
