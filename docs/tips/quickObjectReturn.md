## Return an object literal

Sometimes you need a function that just returns a simple object literal. However, something like

```ts
var foo = () => {
    bar: 123
};
```
is parsed as a *block* containing a *JavaScript Label* by JavaScript runtimes (cause of the JavaScript specification). If that doesn't make sense, don't worry, as you get a nice compiler error from TypeScript saying "unused label" anyways. You can fix it by surrounding the object literal with `()`:

```ts
var foo = () => ({
    bar: 123
});
```
