## Null and Undefined

Fact is you will need to deal with both. Just check for either with `==` check.

```ts
/// Imagine you are doing `foo.bar == undefined` where bar can be one of:
console.log(undefined == undefined); // true
console.log(null == undefined); // true
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false
```
Recommend `== null` to check for both `undefined` or `null`. You generally don't want to make a distinction between the two.

## undefined

Remember how I said you should use `== null`. Of course you do (cause I just said it ^). Don't use it for root level things. In strict mode if you use `foo` and `foo` is undefined you get a `ReferenceError` **exception** and the whole call stack unwinds.

> You should use strict mode ... and in fact the TS compiler will insert it for you if you use modules ... more on those later in the book so you don't have to be explicit about it :)

So to check if a variable is defined or not at a *global* level you normally use `typeof`:

```ts
if (typeof someglobal !== 'undefined') {
  // someglobal is now safe to use
  console.log(someglobal);
}
```
