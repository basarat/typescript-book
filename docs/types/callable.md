## Callable
You can annotate callables as a part of a type or an interface as follows 

```js
interface ReturnString {
  (): string
}
```
An instance of such an interface would be a function that returns a string e.g. 

```js
declare const foo: ReturnString;
const bar = foo(); // bar is inferred as a string
```

### Obvious examples
Of course such a *callable* annotation can also specify any arguments / optional arguments / rest arguments as needed. e.g. here is a complex example: 

```js
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number;
}
```
They can even specify overloads: 
```js
interface Overloaded {
  (foo: string): string
  (foo: number): number
}

// example implementation
const overloaded: Overloaded = (foo) => foo;

// example usage
const str = overloaded(''); // str is inferred string
const num = overloaded(123); // num is inferred number
```

Of course like *all* bodies of interfaces / types you can use these as variable type annotations e.g. 

```js
const overloaded: {
  (foo: string): string
  (foo: number): number
} = (foo) => foo;
```

### Arrow Syntax
To make it easy to specify callable signatures TypeScript also allows simple arrow type annotations e.g. a function that takes a `number` and returns a `string` can be annotated as: 

```js
const simple: (foo: number) => string
    = (foo) => foo.toString();
```

Only limitation of the arrow syntax: You can't specify overloads. For overloads you must use the full bodied `{ (someArgs): someReturn }` syntax. 

### Newable

Newable is just a special type of *callable* type annotation with the prefix `new`. It simply means that you need to *invoke* with `new` e.g. 

```js
interface CallMeWithNewToGetString {
  new(): string
}
// Usage 
declare const Foo: CallMeWithNewToGetString;
const bar = new Foo(); // bar is inferred to be of type string 
```
