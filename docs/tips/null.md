# Null is Bad
JavaScript (and by extension TypeScript) has two bottom types : `null` and `undefined`. They are *intended* to mean different things:

* Something hasn't been initialized : `undefined`
* Something is currently unavailable: `null`

Most other languages only have one (commonly called `null`). Since by default JavaScript will evaluate an uninitialized variable / parameter / property to `undefined` (you don't get a choice) we recommend you just use that for your own *unavailable* status and don't bother with `null`.

## Real world discussions
TypeScript team doesn't use `null` : [TypeScript coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined) and it hasn't caused any problems. Douglas Crockford thinks [`null` is a bad idea](https://www.youtube.com/watch?v=PSGEjv3Tqo0&feature=youtu.be&t=9m21s) and we should all just use `undefined`

## Dealing with `null` style code bases
If your code base interacts with other APIs that might give you a `null` you check with `== undefined` (instead of `===`). Using this is safe even for other potentially *falsy* values.
```ts
/// Image you are doing `foo == undefined` where foo can be one of:
console.log(undefined == undefined); // true
console.log(null == undefined); // true
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false
```

## Additional tips

### Limit explicit use of `undefined`
Also because TypeScript gives you the opportunity to *document* your structures separately from values instead of stuff like:
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
  }
  // no error
});
```
When creating your own APIs it's *okay* to use `null` in this case for consistency. In all sincerity for your own APIs you should look at promises, in that case you actually don't need to bother with absent error values (you handle them with `.then` vs. `.catch`).

### Don't use `undefined` as a means of denoting *validity*

For example an awful function like this:

```ts
function toInt(str:string) {
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
