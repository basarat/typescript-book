"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var InCompat;
(function (InCompat) {
    var str = "Hello";
    var num = 123;
    str = num;
    num = str;
})(InCompat = exports.InCompat || (exports.InCompat = {}));
var FunctionArgsCount;
(function (FunctionArgsCount) {
    var iTakeSomethingAndPassItAnErr = function (x) { };
    iTakeSomethingAndPassItAnErr(function () { return null; });
    iTakeSomethingAndPassItAnErr(function (err) { return null; });
    iTakeSomethingAndPassItAnErr(function (err, data) { return null; });
    iTakeSomethingAndPassItAnErr(function (err, data, more) { return null; });
})(FunctionArgsCount = exports.FunctionArgsCount || (exports.FunctionArgsCount = {}));
var FunctionReturnCo;
(function (FunctionReturnCo) {
    var iMakePoint2D = function () { return ({ x: 0, y: 0 }); };
    var iMakePoint3D = function () { return ({ x: 0, y: 0, z: 0 }); };
    iMakePoint2D = iMakePoint3D;
    iMakePoint3D = iMakePoint2D;
})(FunctionReturnCo = exports.FunctionReturnCo || (exports.FunctionReturnCo = {}));
var FunctionRest;
(function (FunctionRest) {
    var foo = function (x, y) { };
    var bar = function (x, y) { };
    var bas = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
    };
    foo = bar = bas;
    bas = bar = foo;
})(FunctionRest = exports.FunctionRest || (exports.FunctionRest = {}));
var FunctionArgsBi;
(function (FunctionArgsBi) {
    var iTakePoint2D = function (point) { };
    var iTakePoint3D = function (point) { };
    iTakePoint3D = iTakePoint2D;
    iTakePoint2D = iTakePoint3D;
})(FunctionArgsBi = exports.FunctionArgsBi || (exports.FunctionArgsBi = {}));
var NominalClassMemebers;
(function (NominalClassMemebers) {
    var Animal = (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Cat = (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            _super.apply(this, arguments);
        }
        return Cat;
    }(Animal));
    var animal;
    var cat;
    animal = cat;
    cat = animal;
    var Size = (function () {
        function Size() {
        }
        return Size;
    }());
    var size;
    animal = size;
    size = animal;
})(NominalClassMemebers || (NominalClassMemebers = {}));
var invariance;
(function (invariance) {
    var Animal = (function () {
        function Animal(name) {
            this.name = name;
        }
        return Animal;
    }());
    var Cat = (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            _super.apply(this, arguments);
        }
        Cat.prototype.meow = function () { };
        return Cat;
    }(Animal));
    var animal = new Animal("animal");
    var cat = new Cat("cat");
    animal = cat;
    cat = animal;
    var animalArr = [animal];
    var catArr = [cat];
    catArr = animalArr;
    catArr[0].meow();
    animalArr = catArr;
    animalArr.push(new Animal('another animal'));
    catArr.forEach(function (c) { return c.meow(); });
})(invariance = exports.invariance || (exports.invariance = {}));
