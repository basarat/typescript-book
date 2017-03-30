## Namespaces
Namespaces provide you with a convenient syntax around a common pattern used in JavaScript:

```ts
(function(something) {

    something.foo = 123;

})(something || (something = {}))
```

Basically `something || (something = {})` allows an anonymous function `function(something) {}` to *add stuff to an existing object* (the `something ||` portion) or *start a new object then add stuff to that object* (the `|| (something = {})` portion). This means that you can have two such blocks split by some execution boundary:

```ts
(function(something) {

    something.foo = 123;

})(something || (something = {}))

console.log(something); // {foo:123}

(function(something) {

    something.bar = 456;

})(something || (something = {}))

console.log(something); // {foo:123, bar:456}

```

This is commonly used in  the JavaScript land for making sure that stuff doesn't leak into the global namespace. With file based modules you don't need to worry about this, but the pattern is still useful for *logical grouping* of a bunch of functions. Therefore TypeScript provides the `namespace` keyword to group these e.g.:

```ts
namespace Utility {
    export function log(msg) {
        console.log(msg);
    }
    export function error(msg) {
        console.error(msg);
    }
}

// usage
Utility.log('Call me');
Utility.error('maybe!');
```

The `namespace` keyword generates the same JavaScript that we saw earlier:

```ts
(function (Utility) {

// Add stuff to Utility

})(Utility || (Utility = {}));
```

One thing to note is that namespaces can be nested so you can do stuff like `namespace Utility.Messaging` to nest a `Messaging` namespace under `Utility`.

For most projects we recommend using external modules and using `namespace` for quick demos and porting old JavaScript code.
