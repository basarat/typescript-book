## Return an object literal

Sometimes you need a function that just returns a simple object literal. However, something like

```ts
var foo = ()=>{
    bar: 123
};
```
is a parsing compiler error. You can fix it but surrounding the object literal in `()`:

```ts
var foo = ()=>({
    bar: 123
});
```
