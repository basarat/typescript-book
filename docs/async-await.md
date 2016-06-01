## Async Await

> NOTE: You cannot use async await in TypeScript in a meaningful way (the ES5 emitter is in progress). However that will change soon so we still have this chapter.

As a thought experiment imagine the following, a way to tell the JavaScript runtime to pause the executing of code on the `await` keyword when used on a promise and resume *only* once (and if) the promise returned from the function is settled.

```ts
// Not actual code. A thought experiment
async function foo() {
    try {
        var val = await getMeAPromise();
        console.log(val);
    }
    catch(err) {
        console.log('Error: ', err.message);
    }
}
```

When the promise settles execution continues,
* if it was fulfilled then await will return the value,
* if it's rejected an error will be thrown synchronously which we can catch.

This suddenly (and magically) makes asynchronous programming as easy as synchronous programming.  Three things are needed for this though experiment are.

* Ability to *pause function* execution.
* Ability to *put a value inside* the function.
* Ability to *throw an exception inside* the function.

This is exactly what generators allowed us to do! The thought experiment *is actually real* and is the `async`/`await` implementation in TypeScript / JavaScript. Under the covers it just uses generators.

### Generated JavaScript

You don't have to understand this, but its fairly simple if you've [read up on generators][generators]. The function `foo` can be simply wrapped up as follows:

```ts
const foo = wrapToReturnPromise(function* () {
    try {
        var val = yield getMeAPromise();
        console.log(val);
    }
    catch(err) {
        console.log('Error: ', err.message);
    }
})
```

where the `wrapToReturnPromise` just executes the generator function to get the `generator` and then use `generator.next()`, if the value is a `promise` it would `then`+`catch` the promise and depending upon the result call `genertor.next(result)` or `genertor.throw(error)`. That's it!

[generators]:./generators.md
