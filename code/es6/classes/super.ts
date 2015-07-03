export var foo = 123;

module asdf {
    class Base {
        log() { console.log('hello world'); }
    }

    class Child extends Base {
        logWorld() { super.log() };
    }
}

module bse {
    class Base {
        log = () => { console.log('hello world'); }
    }

    class Child extends Base {
        logWorld() { this.log() };
    }
}

module quz {
    class Base {
        log = () => { console.log('hello world'); }
    }

    class Child extends Base {
        logWorld() { super.log() }; // ERROR : only `public` and `protected` methods of base class are accessible via `super`
    }
}