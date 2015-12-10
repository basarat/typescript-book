## Bind is Harmful

This is the definition of `bind` in `lib.d.ts`:

```ts
bind(thisArg: any, ...argArray: any[]): any;
```

As you can see it returns **any**! That means that calling `bind` on a function will cause you to completely loose any type safety of the original function signature.

For example the following compiles:

```ts
function twoParams(a:number,b:number){
    return a + b;
}
let curryOne = twoParams.bind(null,123);
curryOne(456); // Okay but is not type checked!
curryOne('456'); // Allowed because it wasn't type checked!
```

A better way to write it would be with a simple [arrow function](../arrow-functions.md) with an explicit type annotation:
```ts
function twoParams(a:number,b:number){
    return a + b;
}
let curryOne = (x:number)=>twoParams(123,x);
curryOne(456); // Okay and type checked!
curryOne('456'); // Error!
```

But if you expect a curried function [there is a better pattern for that](./currying.md).

> PS: If you have a class member function that you expect to pass around, [use an arrow function for that as well](../arrow-functions.md).
