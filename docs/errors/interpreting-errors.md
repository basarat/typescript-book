# Interpreting Errors 
Since TypeScript is a heavily focused *Developer Help* oriented programming language, its errors messages try to be super helpful when something goes wrong. This can lead to a slight information overload for unsuspecting users of compilers that aren't so helpful. 

Lets look at an example in an IDE to break apart the process of reading an error message. 

```ts
type SomethingComplex = {
  foo: number,
  bar: string
}
function takeSomethingComplex(arg: SomethingComplex) {
}
function getBar(): string {
  return 'some bar';
}

//////////////////////////////////
// Example error production
//////////////////////////////////
const fail = {
  foo: 123,
  bar: getBar
};

takeSomethingComplex(fail); // TS ERROR HAPPENS HERE 
```

This example demonstrates a common programmer error where they *fail* to call a function (`bar: getBar` should be `bar: getBar()`). Fortunately this mistake is caught by TypeScript as soon as it doesn't meet the type requirements. 

## Error Categories
There are two categories of TypeScript Error messages (succint and detailed). 

### Succint
The objective of the succint error message is to provide an example *conventional compiler* description of the error number and message. For this example the succint message looks like: 

```
TS2345: Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.
```
It is fairly self explanatory. However it doesn't provide a deeper breakdown of *why* the error is happening. That is what the *detiled* error message is for.

### Detailed
For this example the detailed version looks like: 

```
[ts]
Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.
  Types of property 'bar' are incompatible.
    Type '() => string' is not assignable to type 'string'.
```
The objective of the detailed error message is to *guide* the user to the reason why some error (type incompatability in this case) is happening. You should read this as a chain of responses to the developer question `Why?` between lines i.e 

```
ERROR: Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.

WHY? 
CAUSE ERROR: Types of property 'bar' are incompatible.

WHY? 
CAUSE ERROR: Type '() => string' is not assignable to type 'string'.
```

So the root cause is,
* for property `bar`
* there is a function with signature `() => string` while it was expected as a `string`. This is because of the developer bug (they forgot to invoke `()` the function).

## How it shows up in an IDE Tooltip 

The IDE normally shows the detailed followed by the succint version in a tooltip as shown below: 

![IDE error message example](https://raw.githubusercontent.com/basarat/typescript-book/master/images/errors/interpreting-errors/ide.png)

Based on the above explanation on detailed error messages you should be able to read them better. 
