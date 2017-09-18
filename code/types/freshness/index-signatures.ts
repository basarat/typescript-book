module a {
  let foo: any = {};
  foo['Hello'] = 'World';
  console.log(foo['Hello']); // World
}
module b {
  class Foo {
    constructor(public message: string) { };
    log() {
      console.log(this.message)
    }
  }

  let foo: any = {};
  foo['Hello'] = new Foo('World');
  foo['Hello'].log(); // World
}
module c {
  let obj = {
    toString() {
      console.log('toString called')
      return 'Hello'
    }
  }

  let foo: any = {};
  foo[obj] = 'World'; // toString called
  console.log(foo[obj]); // toString called, World
  console.log(foo['Hello']); // World
}

module d {
  let foo = ['World'];
  console.log(foo[0]); // World
}

module e {
  let obj = {
    toString() {
      return 'Hello'
    }
  }

  let foo: any = {};

  // ERROR: the index signature must be string, number ...
  foo[obj] = 'World';

  // FIX: TypeScript forces you to be explicit
  foo[obj.toString()] = 'World';
}

module f {
  let obj = { message: 'Hello' }
  let foo: any = {};

  // ERROR: the index signature must be string, number ...
  foo[obj] = 'World';

  // Here is what you actually stored!
  console.log(foo["[object Object]"]); // World
}

module f {
  console.log((1).toString()); // 1
  console.log((2).toString()); // 2
}

module g {
  let foo: { [index: string]: { message: string } } = {};

  /**
   * Must store stuff that conforms the structure
   */
  /** Ok */
  foo['a'] = { message: 'some message' };
  /** Error: must contain a `message` or type string. You have a typo in `message` */
  foo['a'] = { messages: 'some message' };

  /**
   * Stuff that is read is also type checked
   */
  /** Ok */
  foo['a'].message;
  /** Error: messages does not exist. You have a typo in `message` */
  foo['a'].messages;
}

module mustConform {

  /** Okay */
  interface Foo {
    [key: string]: number
    x: number;
    y: number;
  }
  /** Error */
  interface Bar {
    [key: string]: number
    x: number;
    y: string; // Property `y` must of of type number
  }
}

module mustConform2 {
  interface Foo {
    [key: string]: number
    x: number;
  }
  let foo: Foo = { x: 1, y: 2 };
  foo['x']; // number
  let x = 'x'
  foo[x]; // number
}

module dual {
  interface ArrStr {
    [key: string]: string | number; // Must accomodate all members

    [index: number]: string; // Can be a subset of string indexer

    // Just an example member
    length: number;
  }
}

module jsland {
  interface NestedCSS {
    color?: string;
    [selector: string]: string | NestedCSS;
  }

  const example: NestedCSS = {
    color: 'red',
    '.subclass': {
      color: 'blue'
    }
  }

  const failsSilently: NestedCSS = {
    colour: 'red', // No error as `colour` is a valid string selector
  }
}

module better {
  interface NestedCSS {
    color?: string;
    nest?: {
      [selector: string]: NestedCSS;
    }
  }

  const example: NestedCSS = {
    color: 'red',
    nest: {
      '.subclass': {
        color: 'blue'
      }
    }
  }

  const failsSilently: NestedCSS = {
    colour: 'red', // TS Error: unknown property `colour`
  }
}