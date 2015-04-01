var typeannotations;
(function (typeannotations) {
    var num = 123;
    function identity(num) {
        return num;
    }
})(typeannotations = exports.typeannotations || (exports.typeannotations = {}));
var m1;
(function (m1) {
    var num;
    var str;
    var bool;
    num = 123;
    num = 123.456;
    num = '123';
    str = '123';
    str = 123;
    bool = true;
    bool = false;
    bool = 'false';
})(m1 = exports.m1 || (exports.m1 = {}));
var m2;
(function (m2) {
    var boolArray;
    boolArray = [
        true,
        false
    ];
    console.log(boolArray[0]);
    console.log(boolArray.length);
    boolArray[1] = true;
    boolArray = [
        false,
        false
    ];
    boolArray[0] = 'false';
    boolArray = 'false';
    boolArray = [
        true,
        'false'
    ];
})(m2 = exports.m2 || (exports.m2 = {}));
var m3;
(function (m3) {
    var name;
    name = {
        first: 'John',
        second: 'Doe'
    };
    name = {
        first: 'John'
    };
    name = {
        first: 'John',
        second: 1337
    };
})(m3 = exports.m3 || (exports.m3 = {}));
var m4;
(function (m4) {
    var name;
    name = {
        first: 'John',
        second: 'Doe'
    };
    name = {
        first: 'John'
    };
    name = {
        first: 'John',
        second: 1337
    };
})(m4 = exports.m4 || (exports.m4 = {}));
var any;
(function (any) {
    var power;
    power = '123';
    power = 123;
    var num;
    power = num;
    num = power;
})(any || (any = {}));
var null_undefined;
(function (null_undefined) {
    var num;
    var str;
    num = null;
    str = undefined;
    foo: Null;
    bar: Undefined;
})(null_undefined || (null_undefined = {}));
var void_;
(function (void_) {
    function log(message) {
        console.log(message);
    }
})(void_ || (void_ = {}));
var generics;
(function (generics) {
    function reverse(items) {
        var toreturn = [];
        for (var i = items.length - 1; i >= 0; i--) {
            toreturn.push(items[i]);
        }
        return toreturn;
    }
    var sample = [
        1,
        2,
        3
    ];
    var reversed = reverse(sample);
    console.log(reversed);
    reversed[0] = '1';
    reversed = [
        '1',
        '2'
    ];
    reversed[0] = 1;
    reversed = [
        1,
        2
    ];
    var strArr = [
        '1',
        '2'
    ];
    var reversedStrs = reverse(strArr);
    reversedStr = [
        1,
        2
    ];
    var numArr = [
        1,
        2
    ];
    var reversedNums = numArr.reverse();
    reversedNums = [
        '1',
        '2'
    ];
})(generics || (generics = {}));
var union;
(function (union) {
    function formatCommandline(command) {
        var line = '';
        if (typeof command === 'string') {
            line = command.trim();
        }
        else {
            line = command.join(' ').trim();
        }
    }
})(union || (union = {}));
var tuple;
(function (tuple) {
    var nameNumber;
    nameNumber = [
        'Jenny',
        8675309
    ];
    nameNumber = [
        'Jenny',
        '867-5309'
    ];
    var name = nameNumber[0], num = nameNumber[1];
})(tuple || (tuple = {}));
var getset;
(function (getset) {
    var _value;
    function getOrSet(value) {
        if (value === undefined) {
            return _value;
        }
        else {
            _value = value;
        }
    }
    getOrSet(1);
    console.log(getOrSet());
})(getset || (getset = {}));
var getset_;
(function (getset_) {
    var _value;
    function getOrSet(value) {
        if (value === undefined) {
            return _value;
        }
        else {
            _value = value;
        }
    }
    getOrSet(1);
    console.log(getOrSet());
})(getset_ || (getset_ = {}));
var overload;
(function (overload) {
    function callMe(v1, v2) {
    }
    callMe();
    callMe(1);
    callMe('jenny', 5309);
    callMe('jenny');
    callMe('jenny', '5309');
})(overload || (overload = {}));
var alias;
(function (alias) {
    var sample;
    sample = 123;
    sample = '123';
    sample = true;
})(alias || (alias = {}));
