## Type Instantiation for Generics

Say you have something that has a generic parameter e.g. a class `Foo`:

```ts
class Foo<T>{
	foo: T;
}
```

You want to create a specialized version for it for a particular type. The pattern is to copy the item into a new variable and give it the type annotation with the generics replaced with concrete types. E.g if you want a class `Foo<number>`:

```ts
class Foo<T>{
	foo: T;
}
let FooNumber = Foo as { new ():Foo<number> }; // ref 1
```
In `ref 1` you are saying that `FooNumber` is the same as `Foo` but just treat it as something that when called with the `new` operator gives an instance of `Foo<Number>`.

### Inheritance
The Type assertion pattern is unsafe in that it trusts you to do the right thing. A common pattern in other languages *for classes* is to just use inheritance :

```ts
class FooNumber extends Foo<number>{}
```

One word of caution here: if you use decorators on the base class then the inherited class might not have the same behavior as the base class (it is no longer wrapped by the decorator).

Of course if you are not specializing classes you still have to come up with a coercion / assertion pattern that works and hence we showed the general assertion pattern first, e.g.:

```ts
function id<T>(x: T) { return x; }
const idNum = id as {(x:number):number};
```

> Inspired by this [stackoverflow question](http://stackoverflow.com/a/34864705/390330)
