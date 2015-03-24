### Destructuring

TypeScript supports the following forms of Destructuring (literally named after de-stucturing i.e. breaking up the structure):

1. Object Destructuring
1. Array Destructuring

#### Object Destructuring
Destructuring  is useful because it quite commonly allow you to do in a single line what would otherwise require multiple lines. Consider the following case:

```ts
var rect = { x: 0, y: 10, width: 15, height: 20 };

// Destructuring assignment
var {x, y, width, height} = rect;
console.log(x, y, width, height); // 0,10,15,20
```
Here in the absence of destructing you would have to pick off `x,y,width,height` one by one of `rect`.

#### Array Destructuring
A common programming question : Swap two variables without using a third one. The TypeScript solution:

```ts
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2,1
```
Note that array destructuring is effectively the compiler doing the `[0] , [1]` and so on for you. There is no guarantee that these values will exist.

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
Destructuring can again make your code more readable and maintainable. Array destructuring can allow to use arrays like tuples in many other languages.


{% include "footer.md" %}
