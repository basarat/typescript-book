## Barrel

A barrel is a way to rollup exports from several modules into a single convenient module. The barrel itself is a module file that re-exports selected exports of other modules.

Imagine the following class structure in a library: 

```ts
// demo/foo.ts
export class Foo {}

// demo/bar.ts
export class Bar {}

// demo/baz.ts
export class Baz {}
```

Without a barrel, a consumer would need three import statements:

```ts
import { Foo } from '../demo/foo';
import { Bar } from '../demo/bar';
import { Baz } from '../demo/baz';
```

You can instead add a barrel `demo/index.ts` containing the following: 

```ts
// demo/index.ts
export * from './foo'; // re-export all of its exports
export * from './bar'; // re-export all of its exports
export * from './baz'; // re-export all of its exports
```

Now the consumer can import what it needs from the barrel:

```ts
import { Foo, Bar, Baz } from '../demo'; // demo/index.ts is implied
```

### Named exports
Instead of exporting `*`, you can choose to export the module in a name. E.g., assume that `baz.ts` has functions:

```ts
// demo/foo.ts
export class Foo {}

// demo/bar.ts
export class Bar {}

// demo/baz.ts
export function getBaz() {}
export function setBaz() {}
```

If you would rather not export `getBaz` / `setBaz` from demo you can instead put them in a variable by importing them in a name and exporting that name as shown below: 

```ts
// demo/index.ts
export * from './foo'; // re-export all of its exports
export * from './bar'; // re-export all of its exports

import * as baz from './baz'; // import as a name
export { baz }; // export the name
```

And now the consumer would look like: 

```ts
import { Foo, Bar, baz } from '../demo'; // demo/index.ts is implied

// usage
baz.getBaz();
baz.setBaz();
// etc. ...
```
