## Program

Defined in `program.ts`. The compilation context ([a concept we covered previously](../project/compilation-context.md)) is represented within the TypeScript compiler as a `Program`. It consists of `SourceFile`s and compiler options.


### Usage of `CompilerHost`
Its interaction mechanism with the OE:

`Program` *-uses->* `CompilerHost` *-uses->* `System`

The reason for having a `CompilerHost` as a point of indirection is that it allows its interface to be more finely tuned for `Program` needs and not bother with OE needs (e.g. the `Program` doesn't care about `fileExists` a function provided by `System`).

There are other users of `System` as well (e.g. tests).

### SourceFile

The program provides an API to get the Source Files `getSourceFiles(): SourceFile[];`. Each is represented as a root-level node for an AST (called `SourceFile`).
