# Mixins

TypeScript (and JavaScript) classes support strict single inheritance. So you *cannot* do:

```ts
class User extends Tagged, Timestamped { // ERROR : no multiple inheritance
}
```

Another way of building up classes from reusable components is to build them by combining simpler partial classes called mixins.

The idea is simple, instead of a *class A extending class B* to get its functionality, *function B takes class A* and returns a new class with this added functionality. Function `B` is a mixin.  

> [A mixin is] a function that
>
> 1. takes a constructor,
> 1. creates a class that extends that constructor with new functionality
> 1. returns the new class

A complete example

```ts
// Needed for all mixins
type Constructor<T = {}> = new (...args: any[]) => T;

////////////////////
// Example mixins
////////////////////

// A mixin that adds a property
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// a mixin that adds a property and methods
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

////////////////////
// Usage to compose classes
////////////////////

// Simple class
class User {
  name = '';
}

// User that is Timestamped
const TimestampedUser = Timestamped(User);

// User that is Timestamped and Activatable
const TimestampedActivatableUser = Timestamped(Activatable(User));

////////////////////
// Using the composed classes
////////////////////

const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);

const timestampedActivatableUserExample = new TimestampedActivatableUser();
console.log(timestampedActivatableUserExample.timestamp);
console.log(timestampedActivatableUserExample.isActivated);

```

Let's decompose this example.

## Take a constructor

Mixins take a class and extend it with new functionality. So we need to define what is a *constructor*. Easy as:

```ts
// Needed for all mixins
type Constructor<T = {}> = new (...args: any[]) => T;
```

## Extend the class and return it

Pretty easy:

```ts
// A mixin that adds a property
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}
```

And that is it 🌹
