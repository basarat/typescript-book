"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Simple;
(function (Simple) {
    function foo(config) {
    }
    var config = { bar: 123, bas: 123 };
    foo(config);
})(Simple = exports.Simple || (exports.Simple = {}));
var Type;
(function (Type) {
    var foo = { bar: 123, bas: 456 };
    foo.bar = 456;
})(Type = exports.Type || (exports.Type = {}));
var Class;
(function (Class) {
    var Foo = (function () {
        function Foo() {
            this.bar = 1;
            this.baz = "hello";
        }
        return Foo;
    }());
})(Class = exports.Class || (exports.Class = {}));
var ReactEx;
(function (ReactEx) {
    ;
    var Something = (function (_super) {
        __extends(Something, _super);
        function Something() {
            _super.apply(this, arguments);
        }
        return Something;
    }(React.Component));
    ReactEx.Something = Something;
})(ReactEx = exports.ReactEx || (exports.ReactEx = {}));
var Seamless;
(function (Seamless) {
    var foo = { 0: 123, 2: 345 };
    console.log(foo[0]);
    foo[0] = 456;
})(Seamless = exports.Seamless || (exports.Seamless = {}));
var SeamlessArray;
(function (SeamlessArray) {
    var foo = [1, 2, 3];
    console.log(foo[0]);
    foo.push(4);
    foo = foo.concat([4]);
})(SeamlessArray = exports.SeamlessArray || (exports.SeamlessArray = {}));
var ClassGetter;
(function (ClassGetter) {
    var Person = (function () {
        function Person() {
            this.firstName = "John";
            this.lastName = "Doe";
        }
        Object.defineProperty(Person.prototype, "fullName", {
            get: function () {
                return this.firstName + this.lastName;
            },
            enumerable: true,
            configurable: true
        });
        return Person;
    }());
    var person = new Person();
    console.log(person.fullName);
    person.fullName = "Dear Reader";
})(ClassGetter = exports.ClassGetter || (exports.ClassGetter = {}));
var vsconst;
(function (vsconst) {
    var foo = 123;
    var bar;
})(vsconst || (vsconst = {}));
var aliasing;
(function (aliasing) {
    var foo = {
        bar: 123
    };
    function iMutateFoo(foo) {
        foo.bar = 456;
    }
    iMutateFoo(foo);
    console.log(foo.bar);
})(aliasing || (aliasing = {}));
var aliasing2;
(function (aliasing2) {
    var foo = {
        bar: 123
    };
    function iTakeFoo(foo) {
        foo.bar = 456;
    }
    iTakeFoo(foo);
})(aliasing2 || (aliasing2 = {}));
