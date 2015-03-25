exports.forof = true;
var m0;
(function (m0) {
    var someArray = [
        9,
        2,
        5
    ];
    for (var item in someArray) {
        console.log(item);
    }
})(m0 || (m0 = {}));
var m1;
(function (m1) {
    var someArray = [
        9,
        2,
        5
    ];
    for (var _i = 0; _i < someArray.length; _i++) {
        var item = someArray[_i];
        console.log(item);
    }
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    var hello = "is it me you're looking for?";
    for (var _i = 0; _i < hello.length; _i++) {
        var char = hello[_i];
        console.log(char);
    }
})(m2 || (m2 = {}));
var m2;
(function (m2) {
    var articleParagraphs = document.querySelectorAll("article > p");
    for (var _i = 0; _i < articleParagraphs.length; _i++) {
        var paragraph = articleParagraphs[_i];
        paragraph.classList.add("read");
    }
})(m2 || (m2 = {}));
