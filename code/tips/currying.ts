export var _asdfasdfasdf;


// A function that supports currying
let add = (x: number) => (y: number) => x + y;

// Simple usage
add(123)(456);

// curried
let add123 = add(123);

// use the curried function
add123(456);
