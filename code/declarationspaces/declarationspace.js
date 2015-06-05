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
    (function (something) {
        something.foo = 123;
    })(something || something, {});
})(meh || (meh = {}));
var utility;
(function (utility) {
    function log(msg) {
        console.log(msg);
    }
    function error(msg) {
        console.error(msg);
    }
})(utility || (utility = {}));
utility.log('Call me');
utility.error('maybe!');
