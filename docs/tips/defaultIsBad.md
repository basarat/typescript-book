## `export default` can lead to problems

Lets go with an example. Consider you have a file `foo.ts` with the following contents:

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


> Bonus points: You even get autocomplete at this cursor location
```ts
import {/*here*/} from "./foo";
```
