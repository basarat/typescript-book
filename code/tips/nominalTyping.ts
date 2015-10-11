// FOO
interface FooId extends String {
    _fooIdBrand: string; // To prevent type errors
}

// BAR
interface BarId extends String {
    _barIdBrand: string; // To prevent type errors
}

/**
 * Usage Demo
 */
var fooId: FooId;
var barId: BarId;

// Safety!
fooId = barId; // error
barId = fooId; // error
fooId = <FooId>barId; // error
barId = <BarId>fooId; // error

// client side assignment. Think of it as "new Id"
fooId = 'foo' as any;
barId = 'bar' as any;

// If you need the base string
// (for code that might operate on base identity)
var str: string;
str = fooId as any;
str = barId as any;
