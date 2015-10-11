exports.foo = 123;
var called = (new ((function () {
    function class_1() {
        this.count = 0;
        this.called = function () {
            this.count++;
            console.log("Called : " + this.count);
        };
    }
    return class_1;
})())).called;
called();
called();
