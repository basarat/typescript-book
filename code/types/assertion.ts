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
    foo.bar = 123;
    foo.bas = 'hello';
}

module sdfsdfsdf {
    var foo: any;
    var bar = <string>foo; // bar is now of type "string"
}


namespace doubleAssertion {

    function handler1(event: Event) {
        let mouseEvent = event as MouseEvent;
    }

    function handler2(event: Event) {
        let element = event as HTMLElement; // Error : Neither 'Event' not type 'HTMLElement' is assignable to the other
    }

    function handler(event: Event) {
        let element = event as any as HTMLElement; // Okay!
    }
}
