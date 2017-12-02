# TypeScript Module Resolution

TypeScript's module resolution tries to model and support the real world modules systems / loaders there (commonjs/nodejs, amd/requirejs, ES6/systemjs etc.). The most simplest lookup is relative file path lookup. After that things become a bit complex *because of the nature of magical module loading done by various module loaders*.

## File Extensions

You import modules like `foo` or `./foo`. For any file path lookup TypeScript automatically checks for a `.ts` or `.d.ts` or `.tsx` or `.js` (optionally) or `.jsx` (optionally) file in the right order depending upon context. You should **not** provide a file extension with the module name (no `foo.ts`, just `foo`).

## Relative File Module

An import with a relative path e.g.:

```ts
import foo = require('./foo');
```

Tells the TypeScript compiler to look for a TypeScript file at the relative location e.g. `./foo.ts` with respect to the current file. There is no further magic to this kind of import. Of course it can be a longer path e.g. `./foo/bar/bas` or `../../../foo/bar/bas` just like any other *relative paths* you are used to on disk.

## Named Module

The following statement:

```ts
import foo = require('foo');
```

Tells the TypeScript compiler to look for an external module in the following order:

* A named [module declaration](#module-declaration) from a file already in the compilation context.
* If still not resolved and you are compiling with `--module commonjs`  or have set `--moduleResolution node` then its looked up using the [*node modules*](#node-modules) resolution algorithm.
* If still not resolved and you provided `baseUrl` (and optionally `paths`) then the [*path substitutions*](#path-substitutions) resolution algorithm kicks in.

Note that `"foo"` can be a longer path string e.g. `"foo/bar/bas"`. The key here is that *it does not start with `./` or `../`*.

## Module Declaration

A module declaration looks like:

```ts
declare module "foo" {

    /// Some variable declarations

    export var bar:number; /*sample*/
}
```

This makes the module `"foo"`, *importable*.

## Node Modules
The node module resolution is actually pretty much the same one used by Node.js / NPM ([official nodejs docs](https://nodejs.org/api/modules.html#modules_all_together)). Here is a simple mental model I have:

* module `foo/bar` will resolve to some file : `node_modules/foo` (the module) + `foo/bar`

## Path Substitutions

TODO.

[//Comment1]:https://github.com/Microsoft/TypeScript/issues/2338
[//Comment2]:https://github.com/Microsoft/TypeScript/issues/5039
[//Comment3ExampleRedirectOfPackageJson]:https://github.com/Microsoft/TypeScript/issues/8528#issuecomment-219172026
[//Coment4ModuleResolutionInHandbook]:https://github.com/Microsoft/TypeScript-Handbook/blob/release-2.0/pages/Module%20Resolution.md#base-url
