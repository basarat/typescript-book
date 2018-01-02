## Mixins

TypeScript (and JavaScript) classes support strict single inheritance. So you *cannot* do:

```
class User extends Tagged, Timestamped { // ERROR : no multiple inheritance
}
```

Another way of building up classes from reusable components is to build them by combining simpler partial classes called mixins.

The idea is simple, instead of a *class A extending class B* to get its functionality, *function B takes class A* and returns a new class with this added functionality. Function `B` is a mixin.  

> [A mixin is] a function that
 1. takes a constructor,
 1. declares a class that extends that constructor,
 1. adds members to that new class, and
 1. returns the class itself.


A complete example
```js
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
// Usage
////////////////////

// Simple class
class User {
  name: string
}

// User with timestamp
class TimestampedUser extends TimeStamp(class {
  name: string
})

// User that is TimeStamped and Activatable
class TimestampedActivableUser extends TimeStamped(Activatable(class {
  name: string
})
```

Let's decompose this example.
