"use strict";
var quick;
(function (quick) {
    var x = '123';
    if (typeof x === 'string') {
        console.log(x.subtr(1));
    }
    x.subtr();
})(quick = exports.quick || (exports.quick = {}));
