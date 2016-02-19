export namespace Simple {
    function foo(config: {
        readonly bar: number,
        readonly bas: number
    }) {
        // ..
    }

    let config = { bar: 123, bas: 123 };
    foo(config);
    // You can be sure that `config` isn't changed 🌹
}

export namespace Type {
    type Foo = {
        readonly bar: number;
        readonly bas: number;
    }

    // Initialization is okay
    let foo: Foo = { bar: 123, bas: 456 };

    // Mutation is not
    foo.bar = 456; // Error: Left-hand side of assignment expression cannot be a constant or a read-only property
}


export namespace Class {
    class Foo {
        readonly bar = 1; // OK
        readonly baz: string;
        constructor() {
            this.baz = "hello";  // OK
        }
    }
}

export namespace ReactEx {
    declare namespace React {
        export class Component<P, U>{ }
    };

    interface Props {
        readonly foo: number;
    }
    interface State {
        readonly bar: number;
    }
    export class Something extends React.Component<Props, State>{
        // You can rest assured no one is going to do
        // this.props.foo = 123; (props are immutable)
        // this.state.bar = 456; (one should use this.setState)
    }
}

export namespace Seamless {
    /**
     * Declaration
     */
    interface Foo {
        readonly[x: number]: number;
    }

    /**
     * Usage
     */
    let foo: Foo = { 0: 123, 2: 345 };
    console.log(foo[0]);   // Okay (reading)
    foo[0] = 456;          // Error (mutating) : Readonly
}

export namespace SeamlessArray {
    let foo: ReadonlyArray<number> = [1, 2, 3];
    console.log(foo[0]);   // Okay
    foo.push(4);           // Error: `push` does not exist on ReadonlyArray as it mutates the array
    foo = foo.concat([4]); // Okay: create a copy
}


export namespace ClassGetter {
    class Person {
        firstName: string = "John";
        lastName: string = "Doe";
        get fullName() {
            return this.firstName + this.lastName;
        }
    }

    const person = new Person();
    console.log(person.fullName); // John Doe
    person.fullName = "Dear Reader"; // Error! fullName is readonly
}

namespace vsconst {
    const foo = 123;
    var bar: {
        readonly bar: number;
    }
}

namespace aliasing {
    let foo: {
        readonly bar: number;
    } = {
            bar: 123
        };

    function iMutateFoo(foo: { bar: number }) {
        foo.bar = 456;
    }

    iMutateFoo(foo); // The foo argument is aliased by the foo parameter
    console.log(foo.bar); // 456!
}

namespace aliasing2 {
    interface Foo {
        readonly bar: number;
    }
    let foo: Foo = {
        bar: 123
    };

    function iTakeFoo(foo: Foo) {
        foo.bar = 456; // Error!  bar is readonly
    }

    iTakeFoo(foo); // The foo argument is aliased by the foo parameter
}
