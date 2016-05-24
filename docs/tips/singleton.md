# Singleton Pattern

The conventional singleton pattern is really something this is used to overcome the fact that all code must be in a `class`.

```ts
// USELESS PATTERN
class Singleton {
    /* ... lots of singleton logic ... */
    public someMethod() { ... }
}

// Using
var x = Singleton.getInstance();
x.someMethod();
```

However its much simpler in TypeScript. Just use a `namespace`: 

```ts
namespace Singleton {
    export function someMethod() { ... }
}
// Usage
Singleton.someMethod();
```
