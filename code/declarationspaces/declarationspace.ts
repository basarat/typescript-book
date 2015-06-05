export module first {
    class Foo { }
    interface Bar { }
    type Bas = {}

    var foo: Foo;
    var bar: Bar;
    var bas: Bas;
}

namespace second {
    interface Bar { };
    var bar = Bar; // ERROR: "cannot find name 'Bar'"
}

namespace third {
    class Foo { }
    var someVar = Foo;
    var someOtherVar = 123;
}

namespace fourn {
    var foo = 123;
    var bar: foo; // ERROR: "cannot find name 'foo'"
}


namespace meh {
    var something = {};
    (function(something) {
        something.foo = 123;
    })(something || something = {})
}

namespace utility {
    function log(msg) {
        console.log(msg);
    }
    function error(msg) {
        console.error(msg);
    }
}

// usage
utility.log('Call me');
utility.error('maybe!');