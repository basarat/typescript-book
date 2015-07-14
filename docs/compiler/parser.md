## Parser
The sourcecode for the TypeScript parser is located entirely in `parser.ts`. Scanner is *controlled* internally by the `Parser` to convert the source code to an AST. Here is a review of what the desired outcome is.

```
SourceCode ~~ scanner ~~> Token Stream ~~ parser ~~> AST
```

The parser is implemented as a singleton (similar reasons to `scanner`, don't want to recreate it if we can reinit it). It is actually implemented as `namespace Parser` which contains *state* variables for the Parser as well as a singleton `scanner`. As mentioned before it contains a `const scanner`. The parser functions manage this scanner.

### Usage by program
Parser is driven indirectly by Program (indirectly as its actually by `CompilerHost` which we mentioned previously). Basically this is the simplified call stack: 

```
Program -> 
    CompilerHost.getSourceFile -> 
        (global function parser.ts).createSourceFile -> 
            Parser.parseSourceFile
```

The `parseSourceFile` not only primes the state for the Parser but also primes the state for the `scanner` by calling `initializeState`. It then goes on to parse the source file using `parseSourceFileWorker`. 

### `parseSourceFileWorker`

Starts by creating a `SourceFile` AST node. Then it goes into top down parsing starting from the `parseStatements` function. It then completes the `SourceFile` node with additional information such as its `nodeCount`, `identifierCount` and such.

### `parseStatements`
It switches by the the current `token` returned from the scanner. E.g. if the current token is a `SemicolonToken` it will call out to `parseEmptyStatement` to create an AST node for an empty statement. 