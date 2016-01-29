"use strict";
var Simple;
(function (Simple) {
    var Tristate = {
        False: '',
        True: '',
        Unknown: ''
    };
    Object.keys(Tristate).map(function (key) { return Tristate[key] = key; });
    var state = Tristate.True;
    if (state === Tristate.True) {
    }
})(Simple = exports.Simple || (exports.Simple = {}));
var Fancy;
(function (Fancy) {
    var state;
    state = 'False';
})(Fancy = exports.Fancy || (exports.Fancy = {}));
