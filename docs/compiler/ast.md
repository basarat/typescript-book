## Node
The basic building block of the Abstract Syntax Tree (AST). In general a `Node` represents non-terminals in the language grammar; however, some terminals are kept in the tree such as identifiers and literals.

Two key things make up an AST node's documentation. The node's `SyntaxKind` which identifies its type within the AST, and its `interface`, the API the node provides when instantiated into the AST.

Here are a few key `interface Node` members:
* `TextRange` members that identify the node's `start` and `end` in the source file.
* `parent?: Node` the parent of the node in the AST.

There are other additional members for `Node` flags and modifiers etc. that you can lookup by searching `interface Node` in the source code but the ones we mentioned are vital for node traversal.

## SourceFile

* `SyntaxKind.SourceFile`
* `interface SourceFile`.

Each `SourceFile` is a top-level AST node that is contained in the `Program`.
