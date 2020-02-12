* [Arrow Functions](#arrow-functions)
* [Tip: Arrow Function Need](#tip-arrow-function-need)
* [Tip: Arrow Function Danger](#tip-arrow-function-danger)
* [Tip: Libraries that use `this`](#tip-arrow-functions-with-libraries-that-use-this)
* [Tip: Arrow Function inheritance](#tip-arrow-functions-and-inheritance)
* [Tip: Quick object return](#tip-quick-object-return)

### Arrow Functions

Lovingly called the *fat arrow* (because `->` is a thin arrow and `=>` is a fat arrow) and also called a *lambda function* (because of other languages). Another commonly used feature is the fat arrow function `()=>something`. The motivation for a *fat arrow* is:

1. You don't need to keep typing `function`
1. It lexically captures the meaning of `this`
1. It lexically captures the meaning of `arguments`

For a language that claims to be functional, in JavaScript you tend to be typing `function` quite a lot. The fat arrow makes it simple for you to create a function
```ts
var inc = (x)=>x+1;
```
`this` has traditionally been a pain point in JavaScript. As a wise man once said "I hate JavaScript as it tends to lose the meaning of `this` all too easily". Fat arrows fix it by capturing the meaning of `this` from the surrounding context. Consider this pure JavaScript class:

```ts
function Person(age) {
    this.age = age;
    this.growOld = function() {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 1, should have been 2
```
If you run this code in the browser `this` within the function is going to point to `window` because `window` is going to be what executes the `growOld` function. Fix is to use an arrow function:
```ts
function Person(age) {
    this.age = age;
    this.growOld = () => {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 2
```
The reason why this works is the reference to `this` is captured by the arrow function from outside the function body. This is equivalent to the following JavaScript code (which is what you would write yourself if you didn't have TypeScript):
```ts
function Person(age) {
    this.age = age;
    var _this = this;  // capture this
    this.growOld = function() {
        _this.age++;   // use the captured this
    }
}
var person = new Person(1);
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 2
```
Note that since you are using TypeScript you can be even sweeter in syntax and combine arrows with classes:
```ts
class Person {
    constructor(public age:number) {}
    growOld = () => {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld,1000);

setTimeout(function() { console.log(person.age); },2000); // 2
```

> [A sweet video about this pattern 🌹](https://egghead.io/lessons/typescript-make-usages-of-this-safe-in-class-methods)

#### Tip: Arrow Function Need
Beyond the terse syntax, you only *need* to use the fat arrow if you are going to give the function to someone else to call. Effectively:
```ts
var growOld = person.growOld;
// Then later someone else calls it:
growOld();
```
If you are going to call it yourself, i.e.
```ts
person.growOld();
```
then `this` is going to be the correct calling context (in this example `person`).

#### Tip: Arrow Function Danger

In fact if you want `this` *to be the calling context* you should *not use the arrow function*. This is the case with callbacks used by libraries like jquery, underscore, mocha and others. If the documentation mentions functions on `this` then you should probably just use a `function` instead of a fat arrow. Similarly if you plan to use `arguments` don't use an arrow function.

#### Tip: Arrow functions with libraries that use `this`
Many libraries do this e.g. `jQuery` iterables (one example https://api.jquery.com/jquery.each/) will use `this` to pass you the object that it is currently iterating over. In this case if you want to access the library passed `this` as well as the surrounding context just use a temp variable like `_self` like you would in the absence of arrow functions.

```ts
let _self = this;
something.each(function() {
    console.log(_self); // the lexically scoped value
    console.log(this); // the library passed value
});
```

#### Tip: Arrow functions and inheritance
Arrow functions as properties on classes work fine with inheritance: 

```ts
class Adder {
    constructor(public a: number) {}
    add = (b: number): number => {
        return this.a + b;
    }
}
class Child extends Adder {
    callAdd(b: number) {
        return this.add(b);
    }
}
// Demo to show it works
const child = new Child(123);
console.log(child.callAdd(123)); // 246
```

However, they do not work with the `super` keyword when you try to override the function in a child class. Properties go on `this`. Since there is only one `this` such functions cannot participate in a call to `super` (`super` only works on prototype members). You can easily get around it by creating a copy of the method before overriding it in the child.

```ts
class Adder {
    constructor(public a: number) {}
    // This function is now safe to pass around
    add = (b: number): number => {
        return this.a + b;
    }
}

class ExtendedAdder extends Adder {
    // Create a copy of parent before creating our own
    private superAdd = this.add;
    // Now create our override
    add = (b: number): number => {
        return this.superAdd(b);
    }
}
```

### Tip: Quick object return

Sometimes you need a function that just returns a simple object literal. However, something like

```ts
// WRONG WAY TO DO IT
var foo = () => {
    bar: 123
};
```
is parsed as a *block* containing a *JavaScript Label* by JavaScript runtimes (cause of the JavaScript specification).

>  If that doesn't make sense, don't worry, as you get a nice compiler error from TypeScript saying "unused label" anyways. Labels are an old (and mostly unused) JavaScript feature that you can ignore as a modern GOTO (considered bad by experienced developers 🌹)

You can fix it by surrounding the object literal with `()`:

```ts
// Correct 🌹
var foo = () => ({
    bar: 123
});
```
