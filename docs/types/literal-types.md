## Literals
Literals are *exact* values that are JavaScript primitives. 

### String Literals

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
    | "North"
    | "East"
    | "South"
    | "West";

function move(distance: number, direction: CardinalDirection) {
    // ...
}

move(1,"North"); // Okay
move(1,"Nurth"); // Error!
```

### Other literal types
TypeScript also supports `boolean` and `number` literal types, e.g.: 

```ts
type OneToFive = 1 | 2 | 3 | 4 | 5;
type Bools = true | false;
```

### Inference 
Quite commonly you get an error like `Type string is not assignable to type "foo"`. The following example demonstrates this.

```js
function iTakeFoo(foo: 'foo') { }
const test = {
  someProp: 'foo'
};
iTakeFoo(test.someProp); // Error: Argument of type string is not assignable to parameter of type 'foo'
```

This is because `test` is inferred to be of type `{someProp: string}`. The fix here is to use a simple type assertion to tell TypeScript the literal you want it to infer as shown below: 

```js
function iTakeFoo(foo: 'foo') { }
const test = {
  someProp: 'foo' as 'foo'
};
iTakeFoo(test.someProp); // Okay!
```

or use a type annotation that helps TypeScript infer the correct thing at the point of declaration: 

```ts
function iTakeFoo(foo: 'foo') { }
type Test = {
  someProp: 'foo',
}
const test: Test = { // Annotate - inferred someProp is always === 'foo'
  someProp: 'foo' 
}; 
iTakeFoo(test.someProp); // Okay!
```

### Use cases
Valid use cases for string literal types are:

#### String based enums

[TypeScript enums are number based](../enums.md). You can use string literals with union types to mock a string based enum as we did in the `CardinalDirection` example above. You can even generate a `Key:Value` structure using the following function: 

```ts
/** Utility function to create a K:V from a list of strings */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
```

And then generate the literal type union using `keyof typeof`. Here is a complete example:

```ts
/** Utility function to create a K:V from a list of strings */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

/**
  * Sample create a string enum
  */

/** Create a K:V */
const Direction = strEnum([
  'North',
  'South',
  'East',
  'West'
])
/** Create a Type */
type Direction = keyof typeof Direction;

/** 
  * Sample using a string enum
  */
let sample: Direction;

sample = Direction.North; // Okay
sample = 'North'; // Okay
sample = 'AnythingElse'; // ERROR!
```

#### Modelling existing JavaScript APIs

E.g. [CodeMirror editor has an option `readOnly`](https://codemirror.net/doc/manual.html#option_readOnly) that can either be a `boolean` or the literal string `"nocursor"` (effective valid values `true,false,"nocursor"`).  It can be declared as:

```ts
readOnly: boolean | 'nocursor';
```

#### Discriminated Unions

We will cover [this later in the book](./discriminated-unions.md).


[](https://github.com/Microsoft/TypeScript/pull/5185)
