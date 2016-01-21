:warning: Work in progress

## Type Guard
Type Guards allow you to narrow down the type of an object within a conditional block. TypeScript is aware of the usage of the JavaScript `instanceof` and `typeof` operators. If you use these in a conditional block, TypeScript will understand the type of the variable to be different within that conditional block. Here is a quick example where TypeScript realizes that a particular function does not exist on `string` and points out what was probably a user typo:

```ts
var x: any = /* something */ '123';

// Within the block TypeScript knows that x must be a string
if (typeof x === 'string') {
    console.log(x.subtr(1)); // Error, 'subtr' does not exist on 'string'
}

// x is still any here
x.subtr(); // OK
```

### User Defined Type Guards
JavaScript doesn't have very rich runtime introspection support built in.
