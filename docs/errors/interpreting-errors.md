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
There are two categories of TypeScript Error messages (succint and detailed). For this example the succint message looks like: 

```
TS2345: Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.
```

The detailed version looks like: 

```
[ts]
Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'SomethingComplex'.
  Types of property 'bar' are incompatible.
    Type '() => string' is not assignable to type 'string'.
```

## How it shows up in an IDE Tooltip 

The IDE normally shows the details followed by the succint version in a tooltip as shown below: 

![IDE error message example](https://raw.githubusercontent.com/basarat/typescript-book/master/images/errors/interpreting-errors/ide.png)