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

  move(1, "North"); // Okay
  move(1, "Nurth"); // Error!
}

namespace StringEnum {

  /** Utility function to create a K:V from a list of strings */
  function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
    return o.reduce((res, key) => {
      res[key] = key;
      return res;
    }, Object.create(null));
  }

  /**
   * Sample create a string enum
   */

  /** Create a K:V */
  const Direction = strEnum([
    'North',
    'South',
    'East',
    'West'
  ])
  /** Create a Type */
  type Direction = keyof typeof Direction;

  /** 
   * Sample using a string enum
   */
  let sample: Direction;

  sample = Direction.North; // Okay
  sample = 'North'; // Okay
  sample = 'AnythingElse'; // ERROR!
}