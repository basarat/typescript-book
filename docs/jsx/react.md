> [PRO Egghead course on TypeScript and React](https://egghead.io/courses/use-typescript-to-develop-react-applications)

## Setup
Our [browser quickstart already sets you up to develop react applications](../quick/browser.md). Here are the key highlights. 

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
