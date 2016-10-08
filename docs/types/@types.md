# `@types`

[Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) is definitely one of TypeScript's greatest strengths. The community has effectively gone ahead and **documented** the nature of nearly 90% of the top JavaScript projects out there.

This means that you can use these projects in a very interactive an exploratory manner, no need to have the docs open in a seperate window and making sure you don't make a typo.

## Using `@types`

Installation is fairly simple as it just works on top of `npm`. So as an example you can install type definitions for `jquery` simply as :

```
npm install @types/jquery --save-dev
```

`@types` supports both *global* and *module* type definitions.


### Global `@types`

After installation, to use a type definition globally you simply add it to your tsconfig.json e.g. to use jquery

```
{
    "compilerOptions": {
        "types": [
            "jquery"
        ]
    }
}
```

Now you should be able to use `$` or `jQuery` *globally* in your project.

> Alternatively, if you don't include it in tsconfig.json, you can use it only in particular files simply by adding `/// <reference types="jquery" />` to the top of that file. (I personally don't do this).

For *libraries* I generally recommend using *modules*:

### Module `@types`

After installation, no special configuration required really. You just use it like a module e.g.

```
import * as $ from "jquery";

// Use $ at will in this module :)
```
