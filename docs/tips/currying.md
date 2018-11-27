## Currying

Just use a chain of fat arrow functions:

```ts
// A curried function
let divide = (x: number) => (y: number) => y / x;

// Simple usage
divide(2)(6); //returns 3

// partially applied
let divideBy2 = divide(2);

// fully apply the function
divideBy2(6);  //returns 3
```
