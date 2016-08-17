"use strict";
function outerFunction(arg) {
    var variableInOuterFunction = arg;
    function bar() {
        console.log(variableInOuterFunction);
    }
    bar();
}
outerFunction("hello closure");
var another;
(function (another) {
    function outerFunction(arg) {
        var variableInOuterFunction = arg;
        return function () {
            console.log(variableInOuterFunction);
        };
    }
    var innerFunction = outerFunction("hello closure!");
    innerFunction();
})(another = exports.another || (exports.another = {}));
var revealing;
(function (revealing) {
    function createCounter() {
        var val = 0;
        return {
            increment: function () { val++; },
            getVal: function () { return val; }
        };
    }
    var counter = createCounter();
    counter.increment();
    console.log(counter.getVal());
})(revealing = exports.revealing || (exports.revealing = {}));
var server;
(function (server) {
    server.on(function handler(req, res) {
        loadData(req.id).then(function (data) {
            res.send(data);
        });
    });
})(server = exports.server || (exports.server = {}));
