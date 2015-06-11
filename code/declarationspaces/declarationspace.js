var first;
(function (first) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    })();
    var foo;
    var bar;
    var bas;
})(first = exports.first || (exports.first = {}));
var second;
(function (second) {
    ;
    var bar = Bar;
})(second || (second = {}));
var third;
(function (third) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    })();
    var someVar = Foo;
    var someOtherVar = 123;
})(third || (third = {}));
var fourn;
(function (fourn) {
    var foo = 123;
    var bar;
})(fourn || (fourn = {}));
var meh;
(function (meh) {
    var something = {};
})(meh || (meh = {}));
var utility;
(function (utility) {
    function log(msg) {
        console.log(msg);
    }
    utility.log = log;
    function error(msg) {
        console.error(msg);
    }
    utility.error = error;
})(utility || (utility = {}));
utility.log('Call me');
utility.error('maybe!');
var importing;
(function (importing) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    })();
    var Bar = Foo;
    var bar;
})(importing || (importing = {}));
var importing;
(function (importing) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    })();
    importing.Foo = Foo;
})(importing || (importing = {}));
var Bar = importing.Foo;
var bar;
var typeofAnnotation;
(function (typeofAnnotation) {
    var foo = 123;
    var bar;
    bar = 456;
    bar = '789';
})(typeofAnnotation || (typeofAnnotation = {}));
