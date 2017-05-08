# Exception Handling

JavaScript has an `Error` class that you can use for exceptions. You throw an error with the `throw` keyword. You can catch it with a `try` / `catch` block pair e.g. 

```js
try {
  throw new Error('Something bad happened');
}
catch(e) {
  console.log(e);
}
```

## Error Sub Types
Beyond the built in `Error` class there are a few additional built-in error classes that inherit from `Error` that the JavaScript runtime can throw: 

### RangeError
Creates an instance representing an error that occurs when a numeric variable or parameter is outside of its valid range.

```js
// Call console with too many arguments
console.log.apply(console, new Array(1000000000)); // RangeError: Invalid array length
```

### ReferenceError
Creates an instance representing an error that occurs when de-referencing an invalid reference. e.g. 

```js
'use strict';
console.log(notValidVar); // ReferenceError: notValidVar is not defined
```
### SyntaxError
Creates an instance representing a syntax error that occurs while parsing code that isn't valid JavaScript.

```js
1***3; // SyntaxError: Unexpectd token *
```
### TypeError
Creates an instance representing an error that occurs when a variable or parameter is not of a valid type.
```js
('1.2').toPrecision(1); // TypeError: '1.2'.toPrecision is not a function
```

### URIError
Creates an instance representing an error that occurs when `encodeURI()` or `decodeURI()` are passed invalid parameters.
```js
decodeURI('%'); // URIError: URI malformed
```

## Always use `Error`
Beginner JavaScript developers sometimes just throw raw strings e.g. 
```js
try {
  throw 'Something bad happened';
}
catch(e) {
  console.log(e);
}
```
*Don't do that*. Such raw strings result in a very painful debugging and error handling experience.


## Exceptional cases
`Exceptions should be exceptional` is a common saying in computer science. There are few resons why this is true for JavaScript (and TypeScript) as well. 

### Unclear where is is thrown 
Consider the following piece of code: 
```js
try {
  const foo = runTask1();
  const bar = runTask2();
}
catch(e) {
  console.log('Error:', e);
}
```
The next developer cannot know which funtion might throw the error. The person reviewing the code cannot know without reading the code for task1 / task2 and other functions they might call etc.

### Makes graceful handling hard
You can try to make it graceful with explicit catch around each thing that might throw:

```js
try {
  const foo = runTask1();
}
catch(e) {
  console.log('Error:', e);
}
try {
  const bar = runTask2();
}
catch(e) {
  console.log('Error:', e);
}
```
But now if you need to pass stuff from the first task to the second one the code becomes messy: (notice `foo` mutation requiring `let` + explicit need for annotating it because it cannot be inferred from the return of `runTask1`):

```js
let foo: number; // Notice use of `let` and explicit type annotation
try {
  foo = runTask1();
}
catch(e) {
  console.log('Error:', e);
}
try {
  const bar = runTask2(foo);
}
catch(e) {
  console.log('Error:', e);
}
```

### Not well represented in the type system

Consider the function: 

```js
function validate(value: number) {
  if (value < 0 || value > 100) throw new Error('Invalid value');
}
```
Using `Error` for such cases is a bad idea as it is not represented in the type definition for the validate function (which is `(value:number) => void`). Instead a better way to create a validate method would be: 

```js
function validate(value: number): {error?: string} {
  if (value < 0 || value > 100) return {error:'Invalid value'};
}
```
And not its represented in the type system.
