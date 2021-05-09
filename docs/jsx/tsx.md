# JSX Support

[![DesignTSX](https://raw.githubusercontent.com/basarat/typescript-book/master/images/designtsx-banner.png)](https://designtsx.com)

TypeScript supports JSX transpilation and code analysis. If you are unfamiliar with JSX here is an excerpt from the [official website](https://facebook.github.io/jsx/):

> JSX is an XML-like syntax extension to ECMAScript without any defined semantics. It's NOT intended to be implemented by engines or browsers. It's NOT a proposal to incorporate JSX into the ECMAScript spec itself. It's intended to be used by various preprocessors (transpilers) to transform these tokens into standard ECMAScript.

The motivation behind JSX is to allow users to write HTML like views *in JavaScript* so that you can:

* Have the view Type Checked by the same code that is going to check your JavaScript
* Have the view be aware of the context it is going to operate under (i.e. strengthen the *controller-view* connection in traditional MVC).
* Reuse JavaScript patterns for HTML maintenance e.g. `Array.prototype.map`, `?:`, `switch` etc instead of creating new (and probably poorly typed) alternatives.

This decreases the chances of errors and increases the maintainability of your user interfaces. The main consumer of JSX at this point is [ReactJS from facebook](http://facebook.github.io/react/). This is the usage of JSX that we will discuss here.
