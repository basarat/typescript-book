export namespace JS {
    let foo = {};
    foo.bar = 123;
    foo.bas = "Hello World";
}

export namespace TS {
    let foo = {
        bar: 123,
        bas: "Hello World",
    };
}

export namespace TSQuick {
    let foo = {} as any;
    foo.bar = 123;
    foo.bas = "Hello World";
}

export namespace TSMiddle {
    interface Foo {
        bar: number
        bas: string
    }

    let foo = {} as Foo;
    foo.bar = 123;
    foo.bas = "Hello World";

    // later in the codebase:
    foo.bar = 'Hello Stranger'; // Error: You probably misspelled `bas` as `bar`, cannot assign string to number
}
