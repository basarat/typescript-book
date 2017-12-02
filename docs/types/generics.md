## Generics

The key motivation for generics is to provide meaningful type constraints between members. The members can be:

* Class instance members
* Class methods
* function arguments
* function return value

## Motivation and samples

Consider the simple `Queue` (first in, first out) data structure implementation. A simple one in TypeScript / JavaScript looks like:

```ts
class Queue {
  private data = [];
  push = (item) => this.data.push(item);
  pop = () => this.data.shift();
}
```

One issue with this implementation is that it allows people to add *anything* to the queue and when they pop it - it can be *anything*. This is shown below, where someone can push a `string` onto the queue while the usage actually assumes that only `numbers` where pushed in:

```ts
class Queue {
  private data = [];
  push = (item) => this.data.push(item);
  pop = () => this.data.shift();
}

const queue = new Queue();
queue.push(0);
queue.push("1"); // Ops a mistake

// a developer walks into a bar
console.log(queue.pop().toPrecision(1));
console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR
```

One solution (and in fact the only one in languages that don't support generics) is to go ahead and create *special* classes just for these contraints. E.g. a quick and dirty number queue:

```ts
class QueueNumber {
  private data = [];
  push = (item: number) => this.data.push(item);
  pop = (): number => this.data.shift();
}

const queue = new QueueNumber();
queue.push(0);
queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

// ^ if that error is fixed the rest would be fine too
```

Of course this can quickly become painful e.g. if you want a string queue you have to go through all that effort again. What you really want is a way to say that whatever the type is of the stuff getting *pushed* it should be the same for whatever gets *popped*. This is done easily with a *generic* parameter (in this case, at the class level):

```ts
/** A class definition with a generic parameter */
class Queue<T> {
  private data = [];
  push = (item: T) => this.data.push(item);
  pop = (): T => this.data.shift();
}

/** Again sample usage */
const queue = new Queue<number>();
queue.push(0);
queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

// ^ if that error is fixed the rest would be fine too
```

Another example that we have already seen is that of a *reverse* function, here the constraint is between what gets passed into the function and what the function returns:

```ts
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}

var sample = [1, 2, 3];
var reversed = reverse(sample);
console.log(reversed); // 3,2,1

// Safety!
reversed[0] = '1';     // Error!
reversed = ['1', '2']; // Error!

reversed[0] = 1;       // Okay
reversed = [1, 2];     // Okay
```

In this section you have seen examples of generics being defined *at class level* and at *function level*. One minor addition worth mentioning is that you can have generics created just for a member function. As a toy example consider the following where we move the `reverse` function into a `Utility` class:

```ts
class Utility {
  reverse<T>(items: T[]): T[] {
      var toreturn = [];
      for (let i = items.length - 1; i >= 0; i--) {
          toreturn.push(items[i]);
      }
      return toreturn;
  }
}
```

> TIP: You can call the generic parameter whatever you want. It is conventional to use `T`, `U`, `V` when you have simple generics. If you have more than one generic argument try to use meaningful names e.g. `TKey` and `TValue` (conventional to prefix with `T` as generics are also called *templates* in other languages e.g. C++).

## Generics in TSX

Because `.tsx` / `.jsx` uses syntax like `<div>` to denote JSX blocks it offers a few unique challenges for Generics.

> Quick Tip:  Use `as Foo` syntax for type assertions as we [mentioned before][type-assertion].

[type-assertion]:./type-assertion.md#as-foo-vs-foo


### Generic functions

Something like the following works fine:

```ts
function foo<T>(x: T): T { return x; }
```

However using an arrow generic function will not:

```ts
const foo = <T>(x: T) => x; // ERROR : unclosed `T` tag
```

**Workaround**: Use `extends` on the generic parameter to hint the compiler that it's a generic, e.g.:

```ts
const foo = <T extends {}>(x: T) => x;
```

### Generic Components

Since JSX doesn't have a syntax for providing a generic parameter you need to specialize the component using a type assertion before creating it, e.g.:

```ts
/** Generic component */
type SelectProps<T> = { items: T[] }
class Select<T> extends React.Component<SelectProps<T>, any> { }

/** Specialization */
interface StringSelect { new (): Select<string> };
const StringSelect = Select as StringSelect;

/** Usage */
const Form = ()=> <StringSelect items={['a', 'b']} />;
```

## Useless Generic

I've seen people use generics just for the heck of it. The question to ask is *what constraint are you trying to describe*. If you can't answer it easily you probably have a useless generic. E.g. people have attempted to type the Node.js `require` function as:

```ts
declare function require<T>(name: string): T;
```

In this case you can see that the type `T` is only used in one place. So there is not constraint *between* members. You would be better off with a type assertion in this case:

```ts
declare function require(name: string): any;

const something = require('something') as TypeOfSomething;
```

This is just an example; if you are considering on using this `require` typings, you don't need to because:

1. It's already there in `node.d.ts`: you can install using `npm install @types/node --save-dev`.
1. You should consider using the type definitions for your library e.g. for jquery `npm install @types/jquery --save-dev` instead of using raw `require`.

### Design Pattern: Convenience generic

The previous example of `require<T>` was intentionally meant to make clear the fact that generics used *only once* are no better than an assertion in terms of type safety. That said they do provide *convenience* to your API.

An example is a function that loads a json response. It returns a promise of *whatever type you pass in*:
```ts
const getJSON = <T>(config: {
    url: string,
    headers?: { [key: string]: string },
  }): Promise<T> => {
    const fetchConfig = ({
      method: 'GET',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(config.headers || {})
    });
    return fetch(config.url, fetchConfig)
      .then<T>(response => response.json());
  }
```
Note that you still have to explicitly annotate what you want, but the `getJSON<T>` signature `(config) => Promise<T>` saves you a few key strokes:

```ts
type LoadUsersResponse = {
  users: {
    name: string;
    email: string;
  }[];
}
function loadUsers() {
  return getJSON<LoadUsersResponse>({ url: 'https://example.com/users' });
}
```

Also `Promise<T>` as a return value is definitely better than alternatives like `Promise<any>`.
