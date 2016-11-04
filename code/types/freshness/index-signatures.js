var a;
(function (a) {
    var foo = {};
    foo['Hello'] = 'World';
    console.log(foo['Hello']);
})(a || (a = {}));
var b;
(function (b) {
    var Foo = (function () {
        function Foo(message) {
            this.message = message;
        }
        ;
        Foo.prototype.log = function () {
            console.log(this.message);
        };
        return Foo;
    }());
    var foo = {};
    foo['Hello'] = new Foo('World');
    foo['Hello'].log();
})(b || (b = {}));
var c;
(function (c) {
    var obj = {
        toString: function () {
            console.log('toString called');
            return 'Hello';
        }
    };
    var foo = {};
    foo[obj] = 'World';
    console.log(foo[obj]);
    console.log(foo['Hello']);
})(c || (c = {}));
var d;
(function (d) {
    var foo = ['World'];
    console.log(foo[0]);
})(d || (d = {}));
var e;
(function (e) {
    var obj = {
        toString: function () {
            return 'Hello';
        }
    };
    var foo = {};
    foo[obj] = 'World';
    foo[obj.toString()] = 'World';
})(e || (e = {}));
var f;
(function (f) {
    var obj = { message: 'Hello' };
    var foo = {};
    foo[obj] = 'World';
    console.log(foo["[object Object]"]);
})(f || (f = {}));
var f;
(function (f) {
    console.log((1).toString());
    console.log((2).toString());
})(f || (f = {}));
var g;
(function (g) {
    var foo = {};
    foo['a'] = { message: 'some message' };
    foo['a'] = { messages: 'some message' };
    foo['a'].message;
    foo['a'].messages;
})(g || (g = {}));
var mustConform2;
(function (mustConform2) {
    var foo = { x: 1, y: 2 };
    foo['x'];
    var x = 'x';
    foo[x];
})(mustConform2 || (mustConform2 = {}));
