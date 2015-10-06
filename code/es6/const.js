exports.asdfasdfasfadf = 123;
var mustbeinit;
(function (mustbeinit) {
    var foo;
})(mustbeinit || (mustbeinit = {}));
var cantbechanged;
(function (cantbechanged) {
    var foo = 123;
    foo = 456;
})(cantbechanged || (cantbechanged = {}));
