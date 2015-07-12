## Node
The basic building block of the Abstract Syntax Tree (AST). In general node represent non-terminals in the language grammar; some terminals are kept in the tree such as identifiers and literals.

## Note on AST description
Two key things make up an AST node definition. Its `SyntaxKind` which identifies it within the AST and its `interface`, the API the node provides  when instantiated for the AST.

## SourceFile

* `SyntaxKind.SourceFile`
* `interface SourceFile`.

Each `SourceFile` is a top-level AST node that is contained in the `Program`.
