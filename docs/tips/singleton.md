# Singleton Pattern

The conventional singleton pattern is really something that is used to overcome the fact that all code must be in a `class`.

```ts
class Singleton {
    private static singleton: Singleton;
    constructor() {
        if (!Singleton.singleton) {
            Singleton.singleton = this;			
        }
        return Singleton.singleton;
    }
    someMethod() { }
}

var something = new Singleton();
var somethingElse = new Singleton();

console.log(something === somethingElse); // true;
```

However if you don't want lazy initialization you can instead just use a `namespace`: 

```ts
namespace Singleton {
    export function someMethod() { }
}
// Usage
Singleton.someMethod();
```
