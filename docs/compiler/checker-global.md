### Global Namespace Merging
Within `initializeTypeChecker` the following code exists:

```ts
// Initialize global symbol table
forEach(host.getSourceFiles(), file => {
    if (!isExternalModule(file)) {
        mergeSymbolTable(globals, file.locals);
    }
});
```

Which basically merges all the `global` symbols into the `let globals: SymbolTable = {};` (in `createTypeChecker`) SymbolTable. `mergeSymbolTable` primarily calls `mergeSymbol`.
