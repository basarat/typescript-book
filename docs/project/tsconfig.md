## Compilation Context
All of these spaces tie into a *compilation context*. The compilation context is basically just a fancy term for grouping of the files that TypeScript will parse and analyze to determine what is valid and what isn't. A great way to define this logical grouping (some people like to use the term *project*) is using a `tsconfig.json` file.


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

{% include "footer.md" %}
