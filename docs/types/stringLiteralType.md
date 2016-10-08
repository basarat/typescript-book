## String Literal Type

You can use a string literal as a type. For example:

```ts
let foo: 'Hello';
```
Here we have created a variable called `foo` that *will only allow the literal value `'Hello'` to be assigned to it*. This is demonstrated below:

```ts
let foo: 'Hello';
foo = 'Bar'; // Error: "Bar" is not assignable to type "Hello"
```

They are not very useful on their own but can be combined in a type union to create a powerful (and useful) abstraction e.g.:

```ts
type CardinalDirection =
    "North"
    | "East"
    | "South"
    | "West";

function move(distance: number, direction: CardinalDirection) {
    // ...
}

move(1,"North"); // Okay
move(1,"Nurth"); // Error!
```

### Use cases
Valid use cases for string literal types are:

#### String based enums

[TypeScript enums are number based](../enums.md). You can use string literals with union types to mock a string based enum as we did in the `CardinalDirection` example above.

#### Modelling existing JavaScript APIs

e.g. [CodeMirror editor has an option `readOnly`](https://codemirror.net/doc/manual.html#option_readOnly) that can either be a `boolean` or the literal string `"nocursor"` (effective valid values `true,false,"nocursor"`).  It can be declared as:

```ts
readOnly: boolean | 'nocursor';
```



[](https://github.com/Microsoft/TypeScript/pull/5185)
