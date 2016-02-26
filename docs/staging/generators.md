### Generators
Also called `function *`, generators allow you to create functions whose execution can be paused and then later resumed maintaining the state between pause-resume transitions. The value returned from a generator is called an `iterator` and can be used to control this `pause-resume` transition.

Here is a simple example of a generator function that generates an *infinite* list of whole numbers.

```ts
function* wholeNumbers() {
    var current = 0;
    while(true) {
        yield current++;
    }
}
```

The `yield` contextual keyword is used to return control from a generator (effectively pausing function execution) along with an optional value (here `current`). You can get access to this value using the `iterator`'s `.next()` member function, this is shown below:

```ts
function* wholeNumbers() {
    var current = 0;
    while(true) {
        yield current++;
    }
}
var iterator = wholeNumbers();
console.log(iterator.next()); // 0
console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
// so on till infinity....
```

Now that you have seen `function*`, `yield` and `.next()` we can dig deeper.

#### Catching Errors
Any errors thrown (intentially using `throw` or unintentionally due to error) from the generator can be caught using `try/catch` just like normal function executions. This is demonstrated below:

```ts
function* wholeNumbers() {
    var current = 0;
    while(true) {
      if (current === 3)
        throw new Error('3 is the magic number');
      else
        yield current++;
    }
}
var iterator = wholeNumbers();
console.log(iterator.next()); // 0
console.log(iterator.next()); // 1
console.log(iterator.next()); // 2
try {
    console.log(iterator.next()); // Will throw an error
}
catch(ex) {
    console.log(ex.message); // 3 is the magic number
}
```

#### Controlling function execution externally
The iterator returned from the generator function can be used to control the state *inside* the generator function as well.

// TODO: example
