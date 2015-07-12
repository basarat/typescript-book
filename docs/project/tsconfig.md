### Basic
It is extremely easy to get started with tsconfig.json as the basic file you need is:
```json
{}
```
i.e. an empty JSON file at the *root* of your project. This way TypeScript will include *all* the `.ts` files in this directory (and sub directories) as a part of the compilation context. It will also select a few sane default compiler options.

### compilerOptions
You can customize the compiler options using `compilerOptions`.

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "declaration": false,
        "noImplicitAny": false,
        "removeComments": true,
        "noLib": false
    }
}
```

These (and more) compiler options will be discussed later.

### TypeScript compiler
Good IDEs come with built in support for on the fly `ts` to `js` compilation. If however you want to run the TypeScript compiler manually from the command line when using `tsconfig.json` you can do it in a few ways.
* Just run `tsc` and it will look for `tsconfig.json` in the current as well as all parent folders till it finds it.
* Run `tsc -p ./path-to-project-directory`. Of course the path can be a complete or relative to the current directory.

You can even start the TypeScript compiler in *watch* mode using `tsc -w` and it will watch your TypeScript project files for changes.
