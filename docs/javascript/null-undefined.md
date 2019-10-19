## Null and Undefined

> [Free youtube video on the subject](https://www.youtube.com/watch?v=kaUfBNzuUAI)

JavaScript (and by extension TypeScript) has two bottom types : `null` and `undefined`. They are *intended* to mean different things:

* Something hasn't been initialized : `undefined`.
* Something is currently unavailable: `null`.


### Checking for either

Fact is you will need to deal with both. Interestingly in JavaScript with `==`, `null` and `undefined` are only equal to each other:

```ts
// Both null and undefined are only `==` to themselves and each other:
console.log(null == null); // true (of course)
console.log(undefined == undefined); // true (of course)
console.log(null == undefined); // true


// You don't have to worry about falsy values making through this check
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false
```
Recommend `== null` to check for both `undefined` or `null`. You generally don't want to make a distinction between the two.

```ts
function foo(arg: string | null | undefined) {
  if (arg != null) {
    // arg must be a string as `!=` rules out both null and undefined. 
  }
}
```

> You could also do `== undefined`, but `== null` is more conventional/shorter.

One exception, root level `undefined` values which we discuss next.

### Checking for root level undefined

Remember how I said you should use `== null`. Of course you do (cause I just said it ^). Don't use it for root level things. In strict mode if you use `foo` and `foo` is undefined you get a `ReferenceError` **exception** and the whole call stack unwinds.

> You should use strict mode ... and in fact the TS compiler will insert it for you if you use modules ... more on those later in the book so you don't have to be explicit about it :)

So to check if a variable is defined or not at a *global* level you normally use `typeof`:

```ts
if (typeof someglobal !== 'undefined') {
  // someglobal is now safe to use
  console.log(someglobal);
}
```

### Limit explicit use of `undefined`
Because TypeScript gives you the opportunity to *document* your structures separately from values instead of stuff like:
```ts
function foo(){
  // if Something
  return {a:1,b:2};
  // else
  return {a:1,b:undefined};
}
```
you should use a type annotation:
```ts
function foo():{a:number,b?:number}{
  // if Something
  return {a:1,b:2};
  // else
  return {a:1};
}
```

### Node style callbacks
Node style callback functions (e.g. `(err,somethingElse)=>{ /* something */ }`) are generally called with `err` set to `null` if there isn't an error. You generally just use a truthy check for this anyways:

```ts
fs.readFile('someFile', 'utf8', (err,data) => {
  if (err) {
    // do something
  } else {
    // no error
  }
});
```
When creating your own APIs it's *okay* to use `null` in this case for consistency. In all sincerity for your own APIs you should look at promises, in that case you actually don't need to bother with absent error values (you handle them with `.then` vs. `.catch`).

### Don't use `undefined` as a means of denoting *validity*

For example an awful function like this:

```ts
function toInt(str: string) {
  return str ? parseInt(str) : undefined;
}
```
can be much better written like this:
```ts
function toInt(str: string): { valid: boolean, int?: number } {
  const int = parseInt(str);
  if (isNaN(int)) {
    return { valid: false };
  }
  else {
    return { valid: true, int };
  }
}
```

### JSON and serialization

The JSON standard has support for encoding `null` but not `undefined`. When JSON-encoding an object with an attribute that is `null`, the attribute will be included with its null value, whereas an attribute with an `undefined` value will be excluded entirely.

```ts
JSON.stringify({willStay: null, willBeGone: undefined}); // {"willStay":null}
```

As a result, JSON-based databases may support `null` values but not `undefined` values. Since attributes set to `null` are encoded, you can transmit the intent to clear an attribute by setting its value to `null` before encoding and transmitting the object to a remote store.

Setting attribute values to undefined can save on storage and transmission costs, as the attribute names will not be encoded. However, this can complicate the semantics of clearing values vs. absent values.

### Final thoughts
TypeScript team doesn't use `null` : [TypeScript coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined) and it hasn't caused any problems. Douglas Crockford thinks [`null` is a bad idea](https://www.youtube.com/watch?v=PSGEjv3Tqo0&feature=youtu.be&t=9m21s) and we should all just use `undefined`.

However, NodeJS style code bases uses `null` for Error arguments as standard as it denotes `Something is currently unavailable`. I personally don't care to distinguish between the two as most projects use libraries with differing opinions and just rule out both with `== null`.
