## Declaration Spaces

There are two declaration spaces in TypeScript: The *variable* declaration space and the *type* declaration space. These concepts are explored below.

### Type Declaration Space
The type declaration space contains stuff that can be used as a type annotation. E.g the following are a few type declarations:

```ts
class Foo { }
interface Bar { }
type Bas = {}
```
This means that you can use `Foo`, `Bar`, `Bas` etc. as a type annotation. E.g.:

```ts
var foo: Foo;
var bar: Bar;
var bas: Bas;
```

Notice that even though you have `interface Bar`, *you can't use it as a variable* because it doesn't contribute to the *variable declaration space*. This is shown below:

```ts
interface Bar {};
var bar = Bar; // ERROR: "cannot find name 'Bar'"
```

The reason why it says `cannot find name` is because the name `Bar` *is not defined* in the *variable* declaration space. That brings us to the next topic "Variable Declaration Space".

### Variable Declaration Space
The variable declaration space contains stuff that you can use as a variable. We saw that having `class Foo` contributes a type `Foo` to the *type* declaration space. Guess what?, it also contributes a *variable* `Foo` to the *variable* declaration space as shown below:

```ts
class Foo { }
var someVar = Foo;
var someOtherVar = 123;
```
This is great as sometimes you want to pass classes around as variables. Remember that

* We couldn't use something like an `interface` that is *only* in the *type* declaration space as a variable.

Similarly something that you declare with `var`, is *only* in the *variable* declaration space and cannot be used as a type annotation:

```ts
var foo = 123;
var bar: foo; // ERROR: "cannot find name 'foo'"
```
The reason why it says `cannot find name` is because the name `foo` *is not defined* in the *type* declaration space.

### TIPS

#### Copying Stuff around in the Type Declaration Space

If you want to move a class around you might be tempted to do the following:

```ts
class Foo { }
var Bar = Foo;
var bar: Bar; // ERROR: "cannot find name 'Bar'"
```
This is an error because `var` only copied the `Foo` into the *variable* declaration space and you therefore cannot use `Bar` as a type annotation. The proper way is to use the `import` keyword. Note that you can only use the `import` keyword in such a way if you are using *namespaces* or *modules* (more on these later):

```ts
namespace importing {
    export class Foo { }
}

import Bar = importing.Foo;
var bar: Bar; // Okay
```

#### Capturing the type of a variable

You can actually use a variable in a type annotation using the `typeof` operator. This allows you to tell the compiler that one variable is the same type as another. Here is an example to demonstrate this:

```ts
var foo = 123;
var bar: typeof foo; // `bar` has the same type as `foo` (here `number`)
bar = 456; // Okay
bar = '789'; // ERROR: Type `string` is not `assignable` to type `number`
```

#### Capturing the type of a class member

Similar to capturing the type of a variable, you just declare a variable purely for type capturing purposes:

```ts
class Foo {
  foo: number; // some member whose type we want to capture
}

// Purely to capture type
declare let _foo: Foo;

// Same as before
let bar: typeof _foo.foo;
```
