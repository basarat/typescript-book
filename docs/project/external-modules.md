## External modules
There is a lot of power and usability packed into the TypeScript external module pattern. Here we discuss its power and some patterns needed to reflect real world usages.

### File lookup
The following statement:

```ts
import foo = require('foo');
```

tells the TypeScript compiler to look for an external module declaration of the form:

```ts
declare module "foo" {
    // Some variable declarations

    export var bar: number; /*sample*/
}
```
An import with a relative path e.g.:

```ts
import foo = require('./foo');
```
tells the TypeScript compiler to look for a TypeScript file at the relative location `./foo.ts` or `./foo.d.ts` with respect to the current file.

This is not the complete specification but it's a decent mental model to have and use. We will cover the gritty details later.

### Compiler Module Option
The following statement:

```ts
import foo = require('foo');
```

will generate *different* JavaScript based on the compiler *module* option (`--module commonjs` or `--module amd` or `--module umd` or `--module system`).

Personal recommendation: use `--module commonjs` and then your code will work as it is for Node.js and for frontend you can use something like `webpack`.

### Import type only
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
The key advantage of using `import/require` instead of just `var/require` is that you get file path completion / checking / goto definition navigation etc.

[](// TODO: es6 modules)
