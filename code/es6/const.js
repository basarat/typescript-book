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
var block;
(function (block) {
    var foo = 123;
    if (true) {
        var foo_1 = 456;
    }
})(block || (block = {}));
var protectvariablereference;
(function (protectvariablereference) {
    var foo = { bar: 123 };
    foo = { bar: 456 };
})(protectvariablereference || (protectvariablereference = {}));
var noProtectDeep;
(function (noProtectDeep) {
    var foo = { bar: 123 };
    foo.bar = 456;
})(noProtectDeep || (noProtectDeep = {}));
