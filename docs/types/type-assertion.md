## Type Assertion
TypeScript allows you to override its inferred and analyzed view of types any way you want to. This is done by a mechanism called "type assertion". TypeScript's type assertion are purely you telling the compiler that you know about the types better than it does, and that it should not second guess you.

A common use case for type assertion is when you are porting over code from JavaScript to TypeScript. For example consider the following pattern:

```ts
var foo = {};
foo.bar = 123; // error : property 'bar' does not exist on `{}`
foo.bas = 'hello'; // error : property 'bas' does not exist on `{}`
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

However there is an ambiguity in the language grammar when using `<foo>` style assertions in JSX:

```ts
var foo = <string>bar;  
</string>  
```

Therefore it is now recommended that you just use `as foo` for consistency.

### Type Assertion vs. Casting
The reason why it's not called "type casting" is that *casting* generally implies some sort of runtime support. However *type assertions* are purely a compile time construct and a way for you to provide hints to the compiler on how you want your code to be analyzed.

{% include "footer.md" %}
