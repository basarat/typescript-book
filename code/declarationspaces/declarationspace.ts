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
    // (function(something) {
    //     something.foo = 123;
    // })(something || something = {})
}

namespace utility {
    export function log(msg) {
        console.log(msg);
    }
    export function error(msg) {
        console.error(msg);
    }
}

// usage
utility.log('Call me');
utility.error('maybe!');


module importing {
    class Foo { }
    var Bar = Foo;
    var bar: Bar; // ERROR: "cannot find name 'Bar'"
}

namespace importing {
    export class Foo { }
}

import Bar = importing.Foo;
var bar: Bar; // Okay

namespace typeofAnnotation {
    var foo = 123;
    var bar: typeof foo; // `bar` has the same type as `foo` (here `number`)
    bar = 456; // Okay
    bar = '789'; // ERROR: Type `string` is not `assignable` to type `number`
}