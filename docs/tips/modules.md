# External module tips
There is a lot of power and usability packed into the TypeScript external module pattern. Here we discuss its power and some patterns needed to reflect real world usages.

## File lookup
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

## Compiler Module Option
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

## Pick and choose 
The following statement:

```ts
import foo = require('foo');
```

actually imports *two* things: 
* The type information from the imported file.
* Takes are runtime dependency on the `foo` module.

You can pick and choose so that only *one* of these things happen. Before continuing you might want to recap the *declaration spaces* section of the book.

## Import type only

If you do not use the 

## Lazy loading


// TODO: es6 modules

{% include "footer.md" %}