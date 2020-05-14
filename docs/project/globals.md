# global.d.ts

We discussed *global* vs. *file* modules when covering [projects](./modules.md) and recommended using file based modules and not polluting the global namespace.

Nevertheless, if you have beginner TypeScript developers you can give them a `global.d.ts` file to put interfaces / types in the global namespace to make it easy to have some *types* just *magically* available for consumption in *all* your TypeScript code.

Another use case for a `global.d.ts` file is to declare compile-time constants that are being injected into the source code by Webpack via the standard [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) plugin.

```ts
declare const BUILD_MODE_PRODUCTION: boolean; // can be used for conditional compiling
declare const BUILD_VERSION: string;
```

> For any code that is going to generate *JavaScript* we highly recommend using *file modules*, and only use `global.d.ts` to declare compile-time constants and/or to extend standard type declarations declared in `lib.d.ts`.

* Bonus: The `global.d.ts` file is also good for quick `declare module "some-library-you-dont-care-to-get-defs-for";` when doing JS to TS migrations.
