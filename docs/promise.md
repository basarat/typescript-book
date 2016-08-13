## Promise

The `Promise` class is something that exists in many modern JavaScript engines and can be easily [polyfilled][polyfill]. The main motivation for promises is to bring synchronous style error handling to Async / Callback style code.

### Callback style code

In order to fully appreciate promises lets present a simple sample that proves the difficulty of creating reliable Async code with just callbacks. Consider the simple case of authoring an async version of loading JSON from a file. A synchronous version of this can be quite simply

```ts
import fs = require('fs');

function loadJSONSync(filename: string) {
    return JSON.parse(fs.readFileSync(filename));
}

// good json file
console.log(loadJSONSync('good.json'));

// non-existent json file
try {
    console.log(loadJSONSync('absent.json'));
}
catch (err) {
    console.log('absent.json error', err.message);
}

// invalid json file
try {
    console.log(loadJSONSync('bad.json'));
}
catch (err) {
    console.log('bad.json error', err.message);
}
```

There are three behaviors of this simple `loadJSONSync` function, a valid return value, a file system error or a JSON.parse error. We handle the errors with a simple try/catch as you are used to when doing synchronous programming in other languages. Now let's make a good async version of such a function. A decent initial attempt with a trivial error checking logic would be as follows,

```ts
import fs = require('fs');

function loadJSON(filename: string, cb: (error: Error, data: any) => void) {
    fs.readFile(filename, function (err, data) {
        if (err) cb(err);
        else cb(null, JSON.parse(data));
    });
}
```

Simple enough, it takes a callback, passes any file system errors to the callback. If no filesystem errors, it returns the `JSON.parse` result. A few points to keep in mind when working with async functions based on callbacks are

1. Never call the callback twice.
1. Never throw an error.

This simple function however fails to accommodate for point two. In fact `JSON.parse` throws an error if it is passed bad JSON and the callback never gets called and the application crashes. This is demonstrated in the below example:

```ts
// load invalid json
loadJSON('bad.json', function (err, data) {
    // NEVER GETS CALLED!
    if (err) console.log('bad.json error', err.message);
    else console.log(data);
});
```

A naïve attempt at fixing this would be to wrap the `JSON.parse` in a try catch as shown in the below example:

```ts
import fs = require('fs');

function loadJSON(filename: string, cb: (error: Error) => void) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            cb(err);
        }
        else {
            try {
                cb(null, JSON.parse(data));
            }
            catch (err) {
                cb(err);
            }
        }
    });
}

// load invalid json
loadJSON('bad.json', function (err, data) {
    if (err) console.log('bad.json error', err.message);
    else console.log(data);
});
```

However there is a subtle bug in this code. If the callback (`cb`), and not `JSON.parse`, throws an error, since we wrapped it in a `try`/`catch`, the `catch` executes and we call the callback again i.e. the callback gets called twice! This is demonstrated in the example below:

```ts
import fs = require('fs');

function loadJSON(filename: string, cb: (error: Error) => void) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            cb(err);
        }
        else {
            try {
                cb(null, JSON.parse(data));
            }
            catch (err) {
                cb(err);
            }
        }
    });
}

// a good file but a bad callback ... gets called again!
loadJSON('good.json', function (err, data) {
    console.log('our callback called');

    if (err) console.log('Error:', err.message);
    else {
        // lets simulate an error by trying to access a property on an undefined variable
        var foo;
        console.log(foo.bar);
    }
});
```

```bash
$ node asyncbadcatchdemo.js
our callback called
our callback called
Error: Cannot read property 'bar' of undefined
```

This is because our `loadJSON` function wrongfully wrapped the callback in a `try` block. There is a simple lesson to remember here.

> Simple lesson: Contain all you sync code in a try catch, except when you call the callback.

Following this simple lesson we have a fully functional async version of `loadJSON` as shown below:

```ts
import fs = require('fs');

function loadJSON(filename: string, cb: (error: Error) => void) {
    fs.readFile(filename, function (err, data) {
        if (err) return cb(err);
        try {
            var parsed = JSON.parse(data);
        }
        catch (err) {
            return cb(err);
        }
        return cb(null, parsed);
    });
}
```
Admittedly this is not hard to follow once you've done it a few times but nonetheless it’s a lot of boiler plate code to write simply for good error handling. Now let's look at a better way to tackle asynchronous JavaScript using promises.

## Creating a Promise

A promise can be either `pending` or `resolved` or `rejected`.

![](https://raw.githubusercontent.com/basarat/typescript-book/master/images/promise%20states%20and%20fates.png)

Lets look at creating a promise. Its a simple matter of calling `new` on `Promise` (the promise constructor). The promise constructor is passed `resolve` and `reject` functions for settling the promise state.

```ts
const promise = new Promise((resolve, reject) => {
    // the resolve / reject functions control the fate of the promise
});
```

### Subscribing to the fate of the promise

The promise fate can be subscribed to using `.then` (if resolved) or `.catch` (if rejected).

```ts
const promise = new Promise((resolve, reject) => {
    resolve(123);
});
promise.then((res) => {
    console.log('I get called:', res === 123); // I get called: true
});
promise.catch((err) => {
    // This is never called
});
```

```ts
const promise = new Promise((resolve, reject) => {
    reject(new Error("Something awful happened"));
});
promise.then((res) => {
    // This is never called
});
promise.catch((err) => {
    console.log('I get called:', err.message); // I get called: 'Something awful happened'
});
```

### Promise Shortcuts
* Quickly creating an already resolved promise : `Promise.resolve(result)`
* Quickly creating an already rejected promise : `Promise.reject(error)`

### Chain-ability of Promises
The chain-ability of promises **is the heart of the benefit that promises provide**. Once you have a promise, from that point on, you use the `then` function to create a chain of promises.

* If you return a promise from any function in the chain, `.then` is only called once the value is resolved

```ts
Promise.resolve(123)
    .then((res) => {
        console.log(res); // 123
        return 456;
    })
    .then((res) => {
        console.log(res); // 456
        return Promise.resolve(123);
    })
    .then((res) => {
        console.log(res); // 123 : Notice that this `this` is called with the resolved value
        return Promise.resolve(123);
    })
```

* you can aggregate the error handling of any preceding portion of the chain with a single `catch`

```ts
Promise.reject(new Error('something bad happened'))
    .then((res) => {
        console.log(res); // not called
        return 456;
    })
    .then((res) => {
        console.log(res); // not called
        return Promise.resolve(123);
    })
    .then((res) => {
        console.log(res); // not called
        return Promise.resolve(123);
    })
    .catch((err) => {
        console.log(err.message); // something bad happened        
    });
```

* the `catch` actually returns a new promise (effectively creating a new promise chain):

```ts
Promise.reject(new Error('something bad happened'))
    .then((res) => {
        console.log(res); // not called
        return 456;
    })
    .catch((err) => {
        console.log(err.message); // something bad happened
        return Promise.resolve(123);
    })
    .then((res) => {
        console.log(res); // 123
    })
```

* Any synchronous errors thrown in a `then` (or `catch`) result in the returned promise to fail

```ts
Promise.resolve(123)
    .then((res) => {
        throw new Error('something bad happened')
        return 456;
    })
    .then((res) => {
        console.log(res); // never called
        return Promise.resolve(789);
    })
    .catch((err) => {
        console.log(err.message); // something bad happened
    })
```

> The fact that errors jump to the tailing `catch` (and skip middle `then`) along with synchronous errors also getting caught effectively provides us with an async programming paradigm that allows better error handling than raw callbacks.


### TypeScript and promises
The great thing about TypeScript is that it understands the flow of values throw a promise chain.

```ts
Promise.resolve(123)
    .then((res)=>{
         // res is inferred to be of type `number`
         return true;
    })
    .then((res) => {
        // res is inferred to be of type `boolean`

    });
```

Of course it also understands unwrapping any function calls that might return a promise:

```ts
function iReturnPromiseAfter1Second():Promise<string> {
    return new Promise((resolve)=>{
        setTimeout(()=>resolve("Hello world!"), 1000);
    });
}

Promise.resolve(123)
    .then((res)=>{
         // res is inferred to be of type `number`
         return iReturnPromiseAfter1Second();
    })
    .then((res) => {
        // res is inferred to be of type `string`
        console.log(res); // Hello world!
    });
```


### Converting a callback style function to return a promise

Just wrap the function call in a promise and `reject` if an error occurs, and resolve if it is all good. E.g. lets wrap `fs.readFile`

```ts
import fs = require('fs');
function readFileAsync(filename:string):Promise<any> {
    return new Promise((resolve,reject)=>{
        fs.readFile(filename,(err,result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}
```


### Revisiting the JSON example
Now let's revisit our `loadJSON` example and rewrite an async version that uses promises. All that we need to do is read the file contents as a promise, then parse them as JSON and we are done. This is illustrated in the below example:

```ts
function loadJSONAsync(filename: string): Promise<any> {
    return readFileAsync(filename)
                .then(function (res) {
                    return JSON.parse(res);
                });
}
```

Usage (notice how similar it is to the original `sync` version introduced at the start of this section 🌹):
```ts
// good json file
loadJSONAsync('good.json')
    .then(function (val) { console.log(val); })
    .catch(function (err) {
        console.log('good.json error', err.message); // never called
    })

// non-existent json file
    .then(function () {
        return loadJSONAsync('absent.json');
    })
    .then(function (val) { console.log(val); }) // never called
    .catch(function (err) {
        console.log('absent.json error', err.message);
    })

// invalid json file
    .then(function () {
        return loadJSONAsync('bad.json');
    })
    .then(function (val) { console.log(val); }) // never called
    .catch(function (err) {
        console.log('bad.json error', err.message);
    });
```

### Parallel control flow
We have seen how trivial doing a serial sequence of async tasks is with promises. It is simply a matter of chaining `then` calls.

However you might potentially want to run a series of async tasks and then do something with the results of all of these tasks. `Promise` provides a static `Promise.all` function that you can use to wait for n number of promises to complete. You provide it with an array of `n` promises and it gives you array of `n` resolved values. This is shown below:

```ts
// an async function to simulate loading an item from some server
function loadItem(id: string): Promise<{id: string}> {
    return new Promise((resolve)=>{
        console.log('loading item', id);
        setTimeout(() => { // simulate a server delay
            resolve({ id: id });
        }, 1000);    
    });
}

// Chaining
let item1, item2;
loadItem(1)
    .then((res) => {
        item1 = res;
        return loaditem(2);
    })
    .then((res) => {
        item2 = res;
        console.log('done');
    }); // overall time will be around 2s

// Parallel
Promise.all([loadItem(1),loaditem(2)])
    .then((res) => {
        [item1,item2] = res;
        console.log('done')    
    }); // overall time will be around 1s
```


[polyfill]:https://github.com/stefanpenner/es6-promise
