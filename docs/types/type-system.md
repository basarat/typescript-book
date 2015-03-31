# TypeScript Type System
We covered the main features of the TypeScript Type System back when we disucssed *Why TypeScript?*. The following are a few key takeaways from that discussion which don't need further explanation: 
* The type system in typescript is designed to be *optional* so that *your javascript is typescript*.
* TypeScript does not block *JavaScript emit* in the presence of Type Errors, allowing you to *progressively update your JS to TS*. 

In this section we will take a shallow dive into the syntax as well as the semantics of the TypeScript type system. This way you can start using these in your code immediately and see the benefit. This will prepare you for a deeper dive later.

## Annotation
As mentioned before Types are annotated using `:TypeAnnotation` syntax. Anything that is available in the type declaration space can be used as a Type Annotation.

The following example demonstrates type annotations can be used for variables, function parameters and function return values.

```
var num: number = 123;
function identity(num: number): number {
    return num;
}
```

### Primitive Types
The JavaScript primitive types are well represented in the TypeScript type system. This means `string`, `number`, `boolean` as demonstrated below: 

```ts
var num: number;
var str: string;
var bool: boolean;

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error
```

### Arrays
TypeScript provides dedicated type syntax for arrays to make it easier for you to annotate and document your code. The syntax is basically postfixing `[]` to any valid type annotation (e.g. `:boolean[]`). It allows you to safely do any array manipulation that you would normally do and protects you from errors like assigning a member of the wrong type.  This is demonstrated below: 

```ts
var boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2    
boolArray[1] = true;
boolArray = [false, false];

boolArray[0] = 'false'; // Error!
boolArray = 'false'; // Error!
boolArray = [true, 'false']; // Error!
```

### Interfaces
Interfaces are the core way in TypeScript to compose multiple type annotations into a single named annotation. Consider the following example : 

```ts
interface Name {
    first: string;
    second: string;
}

var name: Name;
name = {
    first: 'John',
    second: 'Doe'
};

name = {           // Error : `second` is missing
    first: 'John'
};
name = {           // Error : `second` is the wrong type
    first: 'John',
    second: 1337
}; 
```
Here we've composed the annotations `first: string` + `second: string` into a new annotation `Name` that enforces the type checks on individual members. Interfaces have a lot of power in TypeScript and we will dedicate an entire section to how you can use that to your advantage.

### Inline types
Instead of creating a new `interface` you can annotate anything you want *inline* using `:{ /*Structure*/ }`. The previous example presented again with an inline type: 

```ts
var name: {
    first: string;
    second: string;
};
name = {
    first: 'John',
    second: 'Doe'
};

name = {           // Error : `second` is missing
    first: 'John'
};
name = {           // Error : `second` is the wrong type
    first: 'John',
    second: 1337
};
```
Inline types are great for quickly providing a one off type annotation for something. It saves you the hassle of coming up with (a potentially bad) type name. However, if you find yourself putting in the same type annotation inline multiple times its a good idea to consider refactoring it into an interface.

## Special Types
Beyond the primitive types that have covered there are few types that have special meaning in TypeScript. These are `any`, `null`, `undefined`, `void`.

### any
The `any` type holds a special place in the TypeScript type system. It gives you an escape hatch from the type system to tell the compiler to bugger off. `any` is compatible with *any and all* types in the type system. This means that *anything can be assigned to it* and *it can be assigned to anything*. This is demonstrated it the below example: 

```ts
var power: any;

// Takes any and all types
power = '123';
power = 123;

// Is compatible with all types
var num: number;
power = num;
num = power;
```

If you are porting JavaScript code to TypeScript, you are going to be close friends with `any` in the beginning. However, don't take this friendship too seriously as it means that *it is up to you to ensure the type safety*. You are basically telling the compiler to *not do any meaningful static analysis*.

### `null` and `undefined`

The `null` and `undefined` JavaScript literals are effectively treated by the type system the same as something of type `any`. These literals can be assigned to any other type. This is demonstrated in the below example:

```ts
var num: number;
var str: string;

// These literals can be assigned to anything
num = null;
str = undefined; 
```

## Generics
Many algorithms and data structures in computer science do not depend on the *actual type* of the object. A simple toy example is a function that takes a list of items and returns a reversed list of items: 

```ts
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}

var sample = [1, 2, 3];
var reversed = reverse(sample);
console.log(reversed); // 3,2,1

// Safety!
reversed[0] = '1';     // Error! 
reversed = ['1', '2']; // Error!

reversed[0] = 1;       // Okay
reversed = [1, 2];     // Okay
```

Here you are basically saying that the function `reverse` takes an array (`items: T[]`) of *some* type `T` (notice the type parameter in `reverse<T>`) and returns an array of type `T` (notice `: T[]`). Because the `reverse` function returns items of the same type as it takes, TypeScript knows the the `reversed` variable is also of type `number[]` and will give you Type safety. Similarly if you pass in an array of `string[]` to the reverse function the returned result is also an array of `string[]` and you get similar type safety as shown below: 

```ts
var strArr = ['1', '2'];
var reversedStrs = reverse(strArr);

reversedStr = [1, 2]; // Error!
```

In fact JavaScript arrays already have a `.reverse` function and TypeScript does indeed use generics to define its structure: 

```ts
interface Array<T> {
 reverse(): T[]; 
 // ...
}
```

This means that you get type safety when calling `.reverse` on any array as shown below: 

```ts
var numArr = [1, 2];
var reversedNums = numArr.reverse();

reversedNums = ['1', '2']; // Error!
```
We will discuss more about the `Array<T>` interface later when we present `lib.d.ts`.

## Ambient Declarations

TypeScript provides 

Note: You can find type definitions for nearly 90% of the most popular JavaScript libraries at [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) with contributions from [lots of  developers](https://github.com/borisyankov/DefinitelyTyped/graphs/contributors).

# Interfaces

## lib.d.ts

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