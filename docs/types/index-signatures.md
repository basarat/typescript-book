# Index Signatures

An `Object` in JavaScript (and hence TypeScript) can be accessed with a **string** to hold a reference to any other JavaScript **object**.

Here is a quick example:

```ts
let foo:any = {};
foo['Hello'] = 'World';
console.log(foo['Hello']); // World
```

We store a string `"World"` under the key `"Hello"`. Remember we said it can store any JavaScript **object**, so lets store a class instance just to show the concept:

```ts
class Foo {
  constructor(public message: string){};
  log(){
    console.log(this.message)
  }
}

let foo:any = {};
foo['Hello'] = new Foo('World');
foo['Hello'].log(); // World
```

Also remember that we said that it can be accessed with a **string**. If you pass some any other object to the index signature the JavaScript runtime actually calls `.toString` on it before getting the result. This is demonstrated below:

```ts
let obj = {
  toString(){
    console.log('toString called')
    return 'Hello'
  }
}

let foo:any = {};
foo[obj] = 'World'; // toString called
console.log(foo[obj]); // toString called, World
console.log(foo['Hello']); // World
```
Note that `toString` will get called whenever the `obj` is used in an index position.

Arrays are slightly different. For `number` indexing JavaScript VMs will try to optimise (depending on things like is it actually an array and do the structures of items stored match etc.). So `number` should be considered as a valid object accessor in its own right (distinct from `string`). Here is a simple array example:

```ts
let foo = ['World'];
console.log(foo[0]); // World
```

So that's JavaScript. Now let's look at TypeScript graceful handling of this concept.

## TypeScript Index Signature

First off, because JavaScript *implicitly* calls `toString` on any object index signature, TypeScript will give you an error to prevent beginners from shooting themselves in the foot (I see users shooting themselves in their feet when using JavaScript all the time on stackoverflow):

```ts
let obj = {
  toString(){
    return 'Hello'
  }
}

let foo:any = {};

// ERROR: the index signature must be string, number ...
foo[obj] = 'World';

// FIX: TypeScript forces you to be explicit
foo[obj.toString()] = 'World';
```

The reason for forcing the user to be explicit is because the default `toString` implementation on an object is pretty awful, e.g. on v8 it always returns `[object Object]`:

```ts
let obj = {message:'Hello'}
let foo:any = {};

// ERROR: the index signature must be string, number ...
foo[obj] = 'World';

// Here is what you actually stored!
console.log(foo["[object Object]"]); // World
```

Of course `number` is supported because

1. its needed for excellent Array / Tuple support.
1. even if you use it for an `obj` its default `toString` implementation is nice (not `[object Object]`).

Point 2 is shown below:

```ts
console.log((1).toString()); // 1
console.log((2).toString()); // 2
```

So lesson 1:

> TypeScript index signatures must be either `string` or `number`

Quick note: `symbols` are also valid and supported by TypeScript. But let's not go there just yet. Baby steps.


### Declaring an index signature

So we've been using `any` to tell TypeScript to let us do whatever we want. We can actually specify an *index* signature explicitly. E.g. say you want to make sure than anything that is stored in an object using a string conforms to the structure `{message: string}`. This can be done with the declaration `{ [index:string] : {message: string} }`. This is demonstrated below:

```ts
let foo:{ [index:string] : {message: string} } = {};

/**
 * Must store stuff that conforms the structure
 */
/** Ok */
foo['a'] = { message: 'some message' };
/** Error: must contain a `message` or type string. You have a typo in `message` */
foo['a'] = { messages: 'some message' };

/**
 * Stuff that is read is also type checked
 */
/** Ok */
foo['a'].message;
/** Error: messages does not exist. You have a typo in `message` */
foo['a'].messages;
```

> TIP: the name of the index signature e.g. `index` in `{ [index:string] : {message: string} }` has no significance for TypeScript and really for readability. e.g. if its user names you can do `{ [username:string] : {message: string} }` to help the next dev who looks at the code (which just might happen to be you).

Of course `number` indexes are also supported e.g. `{ [count: number] : SomeOtherTypeYouWantToStoreEgRebate }`

### All members must conform to the `string` index signature

As soon as you have a `string` index signature, all explicit members must also conform to that index signature. This is shown below:

```ts
/** Okay */
interface Foo {
  [key:string]: number
  x: number;
  y: number;
}
/** Error */
interface Bar {
  [key:string]: number
  x: number;
  y: string; // Property `y` must of of type number
}
```

This is to provide safety so that any string access gives the same result:

```ts
interface Foo {
  [key:string]: number
  x: number;
}
let foo: Foo = {x:1,y:2};

// Directly
foo['x']; // number

// Indirectly
let x = 'x'
foo[x]; // number
```
### Using a limited set of string literals

An index signature can require that index strings be members of a union of literal strings by using *Mapped Types* e.g.:

```ts
type Index = 'a' | 'b' | 'c'
type FromIndex = { [k in Index]?: number }

const good: FromIndex = {b:1, c:2}

// Error:
// Type '{ b: number; c: number; d: number; }' is not assignable to type 'FromIndex'.
//  Object literal may only specify known properties, and 'd' does not exist in type 'FromIndex'.
const bad: FromIndex = {b:1, c:2, d:3};
```
This is often used together with `keyof typeof` to capture vocabulary types, described on the next page.

The specification of the vocabulary can be deferred generically:

```ts
type FromSomeIndex<K extends string> = { [key in K]: number }
```

### Having both `string` and `number` indexers

This is not a common use case, but TypeScript compiler supports it nonetheless.

However it has the restriction that the `string` indexer is more strict than the `number` indexer. This is intentional e.g. to allow typing stuff like:

```ts
interface ArrStr {
  [key: string]: string | number; // Must accomodate all members

  [index: number]: string; // Can be a subset of string indexer

  // Just an example member
  length: number;
}
```

### Design Pattern: Nested index signature

> API consideration when adding index signatures

Quite commonly in the JS community you will see APIs that abuse string indexers. e.g. a common pattern among CSS in JS libraries:

```js
interface NestedCSS {
  color?: string;
  [selector: string]: string | NestedCSS;
}

const example: NestedCSS = {
  color: 'red',
  '.subclass': {
    color: 'blue'
  }
}
```
Try not to mix string indexers with *valid* values this way. E.g. a typo in the padding will remain uncaught:

```js
const failsSilently: NestedCSS = {
  colour: 'red', // No error as `colour` is a valid string selector
}
```

Instead seperate out the nesting into its own property e.g. in a name like `nest` (or `children` or `subnodes` etc.):

```js
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: NestedCSS;
  }
}

const example: NestedCSS = {
  color: 'red',
  nest: {
    '.subclass': {
      color: 'blue'
    }
  }
}

const failsSilently: NestedCSS = {
  colour: 'red', // TS Error: unknown property `colour`
}
```
