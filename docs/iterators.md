### Iterators

Iterator itself is not a TypeScript or ES6 feature, Iterator is a
Behavioral Design Pattern common for Object oriented programming languages.
It is, generally, an object which implements the following interface:

```ts
interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}
```
([More on that `<T>` notation later][generics])  
This interface allows to retrieve a value from some collection or sequence
which belongs to the object.

The `IteratorResult` is simply a `value`+`done` pair: 
```ts
interface IteratorResult<T> {
    done: boolean;
    value: T;
}
```

Imagine that there's an object of some frame, which includes the list of
components of which this frame consists. With Iterator interface it is possible
to retrieve components from this frame object like below:

```ts
class Component {
  constructor (public name: string) {}
}

class Frame implements Iterator<Component> {

  private pointer = 0;

  constructor(public name: string, public components: Component[]) {}

  public next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    } else {
      return {
        done: true,
        value: null
      }
    }
  }

}

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
let iteratorResult1 = frame.next(); //{ done: false, value: Component { name: 'top' } }
let iteratorResult2 = frame.next(); //{ done: false, value: Component { name: 'bottom' } }
let iteratorResult3 = frame.next(); //{ done: false, value: Component { name: 'left' } }
let iteratorResult4 = frame.next(); //{ done: false, value: Component { name: 'right' } }
let iteratorResult5 = frame.next(); //{ done: true, value: null }

//It is possible to access the value of iterator result via the value property:
let component = iteratorResult1.value; //Component { name: 'top' }
```
Again. Iterator itself is not a TypeScript feature, this code could work without
implementing Iterator and IteratorResult interfaces explicitly.
However, it is very helpful to use these common
ES6 [interfaces](./types/interfaces.md) for code consistency.

Ok, Nice, but could be more helpful. ES6 defines the *iterable protocol*
which includes the [Symbol.iterator] `symbol` if the Iterable interface is implemented:
```ts
//...
class Frame implements Iterable<Component> {

  constructor(public name: string, public components: Component[]) {}

  [Symbol.iterator]() {
    let pointer = 0;
    let components = this.components;

    return {
      next(): IteratorResult<Component> {
        if (pointer < components.length) {
          return {
            done: false,
            value: components[pointer++]
          }
        } else {
          return {
            done: true,
            value: null
          }
        }
      }
    }
  }
}

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
for (let cmp of frame) {
  console.log(cmp);
}
```

Unfortunately `frame.next()` won't work with this pattern and it also looks
a bit clunky. IterableIterator interface to the rescue!
```ts
//...
class Frame implements IterableIterator<Component> {

  private pointer = 0;

  constructor(public name: string, public components: Component[]) {}

  public next(): IteratorResult<Component> {
    if (this.pointer < this.components.length) {
      return {
        done: false,
        value: this.components[this.pointer++]
      }
    } else {
      return {
        done: true,
        value: null
      }
    }
  }

  [Symbol.iterator](): IterableIterator<Component> {
    return this;
  }

}
//...
```
Both `frame.next()` and `for` cycle now work fine with IterableIterator interface.

Iterator does not have to iterate a finite value.
The typical example is a Fibonacci sequence:
```ts
class Fib implements IterableIterator<number> {

  protected fn1 = 0;
  protected fn2 = 1;

  constructor(protected maxValue?: number) {}

  public next(): IteratorResult<number> {
    var current = this.fn1;
    this.fn1 = this.fn2;
    this.fn2 = current + this.fn1;
    if (this.maxValue != null && current >= this.maxValue) {
      return {
        done: true,
        value: null
      } 
    } 
    return {
      done: false,
      value: current
    }
  }

  [Symbol.iterator](): IterableIterator<number> {
    return this;
  }

}

let fib = new Fib();

fib.next() //{ done: false, value: 0 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 2 }
fib.next() //{ done: false, value: 3 }
fib.next() //{ done: false, value: 5 }

let fibMax50 = new Fib(50);
console.log(Array.from(fibMax50)); // [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ]

let fibMax21 = new Fib(21);
for(let num of fibMax21) {
  console.log(num); //Prints fibonacci sequence 0 to 21
}
```

#### Building code with iterators for ES5 target
Code examples above require ES6 target. However, it could work
with ES5 target as well if target JS engine supports `Symbol.iterator`.
This can be achieved by using ES6 lib with ES5 target
(add es6.d.ts to your project) to make it compile.
Compiled code should work in node 4+, Google Chrome and in some other browsers.

[generics]: ./types/generics.md
