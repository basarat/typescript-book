# Why TypeScript
There are two main goals of TypeScript:
* Provider an *optional type system* for JavaScript.
* Provide features of future JavaScript version to current JavaScript engines.

We find it best to explain these in separation in first go.

## The TypeScript type system

### Why Types?
* Increase you agility when doing refactorings
* Types are one of the best forms of documentation you can have. *The function signature is a theorem and the function body is the proof*.

### Your JavaScript is TypeScript
TypeScript provides compile time Type safety for your JavaScript code. This is no surprise given its name. The great thing is that the types are completely optional. Your JavaScript code `.js` file can be renamed to a `.ts` file and TypeScript will still give you back valid `.js` equivalent to the original JavaScript file. TypeScript is *intentionally* and strictly a superset of JavaScript with optional Type checking.

### Types are Inferred
In order to give you type safety with minimal cost of productivity during new code development. E.g. TypeScript will know that foo is of type `number` below and will give an error on the second line as shown:

```ts
var foo = 123;
foo = '456'; // Error: cannot assign `string` to `number`

// Is foo a number or a string?
```
The motivation is that if you do stuff like this, in the rest of your code you cannot be certain that `foo` is a `number` or a `string`. Such issues turn up often in large multi-file code bases. We will deep dive into the type inference rules later.

### Types can be specified
As we've mentioned before, TypeScript will infer as much as it can safely, however you can use annotations to:
1. Help along the compiler, and more importantly the next developer who has to read your code (that might be future you!).
1. Enforce that what the compiler sees is, what you thought it should see. That is your understanding of the code matches an algorithmic analysis of the code (done by the compiler).

TypeScript uses postfix type annotations popular in other *optionally* annotated languages (e.g. ActionScript).

```ts
var foo: number = 123;
```
So if you do something wrong the compiler will error e.g.:

```ts
var foo: number = '123'; // Error: cannot assign a `string` to a `number`
```

We will discuss all the details of all the annotation methods supported by TypeScript in a later chapter.

### Types are structural
In some languages (specifically nominally typed ones) static typing results in unnecessary ceremony because even though *you know* that the code will work fine the language semantics force you to copy stuff around. This is why stuff like [automapper for C#](http://automapper.org/) exists. In TypeScript because we really want it to be easy for JavaScript developers, and be minimum cognitive overload types are *structural*. This means that *duck typing* is a first class language construct. An example is in order:

```ts
interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
var point2D: Point2D = { x: 0, y: 10, }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) { /* do something */ }

iTakePoint2D(point2D); // exact match okay
iTakePoint2D(point3D); // extra information okay
iTakePoint2D({ x: 0 }); // Error: missing information `y`
```


[](Interfaces are open ended)
[](Type Inferernce rules)
[](Cover all the annotations)

{% include "footer.md" %}