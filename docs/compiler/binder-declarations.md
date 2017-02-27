### Symbols and Declarations
Linking between a `node` and a `symbol` is performed by a few functions. One function that is used to bind the `SourceFile` node to the source file Symbol (in case of an external module) is the `addDeclarationToSymbol` function

Note : the `Symbol` for an external module source file is setup as `flags : SymbolFlags.ValueModule` and `name: '"' + removeFileExtension(file.fileName) + '"'`).

```ts
function addDeclarationToSymbol(symbol: Symbol, node: Declaration, symbolFlags: SymbolFlags) {
    symbol.flags |= symbolFlags;

    node.symbol = symbol;

    if (!symbol.declarations) {
        symbol.declarations = [];
    }
    symbol.declarations.push(node);

    if (symbolFlags & SymbolFlags.HasExports && !symbol.exports) {
        symbol.exports = {};
    }

    if (symbolFlags & SymbolFlags.HasMembers && !symbol.members) {
        symbol.members = {};
    }

    if (symbolFlags & SymbolFlags.Value && !symbol.valueDeclaration) {
        symbol.valueDeclaration = node;
    }
}
```

The important linking portions:
* Creates a link to the Symbol from the AST node (`node.symbol`).
* Adds the node as *one of* the declarations of the Symbol (`symbol.declarations`).

#### Declaration
Declaration is just a `node` with an optional name. In `types.ts`

```ts
interface Declaration extends Node {
    _declarationBrand: any;
    name?: DeclarationName;
}
```
