# Non React JSX

[![DesignTSX](https://raw.githubusercontent.com/basarat/typescript-book/master/images/designtsx-banner.png)](https://designtsx.com)

TypeScript provides you with the ability to use something other than React with JSX in a type safe manner. The following lists the customizability points, but note that this is for advanced UI framework authors:

* You can disable `react` style emit by using `"jsx" : "preserve"` option. This means that JSX is emitted *as is* and then you can use your own custom transpiler to transpile the JSX portions.
* Using the `JSX` global module:
    * You can control what HTML tags are available and how they are type checked by customizing the `JSX.IntrinsicElements` interface members.
    * When using components:
        * You can control which `class` must be inherited by components by customizing the default `interface ElementClass extends React.Component<any, any> { }` declaration.
        * You can control which property is used to type check the attributes (the default is `props`) by customizing the `declare module JSX { interface ElementAttributesProperty { props: {}; } }` declaration.

## `jsxFactory`

Passing `--jsxFactory <JSX factory Name>` along with `--jsx react` allows for using a different JSX factory from the default `React`.

The new factory name will be used to call `createElement` functions.

### Example

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

## `jsx` pragma

You can even specify a different `jsxFactory` per file using `jsxPragma` e.g. 


```js
/** @jsx jsxFactory */
import {jsxFactory} from "jsxFactory";

var div = <div>Hello JSX!</div>
```

With `--jsx react` this file will emit to use the factory specfied in the jsx pragma: 
```js
"use strict";
var jsxFactory_1 = require("jsxFactory");
var div = jsxFactory_1.jsxFactory.createElement("div", null, "Hello JSX!");
```
