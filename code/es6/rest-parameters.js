var rest;
(function (rest) {
    function iTakeItAll(first, second) {
        var allOthers = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            allOthers[_i - 2] = arguments[_i];
        }
        console.log(allOthers);
    }
    iTakeItAll('foo', 'bar');
    iTakeItAll('foo', 'bar', 'bas', 'qux');
})(rest = exports.rest || (exports.rest = {}));
