# Function Arguments 

If you have a function that takes too many arguments, or arguments of the same type you might want to consider changing the function to take an object instead. 

Consider the following function 

```ts
function foo(flagA: boolean, flagB: boolean) {
  // your awesome function body 
}
```

With such a funciton definition its quite easy to invoke it wrongly e.g. `foo(flagB, flagA)` and you would get no help from the compiler. 

Instead of convert the function to take an object: 

```ts
function foo(config: {flagA: boolean, flabB: boolean}) {
  const {flagA, flagB} = config;
  // your awesome function body 
}
```
Now the function calls will look like `foo({flagA, flagB})` which is much easier to code review and see for mistakes.

> Note : If your function is simple enough and you don't expect much churn feel free to ignore this advice 🌹.
