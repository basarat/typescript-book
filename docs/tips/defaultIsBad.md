## `export default` concerns

Consider you have a file `foo.ts` with the following contents:

```ts
class Foo {
}
export default Foo;
```

You would import it (in `bar.ts`) using ES6 syntax as follows:

```ts
import Foo from "./foo";
```

There are a few maintainability concerns here:
* If you refactor `Foo` in `foo.ts` it will not rename it in `bar.ts`.
* If you end up needing to export more stuff from `foo.ts` (which is what many of your files will have) then you have to juggle the import syntax.

For this reason I recommend simple exports + destructured import. E.g. `foo.ts`:

```ts
export class Foo {
}
```
And then:

```ts
import { Foo } from "./foo";
```

Below I also present a few more reasons.

### Poor Discoverability
Discoverability is very poor for default exports. You cannot explore a module with intellisense to see if it has a default export or not.

With export default you get nothing here (maybe it does export default / maybe it doesn't `¯\_(ツ)_/¯`):
```
import /* here */ from 'something';
```

Without export default you get a nice intellisense here: 

```
import { /* here */ } from 'something';
```

### Autocomplete 
Irrespective of if you know about the exports, you even autocomplete at this `import {/*here*/} from "./foo";` cursor location. Gives your developers a bit of wrist relief.

### CommonJS interop
With `default` there is horrible experience for commonJS users who have to `const {default} = require('module/foo');` instead of `const {Foo} = require('module/foo')`. You will most likely want to rename the `default` export to something else when you import it.

### Typo Protection
You don't get typos like one dev doing `import Foo from "./foo";` and another doing `import foo from "./foo";`

### TypeScript auto-import
Auto import quickfix works better. You use `Foo` and auto import will write down `import { Foo } from "./foo";` cause its a well defined name exported from a module. Some tools out there will try to magic read and *infer* a name for a default export but magic is flaky.

### Re-exporting
Re-exporting is common for the root `index` file in npm packages, and forces you to name the default export manually e.g. `export { default as Foo } from "./foo";` (with default) vs. `export * from "./foo"` (with named exports).

### Dynamic Imports
Default exports expose themselves badly named as `default` in dynamic `import`s e.g. 

```ts
const HighCharts = await import('https://code.highcharts.com/js/es-modules/masters/highcharts.src.js');
HighCharts.default.chart('container', { ... }); // Notice `.default`
```

Much nicer with named exports: 

```ts
const {HighCharts} = await import('https://code.highcharts.com/js/es-modules/masters/highcharts.src.js');
HighCharts.chart('container', { ... }); // Notice `.default`
```


### Needs two lines for non-class / non-function

Can be one statement for function / class e.g. 

```ts
export default function foo() {
}
```

Can be one statement for *non named / type annotated* objects e.g.: 

```ts
export default {
  notAFunction: 'Yeah, I am not a function or a class',
  soWhat: 'The export is now *removed* from the declaration'
};
```

But needs two statements otherwise:
```ts
// If you need to name it (here `foo`) for local use OR need to annotate type (here `Foo`)
const foo: Foo = {
  notAFunction: 'Yeah, I am not a function or a class',
  soWhat: 'The export is now *removed* from the declaration'
};
export default foo;
```
