# globals.d.ts

We discussed *global* vs. *file* modules when covering [projects](../project/modules.md) and recommended using file based modules and not polluting the global namespace.

Nevertheless it is convenient to have *some* files just with type declarations (for smaller projects preferably one called `globals.d.ts`) in the global namespace to make it easy to have some *types* just *magically* available for consumption in *all* your TypeScript code. For any code that is going to generate *JavaScript* we still recommend using *file modules*.