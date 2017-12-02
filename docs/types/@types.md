# `@types`

[Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped) is definitely one of TypeScript's greatest strengths. The community has effectively gone ahead and **documented** the nature of nearly 90% of the top JavaScript projects out there.

This means that you can use these projects in a very interactive and exploratory manner, no need to have the docs open in a seperate window and making sure you don't make a typo.

## Using `@types`

Installation is fairly simple as it just works on top of `npm`. So as an example you can install type definitions for `jquery` simply as:

```
npm install @types/jquery --save-dev
```

`@types` supports both *global* and *module* type definitions.


### Global `@types`

By default any definitions that support global consumption are included automatically. E.g. for `jquery` you should be able to just start using `$` *globally* in your project.

However for *libraries*  (like `jquery`) I generally recommend using *modules*:

### Module `@types`

After installation, no special configuration is required really. You just use it like a module e.g.:

```ts
import * as $ from "jquery";

// Use $ at will in this module :)
```

## Controlling Globals

As can be seen having a definition that supports global leak in automatically can be a problem for some team so you can chose to *explicitly* only bring in the types that make sense using the `tsconfig.json` `compilerOptions.types` e.g.:

```json
{
    "compilerOptions": {
        "types" : [
            "jquery"
        ]
    }
}
```

The above shows a sample where only `jquery` will be allowed to be used. Even if the person installs another definition like `npm install @types/node` its globals (e.g. [`process`](https://nodejs.org/api/process.html)) will not leak into your code until you add them to the `tsconfig.json` types option.
