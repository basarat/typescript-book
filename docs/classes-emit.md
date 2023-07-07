#### What's up with the IIFE
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

The reason it's wrapped in an Immediately-Invoked Function Expression (IIFE) i.e.

```ts
(function () {

    // BODY

    return Point;
})();
```

has to do with inheritance. It allows TypeScript to capture the base class as a variable `_super` e.g.

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

Notice that the IIFE allows TypeScript to easily capture the base class `Point` in a `_super` variable and that is used consistently in the class body.

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

People rarely have trouble understanding 1, but many people struggle with 2. So an explanation is in order.

#### `d.prototype.__proto__ = b.prototype`

After having tutored many people about this I find the following explanation to be simplest. First we will explain how the code from `__extends` is equivalent to the simple `d.prototype.__proto__ = b.prototype`, and then why this line in itself is significant. To understand all this you need to know these things:

1. `__proto__`
1. `prototype`
1. effect of `new` on `this` inside the called function
1. effect of `new` on `prototype` and `__proto__`

All objects in JavaScript contain a `__proto__` member. This member is often not accessible in older browsers (sometimes documentation refers to this magical property as `[[prototype]]`). It has one objective: If a property is not found on an object during lookup (e.g. `obj.property`) then it is looked up at `obj.__proto__.property`. If it is still not found then `obj.__proto__.__proto__.property` till either: *it is found* or *the latest `.__proto__` itself is null*. This explains why JavaScript is said to support *prototypal inheritance* out of the box. This is shown in the following example, which you can run in the chrome console or Node.js:

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

Cool so you understand `__proto__`. Another useful fact is that all `function`s in JavaScript have a property called `prototype` and that it has a member `constructor` pointing back to the function. This is shown below:

```ts
function Foo() { }
console.log(Foo.prototype); // {} i.e. it exists and is not undefined
console.log(Foo.prototype.constructor === Foo); // Has a member called `constructor` pointing back to the function
```

Now let's look at *effect of `new` on `this` inside the called function*. Basically `this` inside the called function is going to point to the newly created object that will be returned from the function. It's simple to see if you mutate a property on `this` inside the function:

```ts
function Foo() {
    this.bar = 123;
}

// call with the new operator
var newFoo = new Foo();
console.log(newFoo.bar); // 123
```

Now the only other thing you need to know is that calling `new` on a function assigns the `prototype` of the function to the `__proto__` of the newly created object that is returned from the function call. Here is the code you can run to completely understand it:

```ts
function Foo() { }

var foo = new Foo();

console.log(foo.__proto__ === Foo.prototype); // True!
```

That's it. Now look at the following straight out of `__extends`. I've taken the liberty to number these lines:

```ts
1  function __() { this.constructor = d; }
2   __.prototype = b.prototype;
3   d.prototype = new __();
```
Remember that in the second part of this explanation "all `function`s in JavaScript have a property called `prototype` and that it has a member `constructor` pointing back to the function". At first inspection of `d.prototype` on line 3, we could infer that `d` is a function and the obect `d.prototype` should have a member `constructor` pointing back to this function `d`. So we could do a name lookup in the `d.prototype` object for the `constructor` member just as we did for the `bar` member of the `foo` object. 

Also remember that in the second part of this explanation "`this` inside the called function is going to point to the newly created object that will be returned from the function", so the `constructor` would found to be `d` due to the usage of `new` on line 3. 

Another fact to remember is that "calling `new` on a function assigns the `prototype` of the function to the `__proto__` of the newly created object that is returned from the function call", combining with line 2 this assigns `__.prototype` which is defined as `b.prototype` to `d.prototype.__proto__`. 

So the first name lookup for member `constructor` in `d.prototype` would yield `d`. And were this lookup unsuccessful, it would continue to search for `constructor` in `d.prototype.__proto__`, which would have yielded `b`. 

#### `d.prototype.__proto__ = b.prototype` significance

The significance is that it allows you to add member functions to a child class and inherit others from the base class. This is demonstrated by the following simple example:

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
