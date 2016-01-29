## Functions
The TypeScript type system pays a lot of love to functions, after all they are the core building block of a composable system.

### Parameter annotations
Of course you can annotate function parameters just like you can annotate other variables:

```ts
// variable annotation
var sampleVariable: { bar: number }

// function parameter
function foo(sampleParameter: { bar: number }) { }
```
Here I used inline type annotations. Of course you can use interfaces etc.

### Return type annotation

You can annotate the return type after the function parameter list with the same style as you use for a variable, e.g. `: Foo` in the below example:

```ts
interface Foo {
    foo: string;
}

// Return type annotated as `: Foo`
function foo(sample: Foo): Foo {
    return sample;
}
```

Of course I used an `interface` here, but you are free to use other annotations e.g. inline annotations.

Quite commonly you don't *need* to annotate the return type of a function as it can generally be inferred by the compiler.

```ts
interface Foo {
    foo: string;
}

function foo(sample: Foo) {
    return sample; // inferred return type 'Foo'
}
```

However it is generally a good idea to add these annotation to help with errors e.g.

```ts
function foo() {
    return { fou: 'John Doe' }; // You might not find this misspelling `foo` till its too late
}

sendAsJSON(foo());
```
If you don't plan to return anything from a function to you can annotate it as `:void`. You can generally drop `:void` and leave it to the inference engine though.

### Optional Parameters
You can mark a parameter as optional,

```ts
function foo(bar: number, bas?: string): void {
    // ..
}

foo(123);
foo(123,'hello');
```

Alternatively you can even provide a default value (using `= someValue` after the parameter declaration) which will get injected for you if the caller doesn't provide that argument.

```ts
function foo(bar: number, bas: string = 'hello') {
    console.log(bar, bas);
}

foo(123);           // 123, hello
foo(123, 'world');  // 123, world
```

### Overloading

[](### Declaring Functions)
[](With lambda, with interfaces which allow overloading declarations)

[](### Type Compatability)
