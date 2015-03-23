### Arrow Functions

Lovingly called the *fat arrow* (becuase `->` is a thin arrow and `=>` is a fat arrow) and also called a *lambda function* (because of other languages). Another commonly used feature is the fat arrow function `()=>something`. The motivation for a *fat arrow* is: 
1. You don't need to keep typing `function`
1. I lexically captures the meaning of `this`

For a language that claims to be functional, in JavaScript you tend to be typing `function` quite a lot. The fat arrow makes it simple for you to create a function 
```ts
var inc = (x)=>x+1;
```
`this` has traditionally been a pain point in JavaScript. As a wise man once said "I hate JavaScript as it tends to lose the meaning of `this` all too easily". Fat arrows fix it by capturing the meaning of `this` from the surrounding context. Consider this pure JavaScript class: 

```ts
function Person(age) {
    this.age = age
    this.growOld = function(){
        this.age++;
    }
}
var person = new Person(1); 
setTimeout(person.growOld,1000);

setTimeout(function(){ console.log(person.age); },2000); // 1, should have been 2
```
If you run this code in the browser `this` within the function is going to point to `window` because `window` is going to be what executes the `growOld` function. Fix is to use an arrow function: 
```ts
function Person(age) {
    this.age = age
    this.growOld = () => {
        this.age++;
    }
}
var person = new Person(1); 
setTimeout(person.growOld,1000);

setTimeout(function(){ console.log(person.age); },2000); // 2
```
The reason why this works is the reference to `this` is captured by the arrow function from outside the function body. This is equivalent to the following JavaScript code (which is what you would write yourself if you didn't have TypeScript): 
```ts
function Person(age) {
    this.age = age
    var _this = this;  // capture this
    this.growOld = function() {
        _this.age++;   // use the captured this
    }
}
var person = new Person(1); 
setTimeout(person.growOld,1000);

setTimeout(function(){ console.log(person.age); },2000); // 2
```
Note that since you are using TypeScript you can be even sweeter in syntax and combine arrows with classes: 
```ts
class Person {
    constructor(public age:number){}    
    growOld = () => {
        this.age++;
    }
}
var person = new Person(1); 
setTimeout(person.growOld,1000);

setTimeout(function(){ console.log(person.age); },2000); // 2
```

#### Tip on Arrow Functions
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
