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
// window.helloWorld('gracius'); // Error: Supplied parameters do not match the signature of the call target


interface Math {
    seedrandom(seed?: string);
}

Math.seedrandom();

Date.parse
interface Date {

}

interface String {
    endsWith(suffix: string): boolean;
}

String.prototype.endsWith = function(suffix: string): boolean {
    var str: string = this;
    return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
}

console.log('foo bar'.endsWith('bas')); // false
console.log('foo bas'.endsWith('bas')); // true