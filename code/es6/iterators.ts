// The book's chapter describes usage of Iterators with ES6 target
// This example showing usage of iterators with ES5 target
//
// The example from the chapter should work in moderen browsers and Node
// with target ES5 if you add es6.d.ts to the project

class Component {
  constructor (public name: string) {}
}

class Frame {

  private pointer = 0;

  constructor(public name: string, public components: Component[]) {}

  public next(): {done: boolean, value?: Component} {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    } else return {
      done: true
    }
  }

}

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
let iteratorResult1 = frame.next(); //{ done: false, value: Component { name: 'top' } }
let iteratorResult2 = frame.next(); //{ done: false, value: Component { name: 'bottom' } }
let iteratorResult3 = frame.next(); //{ done: false, value: Component { name: 'left' } }
let iteratorResult4 = frame.next(); //{ done: false, value: Component { name: 'right' } }
let iteratorResult5 = frame.next(); //{ done: true }

//It is possible to access the value of iterator result via the value property:
let component = iteratorResult1.value; //Component { name: 'top' }
