"use strict";
var quick;
(function (quick) {
    function doSomething(x) {
        if (typeof x === 'string') {
            console.log(x.subtr(1));
            console.log(x.substr(1));
        }
        x.substr(1);
    }
})(quick = exports.quick || (exports.quick = {}));
var instance;
(function (instance) {
    var Foo = (function () {
        function Foo() {
            this.foo = 123;
            this.common = '123';
        }
        return Foo;
    }());
    var Bar = (function () {
        function Bar() {
            this.bar = 123;
            this.common = '123';
        }
        return Bar;
    }());
    function doStuff(arg) {
        if (arg instanceof Foo) {
            console.log(arg.foo);
            console.log(arg.bar);
        }
        if (arg instanceof Bar) {
            console.log(arg.foo);
            console.log(arg.bar);
        }
        console.log(arg.common);
        console.log(arg.foo);
        console.log(arg.bar);
    }
    doStuff(new Foo());
    doStuff(new Bar());
})(instance = exports.instance || (exports.instance = {}));
var instanceElse;
(function (instanceElse) {
    var Foo = (function () {
        function Foo() {
            this.foo = 123;
        }
        return Foo;
    }());
    var Bar = (function () {
        function Bar() {
            this.bar = 123;
        }
        return Bar;
    }());
    function doStuff(arg) {
        if (arg instanceof Foo) {
            console.log(arg.foo);
            console.log(arg.bar);
        }
        else {
            console.log(arg.foo);
            console.log(arg.bar);
        }
    }
    doStuff(new Foo());
    doStuff(new Bar());
})(instanceElse = exports.instanceElse || (exports.instanceElse = {}));
var userDefined;
(function (userDefined) {
    function isFoo(arg) {
        return arg.foo !== undefined;
    }
    function doStuff(arg) {
        if (isFoo(arg)) {
            console.log(arg.foo);
            console.log(arg.bar);
        }
        else {
            console.log(arg.foo);
            console.log(arg.bar);
        }
    }
    doStuff({ foo: 123, common: '123' });
    doStuff({ bar: 123, common: '123' });
})(userDefined = exports.userDefined || (exports.userDefined = {}));
