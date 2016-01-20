namespace EnumDriven {
    // FOO
    enum FooIdBrand {}
    type FooId = FooIdBrand & string;

    // BAR
    enum BarIdBrand{}
    type BarId = BarIdBrand & string;

    /**
     * Usage Demo
     */
    var fooId: FooId;
    var barId: BarId;

    // Safety!
    fooId = barId; // error
    barId = fooId; // error

    // Newing up
    fooId = 'foo' as FooId;
    barId = 'bar' as BarId;

    // Both types are compatible with the base
    var str: string;
    str = fooId;
    str = barId;
}

namespace Interface {

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

    // Newing up
    fooId = 'foo' as any;
    barId = 'bar' as any;

    // If you need the base string
    var str: string;
    str = fooId as any;
    str = barId as any;
}
