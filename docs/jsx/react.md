# React JSX

> [Free series of youtube videos on React / TypeScript best practices](https://www.youtube.com/watch?v=7EW67MqgJvs&list=PLYvdvJlnTOjHNayH7MukKbSJ6PueUNkkG)

> [PRO Egghead course on TypeScript and React](https://egghead.io/courses/use-typescript-to-develop-react-applications)

[![DesignTSX](https://raw.githubusercontent.com/basarat/typescript-book/master/images/designtsx-banner.png)](https://designtsx.com)

## Setup

Our [browser quickstart already sets you up to develop react applications](../quick/browser.md). Here are the key highlights.

* Use files with the extension `.tsx` (instead of `.ts`).
* Use `"jsx" : "react"` in your `tsconfig.json`'s `compilerOptions`.
* Install the definitions for JSX and React into your project : (`npm i -D @types/react @types/react-dom`).
* Import react into your `.tsx` files (`import * as React from "react"`).

## HTML Tags vs. Components

React can either render HTML tags (strings) or React components. The JavaScript emit for these elements is different (`React.createElement('div')` vs. `React.createElement(MyComponent)`). The way this is determined is by the *case* of the *first* letter. `foo` is treated as an HTML tag and `Foo` is treated as a component.

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

### Function Components

You can define function components simply with the `React.FunctionComponent` interface e.g.

```ts
type Props = {
  foo: string;
}
const MyComponent: React.FunctionComponent<Props> = (props) => {
    return <span>{props.foo}</span>
}

<MyComponent foo="bar" />
```

### Void Function Components

As of [@types/react PR #46643](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/46643), you can use a new `React.VoidFunctionComponent` or `React.VFC` type if you wish to declare that a component does not take `children`. This is an interim solution until the next major version of the type defs (where VoidFunctionComponent will be deprecated and FunctionComponent will by default accept no children).

```ts
type Props = { 
  foo: string 
}
// OK now, in future, error
const FunctionComponent: React.FunctionComponent<Props> = ({ foo, children }: Props) => {
    return <div>{foo} {children}</div>; // OK
};
// Error now (children not support), in future, deprecated
const VoidFunctionComponent: React.VoidFunctionComponent<Props> = ({ foo, children }) => {
    return <div>{foo}{children}</div>; 
};
```

### Class Components

Components are type checked based on the `props` property of the component. This is modeled after how JSX is transformed i.e. the attributes become the `props` of the component.

The `react.d.ts` file defines the `React.Component<Props,State>` class which you should extend in your own class providing your own `Props` and `State` interfaces. This is demonstrated below:

```ts
type Props = {
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

React can render a few things like `JSX` or `string`. These are all consolidated into the type `React.ReactNode` so use it for when you want to accept renderables e.g.

```ts
type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
}
class MyComponent extends React.Component<Props, {}> {
    render() {
        return <div>
            {this.props.header}
            {this.props.body}
        </div>;
    }
}

<MyComponent header={<h1>Header</h1>} body={<i>body</i>} />
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

### React JSX Tip: Accept a *component* that can act on props and be rendered using JSX

The type `React.Component<Props>` consolidates `React.ComponentClass<P> | React.StatelessComponent<P>` so you can accept *something* that takes type `Props` and renders it using JSX e.g.

```ts
const X: React.Component<Props> = foo; // from somewhere

// Render X with some props:
<X {...props}/>;
```

### React JSX Tip: Generic components

It works exactly as expected. Here is an example:

```ts
/** A generic component */
type SelectProps<T> = { items: T[] }
class Select<T> extends React.Component<SelectProps<T>, any> { }

/** Usage */
const Form = () => <Select<string> items={['a','b']} />;
```

### Generic functions

Something like the following works fine:

```ts
function foo<T>(x: T): T { return x; }
```

However, using an arrow generic function will not:

```ts
const foo = <T>(x: T) => x; // ERROR : unclosed `T` tag
```

**Workaround**: Use `extends` on the generic parameter to hint the compiler that it's a generic, e.g.:

```ts
const foo = <T extends unknown>(x: T) => x;
```

### React Tip: Strongly Typed Refs 
You basically initialize a variable as a union of the ref and `null` and then initialize it as as callback  e.g. 

```ts
class Example extends React.Component {
  example() {
    // ... something
  }
  
  render() { return <div>Foo</div> }
}


class Use {
  exampleRef: Example | null = null; 
  
  render() {
    return <Example ref={exampleRef => this.exampleRef = exampleRef } />
  }
}
```

And the same with ref's for native elements e.g. 

```ts
class FocusingInput extends React.Component<{ value: string, onChange: (value: string) => any }, {}>{
  input: HTMLInputElement | null = null;
    
  render() {
    return (
      <input
        ref={(input) => this.input = input}
        value={this.props.value}
        onChange={(e) => { this.props.onChange(e.target.value) } }
        />
      );
    }
    focus() {
      if (this.input != null) { this.input.focus() }
    }
}
```

### Type Assertions

Use `as Foo` syntax for type assertions as we [mentioned before](../types/type-assertion.md#as-foo-vs-foo).

## Default Props

* Stateful components with default props: You can tell TypeScript that a property will be provided externally (by React) by using a *null assertion* operator (this isn't ideal but is the simplest minimum *extra code* solution I could think of).

```tsx
class Hello extends React.Component<{
  /**
   * @default 'TypeScript'
   */
  compiler?: string,
  framework: string
}> {
  static defaultProps = {
    compiler: 'TypeScript'
  }
  render() {
    const compiler = this.props.compiler!;
    return (
      <div>
        <div>{compiler}</div>
        <div>{this.props.framework}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Hello framework="React" />, // TypeScript React
  document.getElementById("root")
);
```

* SFC with default props: Recommend leveraging simple JavaScript patterns as they work well with TypeScript's type system e.g.

```tsx
const Hello: React.SFC<{
  /**
   * @default 'TypeScript'
   */
  compiler?: string,
  framework: string
}> = ({
  compiler = 'TypeScript', // Default prop
  framework
}) => {
    return (
      <div>
        <div>{compiler}</div>
        <div>{framework}</div>
      </div>
    );
  };


ReactDOM.render(
  <Hello framework="React" />, // TypeScript React
  document.getElementById("root")
);
```

## Declaring a webcomponent

If you are using a web component the default React type definitions (`@types/react`) will not know about it. But you can declare it easily e.g. to declare a webcomponent called `my-awesome-slider` that takes Props `MyAwesomeSliderProps` you would: 

```tsx
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-awesome-slider': MyAwesomeSliderProps;
    }

    interface MyAwesomeSliderProps extends React.Attributes {
      name: string;
    }
  }
}
```

Now you can use it in TSX:

```tsx
<my-awesome-slider name='amazing'/>
```
