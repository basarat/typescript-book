# globals.d.ts

We discussed *global* vs. *file* modules when covering [projects](./modules.md) and recommended using file based modules and not polluting the global namespace.

Nevertheless, if you have beginning TypeScript developers you can give them a `globals.d.ts` file to put interfaces / types in the global namespace to make it easy to have some *types* just *magically* available for consumption in *all* your TypeScript code.

> For any code that is going to generate *JavaScript* we highly recommend using *file modules*.

* `globals.d.ts` is great for adding extensions to `lib.d.ts` if you need to.
* It's good for quick `declare module "some-library-you-dont-care-to-get-defs-for";` when doing TS to JS migrations.
