# Convenience vs. Soundness

There are a few things that TypeScript prevents you from doing out of the box e.g using a variable that *isn't ever declared* (of course you can use a *declaration file* for external systems).

That said, traditionally programming languages have a hard boundary between what is and isn't allowed by the type system. TypeScript is different in that it gives you control on where you put the slider. This is really to allow you to use the JavaScript you know and love with as much safety as **you** want. There are lot of compiler options to control exactly this slider so let's have a look.


### Boolean Options

`compilerOptions` that are `boolean` can be specified as `compilerOptions` in `tsconfig.json`:

```json
{
    "compilerOptions": {
        "someBooleanOption": true
    }
}
```

or on the command line

```sh
tsc --someBooleanOption
```

> All of these are `false` by default.

Click [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to see all compiler options.
