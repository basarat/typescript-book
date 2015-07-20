## Binder
Most JavaScript transpilers out there are simpler than TypeScript in that they provide little in the way of code analysis. The typical JavaScript transpilers only have the following flow:

```ts
SourceCode ~~Scanner~~> Tokens ~~Parser~~> AST ~~Emitter~~> JavaScript
```

While the above architecture is true as a simplified understand of TypeScript js generation, a key feature of TypeScript is its *Semantic* system. In order to assist type checking (performed by `checker`), the `binder` (in `binder.ts`) is used to connect the various parts of the source code into a coherent type system that can then be used by the `checker`. The main responsibility of the binder is to create the _Symbols_.

### Symbol
Symbols connect declaration nodes in the AST to other declarations contributing to the same entity. Symbols are the basic building block of the Semantic system. The symbol constructor is defined in `core.ts` (and `binder` actually uses the `objectAllocator.getSymbolConstructor` to get its hands on it). Here is the contructor:

```ts
function Symbol(flags: SymbolFlags, name: string) {
    this.flags = flags;
    this.name = name;
    this.declarations = undefined;
}
```

`SymbolFlags` is a flag enum and is really used to identify additional classifications of the symbol (e.g the scope of a variable flags `FunctionScopedVariable` or `BlockScopedVariable` or others)

### Usage by Checker
The binder is actually used internally by the type checker. The simplified call stack looks like:
```
program.getTypeChecker ->
    ts.createTypeChecker (in checker)->
        initializeTypeChecker (in checker) ->
            for each SourceFile `ts.bindSourceFile` (in binder)
            // followed by
            for each SourceFile `ts.mergeSymbolTable` (in checker)
```
The binder doesn't contain much internal state of its own and can be thought of as just a bunch of function located in `binder.ts` that are driven by `checker.ts`.
