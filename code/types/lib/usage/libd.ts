var foo = 123;
var bar = foo.toString();

var test = window;

interface Window {
    helloWorld(): void;
}

// Add it at runtime
window.helloWorld = () => console.log('hello world');
// Call it
window.helloWorld();
// Misuse it and you get an error: 
window.helloWorld('gracius'); // Error: Supplied parameters do not match the signature of the call target


interface Math {
    seedrandom(seed?: string);
}

Math.seedrandom();