"use strict";
var Adder = (function () {
    function Adder(a) {
        this.a = a;
    }
    Adder.prototype.add = function (b) {
        return this.a + b;
    };
    return Adder;
})();
function useAdd(add) {
    return add(456);
}
var adder = new Adder('mary had a little 🐑');
useAdd(adder.add.bind(adder));
useAdd(function (x) { return adder.add(x); });
function twoParams(a, b) {
    return a + b;
}
var curryOne = twoParams.bind(null, 123);
curryOne(456);
curryOne('456');
var betterCurry;
(function (betterCurry) {
    function twoParams(a, b) {
        return a + b;
    }
    var curryOne = function (x) { return twoParams(123, x); };
    curryOne(456);
    curryOne('456');
})(betterCurry || (betterCurry = {}));
