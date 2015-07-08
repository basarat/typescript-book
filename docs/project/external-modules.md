## External modules
There is a lot of power and usability packed into the TypeScript external module pattern. Here we discuss its power and some patterns needed to reflect real world usages.

### File lookup
The following statement: 

```ts
import foo = require('foo');
```

Tells the TypeScript compiler to look for an external module declaration of the form: 

```ts
declare module "foo" {
    /// Some variable declarations
    
    export var bar:number; /*sample*/
}
``` 
An import with a relative path e.g.: 

```ts
import foo = require('./foo');
```
Tells the TypeScript compiler to look for a TypeScript file at the relative location `./foo.ts` or `./foo.d.ts` with respect to the current file.

This is not the complete specification but its a decent mental model to have and use.

### Compiler Module Option
The following statement:

```ts
import foo = require('foo');
```

will generate *different* JavaScript based on the compiler *module* option (`--module commonjs` or `--module amd` or `--module umd` or `--module system`).

Here is how to chose which one is right for you: 

* Want the package on [NPM](http://npmjs.com) : `--module commonjs`
* Only want to use the code in the browser : `--module amd`
* Want to deploy the code on NPM *and* use it in the browser *without* any dependency on something (like *requirejs*, *webpack* or *browserify* etc). : `--module umd`
* Ready for the promised future of a *truly unified* and ECMA approved module system : `--module system`

I recommend that for new projects you just use `--module system`. But it is good to be aware of this compiler option.

### Import type only
The following statement:

```ts
import foo = require('foo');
```

actually imports *two* things: 
* The type information from the imported file.
* Takes are runtime dependency on the `foo` module.

You can pick and choose so that only *the type information* is loaded and no runtime dependency occurs. Before continuing you might want to recap the [*declaration spaces*](../project/declarationspaces.md) section of the book.

If you do not use the imported name in the variable declaration space then the import is completely removed from the generated JavaScript. This is best explained with examples. Once you understand this we will present you with use cases.

#### Example 1
```ts
import foo = require('foo');
```
will generate the JavaScript: 

```js

```
Thats right. An *empty* file as foo is not used.

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

As an example, consider the following `commonjs` based code where we only load a module `'foo'` on a certain function call

```ts
import foo = require('foo');

export function loadFoo(){
    // This is lazy loading `foo` and using the original module *only* as a type annotation
    var _foo: typeof foo = require('foo');
    // Now use `_foo` as a variable instead of `foo`.
}
```

A similar sample in `amd` (using requirejs) would be: 
```ts
import foo = require('foo');

export function loadFoo(){
    // This is lazy loading `foo` and using the original module *only* as a type annotation
    require(['foo'], (_foo: typeof foo) => {
        // Now use `_foo` as a variable instead of `foo`.    
    });
}
```

This pattern is commonly used:
* in web apps where you load certain JavaScript on particular routes 
* in node applications where you only load certain modules if needed to speed up application bootup.

### Use case: Breaking Circular dependencies

Similar to the lazy loading use case certain module loaders (commonjs/node and amd/requirejs) don't work well with circular dependencies. In such cases it is useful to have *lazy loading* code in one direction and loading the modules upfront in the other direction.

[](// TODO: es6 modules)

{% include "footer.md" %}