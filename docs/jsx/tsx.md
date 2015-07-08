# JSX Support
TypeScript supports JSX transpilation and code analysis. If you are unfamiliar with JSX here is an excerpt from the [official website](https://facebook.github.io/jsx/):

> JSX is a XML-like syntax extension to ECMAScript without any defined semantics. It's NOT intended to be implemented by engines or browsers. It's NOT a proposal to incorporate JSX into the ECMAScript spec itself. It's intended to be used by various preprocessors (transpilers) to transform these tokens into standard ECMAScript.

The motivation behind JSX is to allow users to write HTML like views *in JavaScript* so that you can:
* Have the view Type Checked by the same code that is going to check your JavaScript
* Have the view be aware of the context it is going to operate under (i.e. strethen the *controller-view* connection in traditional MVC)

This decreases the changes of errors and increases the maintainability of your user interfaces. The main consumer of JSX at this point is [ReactJS from facebook](http://facebook.github.io/react/). This is the usage of JSX that we will discuss here.

## Setup

* Use files with the extension `.tsx` (instead of `.ts`).
* Install the definitions for JSX and React into your project : (`tsd install react react-jsx --save --resolve`).
* Use `"jsx" : "react"` in your `tsconfig.json`'s `compilerOptions`.

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

## Non React JSX
TypeScript provides you with the ability to use something other than React with JSX in a type safe manner. The following lists the customizability points, but note that this is for advanced UI framework authors:

* You can disable `react` style emit by using `"jsx" : "preserve"` option. This means that JSX is emitted *as is* and then you can use your own custom transpiler to transpile the JSX portions.
* Using the `JSX` global module:
    * You can control what HTML tags are available and how they are type checked by customizing the `JSX.IntrinsicElements` interface members.
    * When using components:
        * You can control which `class` must be inherited by components by customizing the default `interface ElementClass extends React.Component<any, any> { }` declaration.
        * You can control which property is used to type check the attributes (the default is `props`) by customizing the `declare module JSX { interface ElementAttributesProperty { props: {}; } }` declaration.

{% include "footer.md" %}
