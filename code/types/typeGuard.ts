export namespace quick {
    function doSomething(x: number | string) {
        if (typeof x === 'string') { // Within the block TypeScript knows that `x` must be a string
            console.log(x.subtr(1)); // Error, 'subtr' does not exist on `string`
            console.log(x.substr(1)); // OK
        }
        x.substr(1); // Error: There is no guarantee that `x` is a `string`
    }
}

export namespace instance {
    class Foo {
        foo = 123;
        common = '123';
    }

    class Bar {
        bar = 123;
        common = '123';
    }

    function doStuff(arg: Foo | Bar) {
        if (arg instanceof Foo){
            console.log(arg.foo); // OK
            console.log(arg.bar); // Error!
        }
        if (arg instanceof Bar){
            console.log(arg.foo); // Error!
            console.log(arg.bar); // OK
        }

        console.log(arg.common); // OK
        console.log(arg.foo); // Error!
        console.log(arg.bar); // Error!
    }

    doStuff(new Foo());
    doStuff(new Bar());
}

export namespace instanceElse {
    class Foo {
        foo = 123;
    }

    class Bar {
        bar = 123;
    }

    function doStuff(arg: Foo | Bar) {
        if (arg instanceof Foo){
            console.log(arg.foo); // OK
            console.log(arg.bar); // Error!
        }
        else {  // MUST BE Bar!
            console.log(arg.foo); // Error!
            console.log(arg.bar); // OK
        }
    }

    doStuff(new Foo());
    doStuff(new Bar());
}


export namespace userDefined {
    /**
     * Just some interfaces
     */
    interface Foo {
        foo: number;
        common: string;
    }

    interface Bar {
        bar: number;
        common: string;
    }

    /**
     * User Defined Type Guard!
     */
    function isFoo(arg: any): arg is Foo {
        return arg.foo !== undefined;
    }

    /**
     * Sample usage of the User Defined Type Guard
     */
    function doStuff(arg: Foo | Bar) {
        if (isFoo(arg)) {
            console.log(arg.foo); // OK
            console.log(arg.bar); // Error!
        }
        else {
            console.log(arg.foo); // Error!
            console.log(arg.bar); // OK
        }
    }

    doStuff({foo:123,common:'123'});
    doStuff({bar:123,common:'123'});
}
