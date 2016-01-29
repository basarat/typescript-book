export namespace asdfasdfasdfasdflkjasdflkjasdflkjasdflkjasdf {
}

namespace parameter {
    // variable annotation
    var sampleVariable: { bar: number }

    // function parameter
    function foo(sampleParameter: { bar: number }) { }
}

namespace returnType {
    interface Foo {
        foo: string;
    }

    // Return type annotated as `: Foo`
    function foo(sample: Foo) {
        return sample;
    }
}

namespace inferred {
    interface Foo {
        foo: string;
    }

    function foo(sample: Foo) {
        return sample; // inferred return type 'Foo'
    }
}

namespace misspelled {
    function foo() {
        return { fou: 'John Doe' }; // You might not find this misspelling `foo` till its too late
    }

    sendAsJSON(foo());
}

namespace optional {
    function foo(bar: number, bas?: string): void {
        // ..
    }

    foo(123);
    foo(123, 'hello');
}

namespace optionalDefault {
    function foo(bar: number, bas: string = 'world') {
        console.log(bar, bas);
    }

    foo(123);           // 123, world
    foo(123, 'hello');  // 123, hello
}
