## Classes Are Useful

It is very common to have the following structure:

```ts
function foo() {
    let someProperty;

    // Some other initialization code

    function someMethod() {
        // Do some stuff with `someProperty`
        // And potentially other things
    }
    // Maybe some other methods

    return {
        someMethod,
        // Maybe some other methods
    };
}
```

This is known as the *revealing module pattern* and quite common in JavaScript (taking advantage of JavaScript closure).

If you use [*file modules* (which you really should as global scope is bad)](../project/modules.md) then *your file is effectively the same*. However, there are too many cases where people will write code like the following:

```ts
let someProperty;

function foo() {
   // Some initialization code
}
foo(); // some initialization code

someProperty = 123; // some more initialization

// Some utility function not exported

// later
export function someMethod() {

}
```

Even though I am not a big fan of inheritance *I do find that letting people use classes helps them organize their code better*. The same developer would intuitively write the following:

```ts
class Foo {
    public someProperty;

    constructor() {
        // some initialization
    }

    public someMethod() {
        // some code
    }

    private someUtility() {
        // some code
    }
}

export = new Foo();
```

And its not just developers, creating dev tools that provide great visualizations over classes are much more common, and there is one less pattern your team needs to understand and maintain.

> PS: There is nothing wrong in my opinion with *shallow* class hierarchies if they provide significant reuse and reduction in boiler plate.
