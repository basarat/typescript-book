"use strict";
var InCompat;
(function (InCompat) {
    var str = "Hello";
    var num = 123;
    str = num;
    num = str;
})(InCompat = exports.InCompat || (exports.InCompat = {}));
