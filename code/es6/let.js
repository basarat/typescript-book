exports.asdfasdfasfadf = 123;
var first;
(function (first) {
    var something = [
        1,
        2,
        3
    ];
})(first || (first = {}));
var second;
(function (second) {
    var foo = 123;
    if (true) {
        var foo = 456;
    }
    console.log(foo);
})(second || (second = {}));
var third;
(function (third) {
    var foo = 123;
    function test() {
        var foo = 456;
    }
    test();
    console.log(foo);
})(third || (third = {}));
var fourth;
(function (fourth) {
    var index = 0;
    var array = [
        1,
        2,
        3
    ];
    for (var _index = 0; _index < array.length; _index++) {
        console.log(array[_index]);
    }
    console.log(index);
})(fourth || (fourth = {}));
var fifth;
(function (fifth) {
    if (true) {
        var foo = 123;
    }
})(fifth || (fifth = {}));
var fifth;
(function (fifth) {
    var foo = '123';
    if (true) {
        var _foo = 123;
    }
})(fifth || (fifth = {}));
var closures;
(function (closures) {
    var funcs = [];
    for (var i = 0; i < 3; i++) {
        funcs.push(function () {
            console.log(i);
        });
    }
    for (var j = 0; j < 3; j++) {
        funcs[j]();
    }
})(closures || (closures = {}));
var closures2;
(function (closures2) {
    var funcs = [];
    for (var i = 0; i < 3; i++) {
        (function () {
            var local = i;
            funcs.push(function () {
                console.log(local);
            });
        })();
    }
    for (var j = 0; j < 3; j++) {
        funcs[j]();
    }
})(closures2 || (closures2 = {}));
var closures3;
(function (closures3) {
    var funcs = [];
    for (var i = 0; i < 3; i++) {
        funcs.push(function () {
            console.log(i);
        });
    }
    for (var j = 0; j < 3; j++) {
        funcs[j]();
    }
})(closures3 || (closures3 = {}));
