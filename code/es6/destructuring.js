exports.destructuring = true;
var m1;
(function (m1) {
    var x = 1, y = 2;
    _a = [
        y,
        x
    ], x = _a[0], y = _a[1];
    console.log(x, y);
    var _a;
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    var rect = {
        x: 0,
        y: 10,
        width: 15,
        height: 20
    };
    var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
    console.log(x, y, width, height);
})(m2 || (m2 = {}));
var m3;
(function (m3) {
    var _a = [
        1,
        2,
        3,
        4
    ], x = _a[0], y = _a[1], remaining = _a.slice(2);
    console.log(x, y, remaining);
})(m3 || (m3 = {}));
var m3;
(function (m3) {
    var _a = [
        1,
        2,
        3,
        4
    ], x = _a[0], remaining = _a.slice(2);
    console.log(x, remaining);
})(m3 || (m3 = {}));
