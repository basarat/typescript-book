var foo = 123;
var bar = foo.toString();
var test = window;
window.helloWorld = function () { return console.log('hello world'); };
window.helloWorld();
Math.seedrandom();
Date.parse;
String.prototype.endsWith = function (suffix) {
    var str = this;
    return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
};
console.log('foo bar'.endsWith('bas'));
console.log('foo bas'.endsWith('bas'));
