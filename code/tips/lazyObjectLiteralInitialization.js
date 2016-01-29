"use strict";
var JS;
(function (JS) {
    var foo = {};
    foo.bar = 123;
    foo.bas = "Hello World";
})(JS = exports.JS || (exports.JS = {}));
var TS;
(function (TS) {
    var foo = {
        bar: 123,
        bas: "Hello World",
    };
})(TS = exports.TS || (exports.TS = {}));
var TSQuick;
(function (TSQuick) {
    var foo = {};
    foo.bar = 123;
    foo.bas = "Hello World";
})(TSQuick = exports.TSQuick || (exports.TSQuick = {}));
var TSMiddle;
(function (TSMiddle) {
    var foo = {};
    foo.bar = 123;
    foo.bas = "Hello World";
    foo.bar = 'Hello Stranger';
})(TSMiddle = exports.TSMiddle || (exports.TSMiddle = {}));
