## `export default` can lead to problems

Let's go with an example. Consider you have a file `foo.ts` with the following contents:

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
* If you refactor `Foo` in `foo.ts` it will not rename it in `bar.ts`
* If you end up needing to export more stuff from `foo.ts` (which is what many of your files will have) then you have to juggle the import syntax.

For this reason I recommend simple exports + destructured import. E.g. `foo.ts`:

```ts
export class Foo {
}
```
And then:

```ts
import {Foo} from "./foo";
```


> **Bonus points**: You even get autocomplete at this `import {/*here*/} from "./foo";` cursor location. Gives your developers a bit of wrist relief.

> **Bonus points**: Better commonJs experience. With `default` there is horrible experience for commonjs users who have to `const {default} = require('module/foo');` instead of `const {Foo} = require('module/foo')`
