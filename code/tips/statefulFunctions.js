var called = (new (function () {
    function class_1() {
        var _this = this;
        this.count = 0;
        this.called = function () {
            _this.count++;
            console.log("Called : " + _this.count);
        };
    }
    return class_1;
})()).called;
called();
called();
