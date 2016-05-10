namespace Definition {
    let foo = 123; // foo is a `number`
    let bar = "Hello"; // bar is a `string`
    foo = bar; // Error: cannot assign `string` to a `number`

}

namespace ReturnType {
    function add(a: number, b: number) {
        return a + b;
    }
}

namespace Assignment {
    type Adder = (a: number, b: number) => number;
    let foo: Adder = (a, b) => a + b;
}

namespace AssignmentErrorOut {
    type Adder = (a: number, b: number) => number;
    let foo: Adder = (a, b) => {
        a = "hello"; // Error: cannot assign `string` to a `number`
        return a + b;
    }
}

namespace AssignmentAsCallback {
    type Adder = (a: number, b: number) => number;
    function iTakeAnAdder(adder: Adder) {
        return adder(1, 2);
    }
    iTakeAnAdder((a, b) => {
        // a = "hello"; // Would Error: cannot assign `string` to a `number`
        return a + b;
    })
}

namespace Structuring {
    let foo = {
        a: 123,
        b: 456
    };
    // foo.a = "hello"; // Would Error: cannot assign `string` to a `number`

    const bar = [1, 2, 3];
    // bar[0] = "hello"; // Would error: cannot assign `string` to a `number`
}

namespace StructuringDeep {
    let foo = {
        bar: [1, 3, 4]
    };
    foo.bar[0] = 'hello'; // Would error: cannot assign `string` to a `number`
}

namespace DeStructuring {
    let foo = {
        a: 123,
        b: 456
    };
    let {a} = foo;
    // a = "hello"; // Would Error: cannot assign `string` to a `number`
}

namespace DeStructuringArrays {
    const bar = [1, 2];
    let [a, b] = bar;
    // a = "hello"; // Would Error: cannot assign `string` to a `number`
}

namespace DeStructuringArguments {
    type Adder = (numbers: { a: number, b: number }) => number;
    function iTakeAnAdder(adder: Adder) {
        return adder({ a: 1, b: 2 });
    }
    iTakeAnAdder(({a, b}) => { // Types of `a` and `b` are inferred
        // a = "hello"; // Would Error: cannot assign `string` to a `number`
        return a + b;
    })
}


namespace CantInferArguments {
    const foo = (a, b) => { /* do something */ };
}


namespace CanInferArguments {
    type TwoNumberFunction = (a: number, b: number) => void;
    const foo: TwoNumberFunction = (a, b) => { /* do something */ };
}

namespace CannotInferReturn {
    function foo(a: number, b: number) {
        return a + addOne(b);
    }
    function addOne(a) {
        return a + 1;
    }
}
