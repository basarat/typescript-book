## Interfaces

Interfaces have *zero* runtime JS impact. There is a lot of power in TypeScript interfaces to declare the structure of variables.

The following two are equivalent declarations, the first uses an *inline annotation*, the second uses an *interface*:

```ts
// Sample A
declare var myPoint: { x: number; y: number; };

// Sample B
interface Point {
    x: number; y: number;
}
declare var myPoint: Point;
```

However the beauty of *Sample B* is that if someone authors a library that builds on the `myPoint` library to add new members, they can easily add to the existing declaration of `myPoint`:

```ts
// Lib a.d.ts
interface Point {
    x: number; y: number;
}
declare var myPoint: Point;

// Lib b.d.ts
interface Point {
    z: number;
}

// Your code
var myPoint.z; // Allowed!
```

This is because **interfaces in TypeScript are open ended**. This is a vital tenet of TypeScript that it allows you to mimic the extensibility of JavaScript using *interfaces*.


## Classes can implement interfaces

If you want to use *classes* that must follow an object structure that someone declared for you in an `interface` you can use the `implements` keyword to ensure compatibility:

```ts
interface Point {
    x: number; y: number;
}

class MyPoint implements Point {
    x: number; y: number; // Same as Point
}
```

Basically in the presence of that `implements`, any changes in that external `Point` interface will result in a compile error in your code base so you can easily keep it in sync:

```ts
interface Point {
    x: number; y: number;
    z: number; // New member
}

class MyPoint implements Point { // ERROR : missing member `z`
    x: number; y: number;
}
```

Note that `implements` restricts the structure of the class *instances* i.e.:

```ts
var foo: Point = new MyPoint();
```

And stuff like `foo: Point = MyPoint` is not the same thing.


## TIPs

### Not every interface is implementable easily

Interfaces are designed to declare *any arbitrarily crazy* structure that might be present in JavaScript.

Consider the following interface where something is callable with `new`:

```ts
interface Crazy {
    new (): {
        hello: number
    };
}
```

You would essentially have something like:

```ts
class CrazyClass implements Crazy {
    constructor() {
        return { hello: 123 };
    }
}
// Because
const crazy = new CrazyClass(); // crazy would be {hello:123}
```

You can *declare* all the crazy JS out there with interfaces and even use them safely from TypeScript. Doesn't mean you can use TypeScript classes to implement them.
