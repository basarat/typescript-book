"use strict";
var add = function (x) { return function (y) { return x + y; }; };
add(123)(456);
var add123 = add(123);
add123(456);
