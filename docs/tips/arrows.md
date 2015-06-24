# Return an object literal

Something like 

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