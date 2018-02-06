## External modules
There is a lot of power and usability packed into the TypeScript external module pattern. Here we discuss its power and some patterns needed to reflect real world usages.

### Clarification: commonjs, amd, es modules, others

First up we need to clarify the (awful) inconsistency of the module systems out there. I'll just give you my *current* recommendation and remove the noise i.e. not show you all the *other* ways things can work.

From the *same TypeScript* you can generate different *JavaScript* depending upon the `module` option. Here are things you can ignore (I am not interested in explaining dead tech):

* AMD: Do not use. Was browser only.
* SystemJS: Was a good experiment. Superseded by ES modules.
* ES Modules: Not ready yet.

Now these are just the options for *generating the JavaScript*. Instead of these options use `module:commonjs`

How you *write* TypeScript modules is also a bit of a mess. Again here is how not to do it *today*:

* `import foo = require('foo')`. i.e. `import/require`. Use ES module syntax instead.

Cool, with that out of the way, lets look at the ES module syntax.

> Summary: Use `module:commonjs` and use the ES module syntax to import / export / author modules.

### ES Module syntax

* Exporting a variable (or type) is as easy as prefixing the keyword `export` e.g.

```js
// file `foo.ts`
export let someVar = 123;
export type SomeType = {
  foo: string;
};
```

* Exporting a variable or type in a dedicated `export` statement e.g.

```js
// file `foo.ts`
let someVar = 123;
type SomeType = {
  foo: string;
};
export {
  someVar,
  SomeType
};
```
* Exporting a variable or type in a dedicated `export` statement *with renaming* e.g.

```js
// file `foo.ts`
let someVar = 123;
export { someVar as aDifferentName };
```

* Import a variable or a type using `import` e.g.

```js
// file `bar.ts`
import { someVar, SomeType } from './foo';
```

* Import a variable or a type using `import` *with renaming* e.g.

```js
// file `bar.ts`
import { someVar as aDifferentName } from './foo';
```

* Import everything from a module into a name with `import * as` e.g.
```js
// file `bar.ts`
import * as foo from './foo';
// you can use `foo.someVar` and `foo.SomeType` and anything else that foo might export.
```

* Import a file *only* for its side effect with a single import statement:

```js
import 'core-js'; // a common polyfill library
```

* Re-Exporting all the items from another module

```js
export * from './foo';
```

* Re-Exporting only some items from another module

```js
export { someVar } from './foo';
```

* Re-Exporting only some items from another module *with renaming*

```js
export { someVar as aDifferentName } from './foo';
```

### Default exports/imports
As you will learn later, I am not a fan of default exports. Neverthless here is syntax for export and using default exports

* Export using `export default`
  * before a variable (no `let / const / var` needed)
  * before a function
  * before a class

```js
// some var
export default someVar = 123;
// OR Some function
export default function someFunction() { }
// OR Some class
export default class SomeClass { }
```

* Import using the `import someName from "someModule"` syntax (you can name the import whatever you want) e.g.

```js
import someLocalNameForThisFile from "../foo";
```

### Module paths

> I am just going to assume `moduleResolution: commonjs`. This is the option you should have in your TypeScript config. This setting is implied automatically by `module:commonjs`.

There are two distinct kinds of modules. The distinction is driven by the path section of the import statment (e.g. `import foo from 'THIS IS THE PATH SECTION'`).

* Relative path modules (where path starts with `.` e.g. `./someFile` or `../../someFolder/someFile` etc.)
* Other dynamic lookup modules (e.g. `'core-js'` or `'typestyle'` or `'react'` or even `'react/core'` etc.)

The main difference is *how the module is resolved on the file system*.

> I will use a conceptual term *place* that I will explain after mentioning the lookup pattern.

#### Relative path modules
Easy, just follow the relative path :) e.g.

* if file `bar.ts` does `import * as foo from './foo';` then place `foo` must exist in the same folder.
* if file `bar.ts` does `import * as foo from '../foo';` then place `foo` must exist in a folder up.
* if file `bar.ts` does `import * as foo from '../someFolder/foo';` then one folder up, there must be a folder `someFolder` with a place `foo`

Or any other relative path you can think of :)

#### Dynamic lookup

When the import path is *not* relative, lookup is driven by [*node style resolution*](https://nodejs.org/api/modules.html#modules_all_together). Here I only give a simple example:

* You have `import * as foo from 'foo'`, the following are the places that are checked *in order*
  * `./node_modules/foo`
  * `../node_modules/foo`
  * `../../node_modules/foo`
  * Till root of file system

* You have `import * as foo from 'something/foo'`, the following are the places that are checked *in order*
  * `./node_modules/something/foo`
  * `../node_modules/something/foo`
  * `../../node_modules/something/foo`
  * Till root of file system


### What is *place*
When I say *places that are checked* I mean that the following things are checked in that place. e.g. for a place `foo`:

* If the place is a file, e.g. `foo.ts`, hurray!
* else if the place is a folder and there is a file `foo/index.ts`, hurray!
* else if the place is a folder and there a `foo/package.json` and there is a file specified in the `types` key in the package.json that exists, then hurray!
* else if the place is a folder and there a `package.json` and there is a file specified in the `main` key in the package.json that exists, then hurray!

By file I actually mean `.ts` / `.d.ts` and `.js`.

And that's it. You are now module lookup experts (not a small feat!).

### Overturning dynamic lookup *just for types*
You can declare a module *globally* for your project by using `declare module 'somePath'` and then imports will resolve *magically* to that path

e.g.
```ts
// globals.d.ts
declare module 'foo' {
  // Some variable declarations
  export var bar: number; /*sample*/
}
```

and then:
```ts
// anyOtherTsFileInYourProject.ts
import * as foo from 'foo';
// TypeScript assumes (without doing any lookup) that
// foo is {bar:number}

```

### `import/require` for importing type only
The following statement:

```ts
import foo = require('foo');
```

actually does *two* things:

* Imports the type information of the foo module.
* Specifies a runtime dependency on the foo module.

You can pick and choose so that only *the type information* is loaded and no runtime dependency occurs. Before continuing you might want to recap the [*declaration spaces*](../project/declarationspaces.md) section of the book.

If you do not use the imported name in the variable declaration space then the import is completely removed from the generated JavaScript. This is best explained with examples. Once you understand this we will present you with use cases.

#### Example 1
```ts
import foo = require('foo');
```
will generate the JavaScript:

```js

```
That's right. An *empty* file as foo is not used.

#### Example 2
```ts
import foo = require('foo');
var bar: foo;
```
will generate the JavaScript:
```js
var bar;
```
This is because `foo` (or any of its properties e.g. `foo.bas`) is never used as a variable.

#### Example 3
```ts
import foo = require('foo');
var bar = foo;
```
will generate the JavaScript (assuming commonjs):
```js
var foo = require('foo');
var bar = foo;
```
This is because `foo` is used as a variable.


### Use case: Lazy loading
Type inference needs to be done *upfront*. This means that if you want to use some type from a file `foo` in a file `bar` you will have to do:

```ts
import foo = require('foo');
var bar: foo.SomeType;
```
However you might want to only load the file `foo` at runtime under certain conditions. For such cases you should use the `import`ed name only in *type annotations* and **not** as a *variable*. This removes any *upfront* runtime dependency code being injected by TypeScript. Then *manually import* the actual module using code that is specific to your module loader.

As an example, consider the following `commonjs` based code where we only load a module `'foo'` on a certain function call:

```ts
import foo = require('foo');

export function loadFoo() {
    // This is lazy loading `foo` and using the original module *only* as a type annotation
    var _foo: typeof foo = require('foo');
    // Now use `_foo` as a variable instead of `foo`.
}
```

A similar sample in `amd` (using requirejs) would be:
```ts
import foo = require('foo');

export function loadFoo() {
    // This is lazy loading `foo` and using the original module *only* as a type annotation
    require(['foo'], (_foo: typeof foo) => {
        // Now use `_foo` as a variable instead of `foo`.
    });
}
```

This pattern is commonly used:
* in web apps where you load certain JavaScript on particular routes,
* in node applications where you only load certain modules if needed to speed up application bootup.

### Use case: Breaking Circular dependencies

Similar to the lazy loading use case certain module loaders (commonjs/node and amd/requirejs) don't work well with circular dependencies. In such cases it is useful to have *lazy loading* code in one direction and loading the modules upfront in the other direction.

### Use case: Ensure Import

Sometimes you want to load a file just for the side effect (e.g. the module might register itself with some library like [CodeMirror addons](https://codemirror.net/doc/manual.html#addons) etc.). However if you just do a `import/require` the transpiled JavaScript will not contain a dependency on the module and your module loader (e.g. webpack) might completely ignore the import. In such cases you can use a `ensureImport` variable to ensure that the compiled JavaScript takes a dependency on the module e.g.:

```ts
import foo = require('./foo');
import bar = require('./bar');
import bas = require('./bas');
const ensureImport: any =
    foo
    || bar
    || bas;
```
