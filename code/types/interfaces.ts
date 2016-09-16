namespace Implement {
    interface Point {
        x: number; y: number;
    }

    class MyPoint implements Point {
        x: number; y: number; // Same as Point
    }
}

namespace ErrorIt {
    interface Point {
        x: number; y: number;
        z: number; // New member
    }

    class MyPoint implements Point { // ERROR : missing member `z`
        x: number; y: number;
    }
}
