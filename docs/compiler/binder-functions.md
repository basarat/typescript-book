### Binder function
Two critical binder functions are `bindSourceFile` and `mergeSymbolTable`. We will take a look at these next.

#### `bindSourceFile`
Basically checks if the `file.locals` is defined, if not it hands over to `bind`.

Note: `locals` is defined on `Node` and is of type `SymbolTable`. Note that `SourceFile` is also a `Node` (in fact a root node in the AST).

#### `bind`