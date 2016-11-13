export namespace Simple {
    let foo: 'Hello';
    foo = 'Bar'; // Error: "Bar" is not assignable to type "Hello"
}


export namespace Union {
    type CardinalDirection =
        "North"
        | "East"
        | "South"
        | "West";

    function move(distance: number, direction: CardinalDirection) {
        // ...
    }

    move(1,"North"); // Okay
    move(1,"Nurth"); // Error!
}
