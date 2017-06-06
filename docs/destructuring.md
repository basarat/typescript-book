### Destructuring

TypeScript supports the following forms of Destructuring (literally named after de-structuring i.e. breaking up the structure):

1. Object Destructuring
1. Array Destructuring

It is easy to think of destructuring as an inverse of *structuring*. The method of *structuring* in JavaScript is the object literal:

```ts
var foo = {
    bar: {
        bas: 123
    }
};
```
Without the awesome *structuring* support built into JavaScript, creating new objects on the fly would indeed be very cumbersome. Destructuring brings the same level of convenience to getting data out of a structure.

#### Object Destructuring
Destructuring is useful because it allows you to do in a single line, what would otherwise require multiple lines. Consider the following case:

```ts
var rect = { x: 0, y: 10, width: 15, height: 20 };

// Destructuring assignment
var {x, y, width, height} = rect;
console.log(x, y, width, height); // 0,10,15,20

rect.x = 10;
({x, y, width, height} = rect); // assign to existing variables using outer parentheses
console.log(x, y, width, height); // 10,10,15,20
```
Here in the absence of destructuring you would have to pick off `x,y,width,height` one by one from `rect`.

To assign an extracted variable to a new variable name you can do the following:

```ts
// structure
const obj = {"some property": "some value"};

// destructure
const {"some property": someProperty} = obj;
console.log(someProperty === "some value"); // true
```

Additionally you can get *deep* data out of a structure using destructuring. This is shown in the following example:

```ts
var foo = { bar: { bas: 123 } };
var {bar: {bas}} = foo; // Effectively `var bas = foo.bar.bas;`
```

#### Object Destructuring with rest
You can pick up any number of elements from the an object and get *an object* of the remaining elements using object destructuring with rest.

```ts
var {w, x, ...remaining} = {w: 1, x: 2, y: 3, z: 4};
console.log(w, x, remaining); // 1, 2, {y:3,z:4}
```
A common use case is also to ignore certain properties. For example:
```ts
// Example function
function goto(point2D: {x: number, y: number}) {
  // Imagine some code that might break
  // if you pass in an object
  // with more items than desired
}
// Some point you get from somewhere
const point3D = {x: 1, y: 2, z: 3};
/** A nifty use of rest to remove extra properties */
const { z, ...point2D } = point3D;
goto(point2D);
```

#### Array Destructuring
A common programming question: "How to swap two variables without using a third one?". The TypeScript solution:

```ts
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2,1
```
Note that array destructuring is effectively the compiler doing the `[0], [1], ...` and so on for you. There is no guarantee that these values will exist.

#### Array Destructuring with rest
You can pick up any number of elements from the array and get *an array* of the remaining elements using array destructuring with rest.

```ts
var [x, y, ...remaining] = [1, 2, 3, 4];
console.log(x, y, remaining); // 1, 2, [3,4]
```

#### Array Destructuring with ignores
You can ignore any index by simply leaving its location empty i.e. `, ,` in the left hand side of the assignment. For example:
```ts
var [x, , ...remaining] = [1, 2, 3, 4];
console.log(x, remaining); // 1, [3,4]
```

#### JS Generation
The JavaScript generation for non ES6 targets simply involves creating temporary variables, just like you would have to do yourself without native language support for destructuring e.g.

```ts
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2,1

// becomes //

var x = 1, y = 2;
_a = [y,x], x = _a[0], y = _a[1];
console.log(x, y);
var _a;
```

#### Summary
Destructuring can make your code more readable and maintainable by reducing the line count and making the intent clear. Array destructuring can allow you to use arrays as though they were tuples.
