## this

Any access to `this` keyword within a function is actually controlled by how the function is actually called. It is commonly referred to as the “calling context.”

Here is an example:

```ts
function foo() {
  console.log(this);
}

foo(); // logs out the global e.g. `window` in browsers
let bar = {
  foo
}
bar.foo(); // Logs out `bar` as `foo` was called on `bar`
```

So be mindful of your usage of `this`. If you want to disconnect `this` in a class from the calling context use an arrow function, [more on that later][arrow].

[arrow]:../arrow-functions.md
