## Type Assertion
TypeScript allows you to override its inferred and analyzed view of types in any way you want to. This is done by a mechanism called "type assertion". TypeScript's type assertion is purely you telling the compiler that you know about the types better than it does, and that it should not second guess you.

A common use case for type assertion is when you are porting over code from JavaScript to TypeScript. For example consider the following pattern:

```ts
var foo = {};
foo.bar = 123; // Error: property 'bar' does not exist on `{}`
foo.bas = 'hello'; // Error: property 'bas' does not exist on `{}`
```

Here the code errors because the *inferred* type of `foo` is `{}` i.e. an object with zero properties. Therefore you are not allowed to add `bar` or `bas` to it. You can fix this simply by a type assertion `as Foo`:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

### `as foo` vs. `<foo>`
Originally the syntax that was added was `<foo>`. This is demonstrated below:

```ts
var foo: any;
var bar = <string> foo; // bar is now of type "string"
```

However, there is an ambiguity in the language grammar when using `<foo>` style assertions in JSX:

```ts
var foo = <string>bar;
</string>
```

Therefore it is now recommended that you just use `as foo` for consistency.

### Type Assertion vs. Casting
The reason why it's not called "type casting" is that *casting* generally implies some sort of runtime support. However, *type assertions* are purely a compile time construct and a way for you to provide hints to the compiler on how you want your code to be analyzed.

### Assertion considered harmful
In many cases assertion will allow you to easily migrate legacy code (and even copy paste other code samples into your codebase). However, you should be careful with your use of assertions. Take our original code as a sample, the compiler will not protect you from forgetting to *actually add the properties you promised*:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = {} as Foo;
// ahhhh .... forget something?
```

Also another common thought is using an assertion as a means of providing *autocomplete* e.g.:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo = <Foo>{
    // the compiler will provide autocomplete for properties of Foo
    // But it is easy for the developer to forget adding all the properties
    // Also this code is likely to break if Foo gets refactored (e.g. a new property added)
};
```

but the hazard here is the same, if you forget a property the compiler will not complain. It is better if you do the following:

```ts
interface Foo {
    bar: number;
    bas: string;
}
var foo:Foo = {
    // the compiler will provide autocomplete for properties of Foo
};
```

In some cases you might need to create a temporary variable, but at least you will not be making (possibly false) promises and instead relying on the type inference to do the checking for you.

### Double assertion
The type assertion, despite being a bit unsafe as we've shown, is not *completely open season*. E.g. the following is a very valid use case (e.g. the user thinks the event passed in will be a more specific case of an event) and the type assertion works as expected:

```ts
function handler (event: Event) {
    let mouseEvent = event as MouseEvent;
}
```

However, the following is most likely an error and TypeScript will complain as shown despite the user's type assertion:

```ts
function handler(event: Event) {
    let element = event as HTMLElement; // Error: Neither 'Event' nor type 'HTMLElement' is assignable to the other
}
```

If you *still want that Type, you can use a double assertion*, but first asserting to `unknown` (or `any`) which is compatible with all types and therefore the compiler no longer complains:

```ts
function handler(event: Event) {
    let element = event as unknown as HTMLElement; // Okay!
}
```

#### How TypeScript determines if a single assertion is not enough
Basically, the assertion from type `S` to `T` succeeds if either `S` is a subtype of `T` or `T` is a subtype of `S`. This is to provide extra safety when doing type assertions ... completely wild assertions can be very unsafe and you need to use `unknown` (or `any`) to be that unsafe.
