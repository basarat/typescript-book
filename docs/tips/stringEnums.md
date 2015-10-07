## String enums

Sometimes you need a collection of strings collected under a common key. TypeScript does have enum support but [it is `number` based](../enums.md). You can create something similar that is string based quite easily using a variable definition, e.g.:

```ts
let Tristate = {
    False : '',
    True: '',
    Unknown: ''
};

// make values same as keys
Object.keys(Tristate).map((key) => Tristate[key] = key);
```

Because of TypeScript's inference engine only the provided members are accessible (e.g. `Tristate.False`,`Tristate.True`,`Tristate.Unknown` in our case) and the next line makes the values the same as the keys (so that you don't have typo's and refactoring the key automatically changes the value).

You can use such an enum as follows:

```ts
// Assigning
let state = Tristate.True;

// Checking if it matches
if (state === Tristate.True) {

}

```
This is just a pattern to :
* reduce your reliance on magic strings, and provides easy documentation about all supported values for a particular variable.
* make strings less brittle, if you choose to refactor a member all instances will get refactored (or error).

> One thing missing from this is a good type annotation. Sadly at the moment it needs to be `: string`, however in practice it hasn't been a big issue.
