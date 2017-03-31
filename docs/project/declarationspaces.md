## Declaration Spaces

There are two declaration spaces in TypeScript: the *variable* declaration space and the *type* declaration space. These concepts are explored below.

### Type Declaration Space
The type declaration space contains stuff that can be used as a type annotation. E.g. the following are a few type declarations:

```ts
class Foo {};
interface Bar {};
type Bas = {};
```
This means that you can use `Foo`, `Bar`, `Bas`, etc. as a type annotation. E.g.:

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
The variable declaration space contains stuff that you can use as a variable. We saw that having `class Foo` contributes a type `Foo` to the *type* declaration space. Guess what? it also contributes a *variable* `Foo` to the *variable* declaration space as shown below:

```ts
class Foo {};
var someVar = Foo;
var someOtherVar = 123;
```
This is great as sometimes you want to pass classes around as variables. Remember that:

* we couldn't use something like an `interface` that is *only* in the *type* declaration space as a variable.

Similarly something that you declare with `var`, is *only* in the *variable* declaration space and cannot be used as a type annotation:

```ts
var foo = 123;
var bar: foo; // ERROR: "cannot find name 'foo'"
```
The reason why it says `cannot find name` is because the name `foo` *is not defined* in the *type* declaration space.
