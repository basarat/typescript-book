exports.templateStrings = '123';
var m1;
(function (m1) {
    var lyrics = "Never gonna give you up \
\nNever gonna let you down";
    console.log(lyrics);
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    var lyrics = "Never gonna give you up\nNever gonna let you down";
    console.log(lyrics);
})(m2 || (m2 = {}));
var m3;
(function (m3) {
    var lyrics = 'Never gonna give you up';
    var html = '<div>' + lyrics + '</div>';
})(m3 || (m3 = {}));
var m4;
(function (m4) {
    var lyrics = 'Never gonna give you up';
    var html = "<div>" + lyrics + "</div>";
})(m4 || (m4 = {}));
var m5;
(function (m5) {
    console.log("1 and 1 one make " + (1 + 1));
})(m5 || (m5 = {}));
var m6;
(function (m6) {
    var say = "a bird in hand > two in the bush";
    var html = (_a = ["<div> I would just like to say : ", "</div>"], _a.raw = ["<div> I would just like to say : ", "</div>"], htmlEscape(_a, say));
    function htmlEscape(literals) {
        var placeholders = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            placeholders[_i - 1] = arguments[_i];
        }
        var result = "";
        for (var i = 0; i < placeholders.length; i++) {
            result += literals[i];
            result += placeholders[i].replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        result += literals[literals.length - 1];
        return result;
    }
    console.log(html);
    var _a;
})(m6 || (m6 = {}));
