## Bind is Harmful

This is the definition of `bind` in `lib.d.ts`:

```ts
bind(thisArg: any, ...argArray: any[]): any;
```

As you can see it returns **any**! That means that calling `bind` on a function will cause you to completely lose any type safety of the original function signature.

For example the following compiles:

```ts
function twoParams(a:number,b:number) {
    return a + b;
}
let curryOne = twoParams.bind(null,123);
curryOne(456); // Okay but is not type checked!
curryOne('456'); // Allowed because it wasn't type checked!
```

A better way to write it would be with a simple [arrow function](../arrow-functions.md) with an explicit type annotation:
```ts
function twoParams(a:number,b:number) {
    return a + b;
}
let curryOne = (x:number)=>twoParams(123,x);
curryOne(456); // Okay and type checked!
curryOne('456'); // Error!
```

But if you expect a curried function [there is a better pattern for that](./currying.md).

### Class Members
Another common use is to use `bind` to ensure the correct value of `this` when passing around class functions. Don't do that!

The following demonstrates the fact that you lose parameter type safety if you use `bind`:

```ts
class Adder {
    constructor(public a: string) { }

    add(b: string): string {
        return this.a + b;
    }
}

function useAdd(add: (x: number) => number) {
    return add(456);
}

let adder = new Adder('mary had a little 🐑');
useAdd(adder.add.bind(adder)); // No compile error!
useAdd((x) => adder.add(x)); // Error: number is not assignable to string
```

If you have a class member function that you **expect** to pass around, [use an arrow function in the first place](../arrow-functions.md) e.g one would write the same `Adder` class as:

```ts
class Adder {
    constructor(public a: string) { }

    // This function is now safe to pass around
    add = (b: string): string => {
        return this.a + b;
    }
}
```

Another alternative is to *manually* specify the type of the variable you are binding e.g. 

```ts
const add: typeof adder.add = adder.add.bind(adder);
```
