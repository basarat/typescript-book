## readonly
TypeScript's type system allows you to mark individual properties on an interface as `readonly`. This allows you to work in a functional way (unexpected mutation is bad):

```ts
function foo(config: {
    readonly bar: number,
    readonly bas: number
}) {
    // ..
}

let config = { bar: 123, bas: 123 };
foo(config);
// You can be sure that `config` isn't changed 🌹
```

Of course you can use `readonly` in `interface` and `type` definitions as well e.g.:

```ts
type Foo = {
    readonly bar: number;
    readonly bas: number;
}

// Initialization is okay
let foo: Foo = { bar: 123, bas: 456 };

// Mutation is not
foo.bar = 456; // Error: Left-hand side of assignment expression cannot be a constant or a read-only property
```

You can even declare a class property as `readonly`. You can initialize them at the point of declaration or in the constructor as shown below:

```ts
class Foo {
    readonly bar = 1; // OK
    readonly baz: string;
    constructor() {
        this.baz = "hello"; // OK
    }
}
```

## Readonly
There is a type `Readonly` that takes a type `T` and marks all of its properties as `readonly` using mapped types. Here is a demo that uses it in practice: 

```ts
type Foo = {
  bar: number;
  bas: number;
}

type FooReadonly = Readonly<Foo>; 

let foo:Foo = {bar: 123, bas: 456};
let fooReadonly:FooReadonly = {bar: 123, bas: 456};

foo.bar = 456; // Okay
fooReadonly.bar = 456; // ERROR: bar is readonly
```

### Various Use Cases

#### ReactJS
One library that loves immutability is ReactJS, you *could* mark your `Props` and `State` to be immutable e.g.:

```ts
interface Props {
    readonly foo: number;
}
interface State {
    readonly bar: number;
}
export class Something extends React.Component<Props,State> {
  someMethod() {
    // You can rest assured no one is going to do
    this.props.foo = 123; // ERROR: (props are immutable)
    this.state.baz = 456; // ERROR: (one should use this.setState)  
  }
}
```

You do not need to, however, as the type definitions for React mark these as `readonly` already (by internally wrapping the passed in generic types with the `Readonly` type mentioned above).

```ts
export class Something extends React.Component<{ foo: number }, { baz: number }> {
  // You can rest assured no one is going to do
  someMethod() {
    this.props.foo = 123; // ERROR: (props are immutable)
    this.state.baz = 456; // ERROR: (one should use this.setState)  
  }
}
```

#### Seamless Immutable

You can even mark index signatures as readonly:

```ts
/**
 * Declaration
 */
interface Foo {
    readonly[x: number]: number;
}

/**
 * Usage
 */
let foo: Foo = { 0: 123, 2: 345 };
console.log(foo[0]);   // Okay (reading)
foo[0] = 456;          // Error (mutating): Readonly
```

This is great if you want to use native JavaScript arrays in an *immutable* fashion. In fact TypeScript ships with a `ReadonlyArray<T>` interface to allow you to do just that:

```ts
let foo: ReadonlyArray<number> = [1, 2, 3];
console.log(foo[0]);   // Okay
foo.push(4);           // Error: `push` does not exist on ReadonlyArray as it mutates the array
foo = foo.concat([4]); // Okay: create a copy
```

#### Automatic Inference
In some cases the compiler can automatically infer a particular item to be readonly e.g. within a class if you have a property that only has a getter but no setter, it is assumed readonly e.g.:

```ts
class Person {
    firstName: string = "John";
    lastName: string = "Doe";
    get fullName() {
        return this.firstName + this.lastName;
    }
}

const person = new Person();
console.log(person.fullName); // John Doe
person.fullName = "Dear Reader"; // Error! fullName is readonly
```

### Difference from `const`
`const`

1. is for a variable reference
1. the variable cannot be reassigned to anything else.

`readonly` is

1. for a property
1. the property can be modified because of aliasing

Sample explaining 1:

```ts
const foo = 123; // variable reference
var bar: {
    readonly bar: number; // for property
}
```

Sample explaining 2:

```ts
let foo: {
    readonly bar: number;
} = {
        bar: 123
    };

function iMutateFoo(foo: { bar: number }) {
    foo.bar = 456;
}

iMutateFoo(foo); // The foo argument is aliased by the foo parameter
console.log(foo.bar); // 456!
```

Basically `readonly` ensures that a property *cannot be modified by me*, but if you give it to someone that doesn't have that guarantee (allowed for type compatibility reasons) they can modify it. Of course if `iMutateFoo` said that they do not mutate `foo.bar` the compiler would correctly flag it as an error as shown:

```ts
interface Foo {
    readonly bar: number;
}
let foo: Foo = {
    bar: 123
};

function iTakeFoo(foo: Foo) {
    foo.bar = 456; // Error! bar is readonly
}

iTakeFoo(foo); // The foo argument is aliased by the foo parameter
```

[](https://github.com/Microsoft/TypeScript/pull/6532)
