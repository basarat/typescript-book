## Program

### Usage of `CompilerHost`
Its interaction mechanism with the OE:

`Program` *-uses->* `CompilerHost` *-uses->* `System`

The reason for having a `CompilerHost` as a point of indirection is that it allows it's interface to be more finely tuned for `Program` needs and not bother with OE needs (e.g. the `Program` doesn't care about `fileExists` a function provided by `System`).

There are other users of `System` as well (e.g. tests).

### SourceFile

* `SyntaxKind.SourceFile`
* `interface SourceFile`.

The `program` consists of a bunch of source files. A `sourceFile` is actually a top-level AST node as well (`SyntaxKind.SourceFile`). Instances implement `interface SourceFile`.
