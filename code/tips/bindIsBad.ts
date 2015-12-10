export var _asdfasdfsadf;

class Adder {
    constructor(public a: string) { }

    add(b: string): string {
        return this.a + b;
    }
}

function useAdd(add: (x: number) => number) {
    return add(456);
}

let adder = new Adder('mary had a little 🐑');
useAdd(adder.add.bind(adder)); // No compile error!
useAdd((x) => adder.add(x)); // Error: number is not assignable to string


function twoParams(a: number, b: number) {
    return a + b;
}
let curryOne = twoParams.bind(null, 123);
curryOne(456); // Okay but is not type checked!
curryOne('456'); // Allowed because it wasn't type checked

namespace betterCurry {
    function twoParams(a: number, b: number) {
        return a + b;
    }
    let curryOne = (x: number) => twoParams(123, x);
    curryOne(456); // Okay and type checked!
    curryOne('456'); // Error!
}
