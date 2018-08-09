



# Functions

## Optional
The `?` annotation can be used before a function argument or member of an interface to denote that a member is optional. That is to say that you can provide it if you want (and it will be type checked), but if it is ommited its *okay*. This is shown in the following example:

## Specialized Parameters

## Function Overloads
The JavaScript runtime does not have runtime support for function overloading. There can be only a single function body for any given name in scope. However, people do support function overloading by utilizing the highly dynamic nature of JavaScript e.g. a getter and a setter:

```ts
var _value;
function getOrSet(value) {
    if (value === undefined) {
        return _value;
    } else {
        _value = value;
    }
}

getOrSet(1); // set : 1
console.log(getOrSet()); // get : 1
```

Such implementation can be captured by the TypeScript's type system by providing function signatures before the function implementation:

```ts
var _value;
function getOrSet(): number;
function getOrSet(value: number);
function getOrSet(value?: number) {
    if (value === undefined) {
        return _value;
    } else {
        _value = value;
    }
}

getOrSet(1); // set : 1
console.log(getOrSet()); // get : 1
```

Note that when you define function overloads this way, *the last signature is actually not callable*. You have to provide it however, to help the implementer of the function be aware of the consequences of his overload signatures. For example, in the following example the function with the signature `function callMe(v1?: any, v2?: any): any` is not open to public use:

```ts
function callMe(): number;
function callMe(v1: number);
function callMe(v1: string, v2: number);
function callMe(v1?: any, v2?: any): any {
    // Implementation body goes here
}

// Allowed calls
callMe();
callMe(1);
callMe('jenny', 5309);

// COMPILER ERROR: invalid calls
callMe('jenny');
callMe('jenny', '5309');
```

TIP: Note that there is a slight overlap between union types and function overloading. If two function signatures only differ by a single parameter having different types just use a union type for that parameter instead of creating an overload signature.


# Interfaces

Interfaces have a lot of power in TypeScript. This is because they are designed to capture all the complexity of




# Ambient Declarations

We previously had a brief look at ambient declarations in the section *why typescript?*. One of the core design goals of TypeScript is to allow easy consumption of existing JavaScript libraries. You can declare the type information for existing JavaScript using *ambient declarations*. You declare ambient stuff using the `declare` keyword. In fact this is how a bunch of stuff available by default in a browser environment (e.g `window`, `document` etc) is declared in a file called `lib.d.ts`


Note: You can find type definitions for nearly 90% of the most popular JavaScript libraries at [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) with contributions from [lots of  developers](https://github.com/borisyankov/DefinitelyTyped/graphs/contributors).



### lib.d.ts

# Interfaces



### Interfaces for primitive types

### Interface for array

## Type Alias

## Union Types
needed for configuration objects

## Type Inference
It tries to *infer* as much as it can *so that you don't need to explicitly type* your code.

## Function Signatures

Specialized

## Type Assertion

If A is a subtype of B or B is a subtype of A.








[more on interfaces]
Structural so more information is okay, but less information is an error. Duck typing is baked deep into the language design.
Open Ended
Type Compatibility
