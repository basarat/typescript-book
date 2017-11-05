# JSX Support
TypeScript supports JSX transpilation and code analysis. If you are unfamiliar with JSX here is an excerpt from the [official website](https://facebook.github.io/jsx/):

> JSX is a XML-like syntax extension to ECMAScript without any defined semantics. It's NOT intended to be implemented by engines or browsers. It's NOT a proposal to incorporate JSX into the ECMAScript spec itself. It's intended to be used by various preprocessors (transpilers) to transform these tokens into standard ECMAScript.

The motivation behind JSX is to allow users to write HTML like views *in JavaScript* so that you can:
* Have the view Type Checked by the same code that is going to check your JavaScript
* Have the view be aware of the context it is going to operate under (i.e. strengthen the *controller-view* connection in traditional MVC)

This decreases the chances of errors and increases the maintainability of your user interfaces. The main consumer of JSX at this point is [ReactJS from facebook](http://facebook.github.io/react/). This is the usage of JSX that we will discuss here.

## Setup

* Use files with the extension `.tsx` (instead of `.ts`).
* Use `"jsx" : "react"` in your `tsconfig.json`'s `compilerOptions`.
* Install the definitions for JSX and React into your project : (`npm i -D @types/react @types/react-dom`).
* Import react into your `.tsx` files (`import * as React from "react"`).

## HTML Tags vs. Components
React can either render HTML tags (strings) or React components (classes). The JavaScript emit for these elements is different (`React.createElement('div')` vs. `React.createElement(MyComponent)`). The way this is determined is by the *case* of the *first* letter. `foo` is treated as an HTML tag and `Foo` is treated as a component.

## Type Checking

### HTML Tags
An HTML Tag `foo` is to be of the type `JSX.IntrinsicElements.foo`. These types are already defined for all the major tags in a file `react-jsx.d.ts` which we had you install as a part of the setup. Here is a sample of the  the contents of the file:

```ts
declare module JSX {
    interface IntrinsicElements {
        a: React.HTMLAttributes;
        abbr: React.HTMLAttributes;
        div: React.HTMLAttributes;
        span: React.HTMLAttributes;

        /// so on ...
    }
}
```

### Components
Components are type checked based on the `props` property of the component. This is modeled after how JSX is transformed i.e. the attributes become the `props` of the component.

To create React components we recommend using ES6 classes. The `react.d.ts` file defines the `React.Component<Props,State>` class which you should extend in your own class providing your own `Props` and `State` interfaces. This is demonstrated below:

```ts
interface Props {
  foo: string;
}
class MyComponent extends React.Component<Props, {}> {
    render() {
        return <span>{this.props.foo}</span>
    }
}

<MyComponent foo="bar" />
```

### React JSX Tip: Interface for renderable

React can render a few things like `JSX` or `string`. There are all consolidated into the type `React.ReactNode` so use it for when you want to accept renderables e.g.

```ts
interface Props {
  header: React.ReactNode;
  body: React.ReactNode;
}
class MyComponent extends React.Component<Props, {}> {
    render() {
        return <div>
            {header}
            {body}
        </div>;
    }
}

<MyComponent foo="bar" />
```

### React JSX Tip: Accept an instance of a Component
The react type definitions provide `React.ReactElement<T>` to allow you to annotate the result of a `<T/>` class component instantiation. e.g. 

```js
class MyAwesomeComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

const foo: React.ReactElement<MyAwesomeComponent> = <MyAwesomeComponent />; // Okay
const bar: React.ReactElement<MyAwesomeComponent> = <NotMyAwesomeComponent />; // Error!
```

> Of course you can use this as a function argument annotation and even React component prop member.

### React JSX Tip: Generic components
There's no syntax in JSX to apply generic parameters to a generic component. You must first store the generic class in a variable that removes any generic parameters with concrete types. As an example we replace `T` with the concrete `string` type:

```ts
/** A generic component */
type SelectProps<T> = { items: T[] }
class Select<T> extends React.Component<SelectProps<T>, any> { }

/** Specialize Select to use with strings */
const StringSelect = Select as { new (): Select<string> };

/** Usage */
const Form = () => <StringSelect items={['a','b']} />;
```
If your constructor takes props you can accomodate that too: 

```ts
/** Generic component */
interface SelectProps<T> { items: T[] }
class Select<T> extends Component<SelectProps<T>, any> {
    constructor(props: SelectProps<T>) { super(props) }
}
/** Specialization */
const StringSelect = Select as { new (props: SelectProps<string>): GenericList<string> };
```

## Non React JSX
TypeScript provides you with the ability to use something other than React with JSX in a type safe manner. The following lists the customizability points, but note that this is for advanced UI framework authors:

* You can disable `react` style emit by using `"jsx" : "preserve"` option. This means that JSX is emitted *as is* and then you can use your own custom transpiler to transpile the JSX portions.
* Using the `JSX` global module:
    * You can control what HTML tags are available and how they are type checked by customizing the `JSX.IntrinsicElements` interface members.
    * When using components:
        * You can control which `class` must be inherited by components by customizing the default `interface ElementClass extends React.Component<any, any> { }` declaration.
        * You can control which property is used to type check the attributes (the default is `props`) by customizing the `declare module JSX { interface ElementAttributesProperty { props: {}; } }` declaration.

## `reactNamespace`

Passing `--reactNamespace <JSX factory Name>` along with `--jsx react` allows for using a different JSX factory from the default `React`.

The new factory name will be used to call `createElement` functions.

##### Example

```ts
import {jsxFactory} from "jsxFactory";

var div = <div>Hello JSX!</div>
```

Compiled with:

```shell
tsc --jsx react --reactNamespace jsxFactory --m commonJS
```

Results in:

```js
"use strict";
var jsxFactory_1 = require("jsxFactory");
var div = jsxFactory_1.jsxFactory.createElement("div", null, "Hello JSX!");
```
