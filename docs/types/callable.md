## Callable
You can annotate callables as a part of a type or an interface as follows

```ts
interface ReturnString {
  (): string
}
```
An instance of such an interface would be a function that returns a string e.g.

```ts
declare const foo: ReturnString;
const bar = foo(); // bar is inferred as a string
```

### Obvious examples
Of course such a *callable* annotation can also specify any arguments / optional arguments / rest arguments as needed. e.g. here is a complex example:

```ts
interface Complex {
  (foo: string, bar?: number, ...others: boolean[]): number;
}
```

An interface can provide multiple callable annotations to specify function overloading. For example:

```ts
interface Overloaded {
    (foo: string): string
    (foo: number): number
}

// example implementation
function stringOrNumber(foo: number): number;
function stringOrNumber(foo: string): string;
function stringOrNumber(foo: any): any {
    if (typeof foo === 'number') {
        return foo * foo;
    } else if (typeof foo === 'string') {
        return `hello ${foo}`;
    }
}

const overloaded: Overloaded = stringOrNumber;

// example usage
const str = overloaded(''); // type of `str` is inferred as `string`
const num = overloaded(123); // type of `num` is inferred as `number`
```

Of course, like the body of *any* interface, you can use the body of a callable interface as a type annotation for a variable. For example:

```ts
const overloaded: {
  (foo: string): string
  (foo: number): number
} = (foo: any) => foo;
```

### Arrow Syntax
To make it easy to specify callable signatures, TypeScript also allows simple arrow type annotations. For example, a function that takes a `number` and returns a `string` can be annotated as:

```ts
const simple: (foo: number) => string
    = (foo) => foo.toString();
```

> Only limitation of the arrow syntax: You can't specify overloads. For overloads you must use the full bodied `{ (someArgs): someReturn }` syntax.

### Newable

Newable is just a special type of *callable* type annotation with the prefix `new`. It simply means that you need to *invoke* with `new` e.g.

```ts
interface CallMeWithNewToGetString {
  new(): string
}
// Usage
declare const Foo: CallMeWithNewToGetString;
const bar = new Foo(); // bar is inferred to be of type string
```
