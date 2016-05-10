var Definition;
(function (Definition) {
    var foo = 123;
    var bar = "Hello";
    foo = bar;
})(Definition || (Definition = {}));
var ReturnType;
(function (ReturnType) {
    function add(a, b) {
        return a + b;
    }
})(ReturnType || (ReturnType = {}));
var Assignment;
(function (Assignment) {
    var foo = function (a, b) { return a + b; };
})(Assignment || (Assignment = {}));
var AssignmentErrorOut;
(function (AssignmentErrorOut) {
    var foo = function (a, b) {
        a = "hello";
        return a + b;
    };
})(AssignmentErrorOut || (AssignmentErrorOut = {}));
var AssignmentAsCallback;
(function (AssignmentAsCallback) {
    function iTakeAnAdder(adder) {
        return adder(1, 2);
    }
    iTakeAnAdder(function (a, b) {
        return a + b;
    });
})(AssignmentAsCallback || (AssignmentAsCallback = {}));
var Structuring;
(function (Structuring) {
    var foo = {
        a: 123,
        b: 456
    };
    var bar = [1, 2, 3];
})(Structuring || (Structuring = {}));
var StructuringDeep;
(function (StructuringDeep) {
    var foo = {
        bar: [1, 3, 4]
    };
    foo.bar[0] = 'hello';
})(StructuringDeep || (StructuringDeep = {}));
var DeStructuring;
(function (DeStructuring) {
    var foo = {
        a: 123,
        b: 456
    };
    var a = foo.a;
})(DeStructuring || (DeStructuring = {}));
var DeStructuringArrays;
(function (DeStructuringArrays) {
    var bar = [1, 2];
    var a = bar[0], b = bar[1];
})(DeStructuringArrays || (DeStructuringArrays = {}));
var DeStructuringArguments;
(function (DeStructuringArguments) {
    function iTakeAnAdder(adder) {
        return adder({ a: 1, b: 2 });
    }
    iTakeAnAdder(function (_a) {
        var a = _a.a, b = _a.b;
        return a + b;
    });
})(DeStructuringArguments || (DeStructuringArguments = {}));
var CantInferArguments;
(function (CantInferArguments) {
    var foo = function (a, b) { };
})(CantInferArguments || (CantInferArguments = {}));
var CanInferArguments;
(function (CanInferArguments) {
    var foo = function (a, b) { };
})(CanInferArguments || (CanInferArguments = {}));
var CannotInferReturn;
(function (CannotInferReturn) {
    function foo(a, b) {
        return a + addOne(b);
    }
    function addOne(a) {
        return a + 1;
    }
})(CannotInferReturn || (CannotInferReturn = {}));
