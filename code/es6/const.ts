export var asdfasdfasfadf = 123;


namespace mustbeinit {
    const foo;
}

namespace cantbechanged {
    const foo = 123;
    foo = 456;
}


namespace block {
    const foo = 123;
    if (true) {
        const foo = 456; // Allowed as its a new variable limited to this `if` block
    }
}


namespace protectvariablereference {
    const foo = { bar: 123 };
    foo = { bar: 456 }; // ERROR : Left hand side of an assignment expression cannot be a constant
}


namespace noProtectDeep {
    const foo = { bar: 123 };
    foo.bar = 456; // Allowed!
}
