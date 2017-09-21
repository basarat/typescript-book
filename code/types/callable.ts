export namespace asdfasdfasdfasdflkjasdflkjasdflkjasdflkjasdf {
}

namespace A {
  interface ReturnString {
    (): string
  }
  declare const foo: ReturnString;
  const bar = foo(); // bar is inferred as a string
}

namespace Complex {
  interface Complex {
    (foo: string, bar?: number, ...others: boolean[]): number;
  }

  interface Overloaded {
    (foo: string): string
    (foo: number): number
  }

  // example implementation
  const overloaded: Overloaded = (foo) => foo;

  // example usage
  const str = overloaded(''); // str is inferred string
  const number = overloaded(123); // num is inferred number
}

namespace Direct {
  const overloaded: {
    (foo: string): string
    (foo: number): number
  } = (foo) => foo;

  const simple: (foo: number) => string
    = (foo) => foo.toString();

  interface CallMeWithNewToGetString {
    new(): string
  }
  // Usage 
  declare const Foo: CallMeWithNewToGetString;
  const bar = new Foo(); // bar is inferred to be of type string 
}

