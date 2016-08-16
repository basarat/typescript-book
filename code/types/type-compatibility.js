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
