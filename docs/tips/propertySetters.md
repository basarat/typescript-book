## Limit usage of property setters

Prefer explicit set/get functions (e.g. `setBar` and `getBar` functions) over setters/getters.

Consider the following code:

```ts
foo.bar = {
    a: 123,
    b: 456
};
```

In the presence of setter/getters:

```ts
class Foo {
    a: number;
    b: number;
    set bar(value:{a:number,b:number}) {
        this.a = value.a;
        this.b = value.b;
    }
}
let foo = new Foo();
```

This is not a *good* use of property setters. The person reading the first code sample has no context about all the things that will change. Whereas someone calling `foo.setBar(value)` might have an idea that something might change on `foo`.

> Bonus points: Find references works better if you have different functions. In TypeScript tools if you find references for a getter or a setter you get *both* whereas with explicit function calls you only get references to the relevant function.
