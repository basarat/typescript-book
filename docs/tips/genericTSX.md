## Generics in TSX 

Because `.tsx` / `.jsx` uses syntax like `<div>` to denote JSX blocks it offers a few unique challenges for Generics. 

> Quick Tip:  Use `as Foo` syntax for type assertions as we mentioned before


### Generic functions

Something like the following works fine: 

```ts
function foo<T>(x: T): T { return x; }
```

However using an arrow generic function will not: 

```ts
const foo = <T>(x: T) => x; // ERROR : unclosed `T` tag
```

**Workaround**: Use force some `extends` on the generic parameter to hint the compiler that its a generic. e.g.

```ts
const foo = <T extends {}>(x: T) => x;
```
