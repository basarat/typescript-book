exports.foo = 123;
var Called = (function () {
    function Called() {
        var _this = this;
        this.count = 0;
        this.called = function () {
            _this.count++;
            console.log("Called : " + _this.count);
        };
    }
    return Called;
})();
var called = (new Called()).called;
called();
called();
