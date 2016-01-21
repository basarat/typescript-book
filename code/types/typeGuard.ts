export namespace quick {
    var x: any = /* something */ '123';

    // Within the block TypeScript knows that x must be a string
    if (typeof x === 'string') {
        console.log(x.subtr(1)); // Error, 'subtr' does not exist on 'string'
    }

    // x is still any here
    x.subtr(); // OK
}
