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
There are two categories of TypeScript Error messages (succinct and detailed). 

### Succinct
The objective of the succinct error message is to provide an example *conventional compiler* description of the error number and message. For this example the succinct message looks like: 

```
TS2345: Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.
```
It is fairly self explanatory. However, it doesn't provide a deeper breakdown of *why* the error is happening. That is what the *detailed* error message is for.

### Detailed
For this example the detailed version looks like: 

```
[ts]
Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.
  Types of property 'bar' are incompatible.
    Type '() => string' is not assignable to type 'string'.
```
The objective of the detailed error message is to *guide* the user to the reason why some error (type incompatibility in this case) is happening. The first line is same as the succinct, followed by a chain. You should read this chain as a series of responses to the developer question `WHY?` between lines i.e 

```
ERROR: Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.

WHY? 
CAUSE ERROR: Types of property 'bar' are incompatible.

WHY? 
CAUSE ERROR: Type '() => string' is not assignable to type 'string'.
```

So the root cause is,
* for property `bar`
* there is a function `() => string` while it was expected as a `string`. 

This should help the developer fix the bug for the `bar` property (they forgot to invoke `()` the function).

## How it shows up in an IDE Tooltip 

The IDE normally shows the `detailed` followed by the `succinct` version in a tooltip as shown below: 

![IDE error message example](https://raw.githubusercontent.com/basarat/typescript-book/master/images/errors/interpreting-errors/ide.png)

* You normally just read the `detailed` version forming the `WHY?` chain in your head. 
* You use the succinct version if you want to search for similar errors (using the `TSXXXX` error code or portions of the error message)
