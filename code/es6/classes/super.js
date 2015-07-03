var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
exports.foo = 123;
var asdf;
(function (asdf) {
    var Base = (function () {
        function Base() {
        }
        Base.prototype.log = function () { console.log('hello world'); };
        return Base;
    })();
    var Child = (function (_super) {
        __extends(Child, _super);
        function Child() {
            _super.apply(this, arguments);
        }
        Child.prototype.logWorld = function () { _super.prototype.log.call(this); };
        ;
        return Child;
    })(Base);
})(asdf || (asdf = {}));
var bse;
(function (bse) {
    var Base = (function () {
        function Base() {
            this.log = function () { console.log('hello world'); };
        }
        return Base;
    })();
    var Child = (function (_super) {
        __extends(Child, _super);
        function Child() {
            _super.apply(this, arguments);
        }
        Child.prototype.logWorld = function () { this.log(); };
        ;
        return Child;
    })(Base);
})(bse || (bse = {}));
var quz;
(function (quz) {
    var Base = (function () {
        function Base() {
            this.log = function () { console.log('hello world'); };
        }
        return Base;
    })();
    var Child = (function (_super) {
        __extends(Child, _super);
        function Child() {
            _super.apply(this, arguments);
        }
        Child.prototype.logWorld = function () { _super.prototype.log.call(this); };
        ;
        return Child;
    })(Base);
})(quz || (quz = {}));
