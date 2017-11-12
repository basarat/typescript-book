## Numbers
Whenever you are handling numbers in any programming language you need to be aware of the idiosyncrasies of how the language handles numbers. Here are few critical pieces of information about numbers in JavaScript that you should be aware of.

### Core Type
JavaScript has only one number type. It is a double-precision 64-bit `Number`. Below we discuss its limitations along with a recommended solution.

### Decimal
For those familiar with doubles / float in other languages, you would know that binary floating point numbers *do not* map correctly to Decimal numbers. A trivial (and famous) example with JavaScript's built in numbers is shown below:

```js
console.log(.1 + .2); // 0.30000000000000004
```

> For true decimal math use `big.js` mentioned below.

### Integer
The integer limits represented by the built in number type are `Number.MAX_SAFE_INTEGER` and `Number.MIN_SAFE_INTEGER`.

```js
console.log({max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER});
// {max: 9007199254740991, min: -9007199254740991}
```

**Safe** in this context refers to the ability to still carry out `1` more arithmetic calculation.

```js
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER); // false
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER); // false
```

Out of bound (`2` or more) integer arithmetic is cut off to these max values (`+1/-1`):

```js
console.log(Number.MAX_SAFE_INTEGER + 2 === Number.MAX_SAFE_INTEGER + 1); // true!
console.log(Number.MIN_SAFE_INTEGER - 2 === Number.MIN_SAFE_INTEGER - 1); // true!
```

> For arbitrary precision integer math use `big.js` mentioned below.

### Recommended Solution
Whenever you use math for financial calculations (e.g. gst calculation, shopping cart items count etc) use a library like [big.js](https://github.com/MikeMcl/big.js/) which is designed for
* Perfect decimal math.
* Safe out of bound integer values

Installation is simple:
```bash
npm install big.js @types/big.js
```

> Do not use this library for math used for UI / performance intensive purposes e.g charts, canvas drawing etc.

### NaN handling
// TODO 🌹
