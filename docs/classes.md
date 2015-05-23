### Classes
The reason why its important to have classes in JavaScript as a first class item is that: 
1. People like to use classes
1. Provides a consistent way for developers to use classes instead of every framework (emberjs,reactjs etc) coming up with their own version.

Finally JavaScript developers can *have `class`*. Here we have a basic class called Point: 
```ts
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}

var p1 = new Point(0, 10);
var p2 = new Point(10, 20);
var p3 = p1.add(p2); // {x:10,y:30}
```
This class generates the following JavaScript on ES5 emit:
```ts
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    };
    return Point;
})();
```
This is a fairly idiomatic traditional JavaScript class pattern now as a first class language construct. Note that `constructor` is optional.

#### Whats up with the IIFE
The js generated for the class could have been: 
```ts
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.add = function (point) {
    return new Point(this.x + point.x, this.y + point.y);
};
```

The reason its wrapped in an Immediately-Invoked Function Expression (IIFE) i.e.

```ts
(function () {

    // BODY
    
    return Point;
})();
```

will become evident when we look at inheritance.

### Inheritance
Classes in TypeScript (like other langauges) support *single* inheritance using the `extends` keyword as shown below: 

```ts
class Point3D extends Point {
    z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }
    add(point: Point3D) {
        var point2D = super.add(point);
        return new Point3D(point2D.x, point2D.y, this.z + point.z);
    }
}
```
If you have a constructor in your class then you *must* call the parent constructor from your constructor (TypeScript will point this out to you). This ensures that the stuff that it needs to set on `this` gets set. Followed by the call to `super` you can add any additional stuff you want to do in your constructor (here we add another member `z`). 

Note that you override parent member functions easily (here we override `add`) and still use the functionality of the super class in your members (using `super.` syntax). 

### IIFE revisited
The es5 code generated for our example `class Point3D` is shown below: 

```ts
var Point3D = (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z) {
        _super.call(this, x, y);
        this.z = z;
    }
    Point3D.prototype.add = function (point) {
        var point2D = _super.prototype.add.call(this, point);
        return new Point3D(point2D.x, point2D.y, this.z + point.z);
    };
    return Point3D;
})(Point);
```

Notice that the IIFE allows you to easily capture the base class `Point` in a `_super` variable and that is used consistently in the class body. 

### Statics
TypeScript classes support `static` properties that are shared by all instances of the class. A natural place to put (and access) them is on the class itself and that is what TypeScript does: 

```ts
class Something {
    static instances = 0;
    constructor() {
        Something.instances++;
    }
}

var s1 = new Something();
var s2 = new Something();
console.log(Something.instances); // 2
```

You can have static members as well as static functions.

### Access Modifiers
TypeScript supports the common access modifiers that control if *a variable is accessible outside the class directly on instances* and *is the variable accessible in child classes*  : 

1. `public`: available on instances everywhere
1. `private`: not available for access outside the class. 
1. `protected`: available on child classes but not on instances directly.

Note that at runtime (in the generated JS) these have no significance but will give you compile time errors if you use them incorrectly. An example of each is shown below: 

```ts
class FooBase {
    public x: number;
    private y: number;
    protected z: number;
}

// EFFECT ON INSTANCES 
var foo = new FooBase(); 
foo.x; // okay 
foo.y; // ERROR : private
foo.z: // ERROR : protected

// EFFECT ON CHILD CLASSES
class FooChild {
    constructor(){
        this.x; // okay
        this.y; // ERROR: private
        this.z; // okay
    }
}
```

As always these modifiers work for both member properties and member functions.

### Define using constructor

Having a member in a class and initializing it like below: 

```ts
class Foo{
    x: number;
    constructor(x:number){
        this.x = x;
    }
}
```
is such a common pattern that TypeScript provides a shorthand where you can prefix the member with an *access modifier* and it is automatically declared on the class and copied from the constructor. So the previous example can be re-written as (notice `public x:number`): 

```ts
class Foo{    
    constructor(public x:number){
    }
}
```

### Property initializer
This is a nifty feature supported by TypeScript (from ES7 actually). You can initialize any member of the class outside the class constructor, useful to provide default (notice `members = []`)

```ts
class Foo{
    members = [];  // Initialize directly
    add(x){
        this.members.push(x);
    }
}
```

### `__extends`
You will notice that as soon as you inherit a class TypeScript also generates the following function: 
```ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
```
Here `d` refers to the derived class and `b` refers to the base class. This function does two things:
1. copies the static members of the base class onto the child class i.e. `for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];`
1. sets up the child class function's prototype to optionally lookup members on the parent's `proto` i.e. effectively `d.prototype.__proto__ = b.prototype`

People rarely have trouble understanding 1, but many people struggle with 2. so an explanation is in order

#### `d.prototype.__proto__ = b.prototype`

After having tutored many people about this I find the following explanation to be simplest. First we will explain how the code from `__extends` is equivalent to the simple `d.prototype.__proto__ = b.prototype`, and then why this line in itself is significant. To understand all this you need to know these things: 
1. `__proto__`
1. `prototype`
1. effect of `new` on `this` inside the called function
1. effect of `new` on `prototype` and `__proto__`

All objects in JavaScript contain a `__proto__` member. This member is often not accessible in older browsers (sometimes documentation refers to this magical property as `[[prototype]]`). It has one objective: If a property is not found on an object during lookup (e.g. `obj.property`) then it is looked up at `obj.__proto__.property`. If it is still not found then `obj.__proto__.__proto__.property` till either: *it is found* or *the latest `.__proto__` itself is null*. This explains why JavaScript is called to support *prototypal inheritance* out of the box. This is shown in the following example, which you can run in the chrome console or nodejs:

```ts
var foo = {}

// setup on foo as well as foo.__proto__
foo.bar = 123;
foo.__proto__.bar = 456;

console.log(foo.bar); // 123
delete foo.bar; // remove from object
console.log(foo.bar); // 456
delete foo.__proto__.bar; // remove from foo.__proto__
console.log(foo.bar); // undefined
```

Cool so you understand `__proto__`. Another useful information is that all `function`s in JavaScript have a property called `prototype` and that it has a member `constructor` pointing back to the function. This is shown below: 

```ts
function Foo() { }
console.log(Foo.prototype); // {} i.e. it exists and is not undefined
console.log(Foo.prototype.constructor === Foo); // Has a member called `constructor` pointing back to the function
```

Now lets look at *effect of `new` on `this` inside the called function*. Basically `this` inside the called function is going to point to the newly created object that will be returned from the function. Its simple to see if you mutate a property on `this` inside the function: 

```ts
function Foo() {
    this.bar = 123;
}

// call with the new operator
var newFoo = new Foo();
console.log(newFoo.bar); // 123
```

Now the only other thing you need to know is that calling `new` on a function copies the `prototype` of the function into the `__proto__` of the newly created object that is returned from the function call. Here is code you can run to completely understand it:

```ts
function Foo() { }

var foo = new Foo();

console.log(foo.__proto__ === Foo.prototype); // True!
```

That's it. Now look at the following straight out of `__extends`. I've take the liberty to number these lines:

```ts
1  function __() { this.constructor = d; }
2   __.prototype = b.prototype;
3   d.prototype = new __();
```

Reading this function in reverse the `d.prototype = new __()` on line 3 effectively means `d.prototype = {__proto__ : __.prototype}` (because of 4, effect of `new` on `prototype`), combine it with the previous line (i.e. line 2 `__.prototype = b.prototype;`) you get `d.prototype = {__proto__ : __.prototype}`. 

But wait we wanted `d.prototype.__proto__` i.e. just the proto changed and maintain the old `d.prototype.constructor`. This is where the significance of the first line (i.e. `function __() { this.constructor = d; }`) comes in. Here we will effectively have `d.prototype = {__proto__ : __.prototype, d.constructor = d}` (because of 3, effect of `new` on `this` inside the called function). So since we restore `d.prototype.constructor`, the only thing we have truly mutated is the `__proto__` hence `d.prototype.__proto__ = b.prototype`. 

#### `d.prototype.__proto__ = b.prototype` significance

The significance is that it allows you to add members functions to a child class and inherit other from the base class. This is demonstrated by the following simple example: 

```ts
function Animal() { }
Animal.prototype.walk = function () { console.log('walk') };

function Bird() { }
Bird.prototype.__proto__ = Animal.prototype;
Bird.prototype.fly = function () { console.log('fly') };

var bird = new Bird();
bird.walk();
bird.fly();
```
Basically `bird.fly` will be looked up from `bird.__proto__.fly` (remember that `new` makes the `bird.__proto__` point to `Bird.prototype`) and `bird.walk` (an inherited member) will be looked up from `bird.__proto__.__proto__.walk` (as `bird.__proto__ == Bird.prototype` and `bird.__proto__.__proto__` == `Animal.prototype`). 

{% include "footer.md" %}
