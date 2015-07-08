export var asdf = 123;

module porting {
    var foo = {};
    foo.bar = 123; // error : property 'bar' does not exist on `{}`
    foo.bas = 'hello'; // error : property 'bas' does not exist on `{}`
}

module assert {
    interface Foo {
        bar: number;
        bas: string;
    }
    var foo = {} as Foo;
    foo.bar = 123; // error : property 'bar' does not exist on `{}`
    foo.bas = 'hello'; // error : property 'bas' does not exist on `{}`
}

module sdfsdfsdf {
    var foo: any;
    var bar = <string> foo; // bar is now of type "string"
}
