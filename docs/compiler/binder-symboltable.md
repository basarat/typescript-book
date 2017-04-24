### SymbolTable

SymbolTable is implemented as a simple HashMap. Here is the interface (`types.ts`):

```ts
interface SymbolTable {
    [index: string]: Symbol;
}
```

SymbolTables are initialized by binding. There are a few SymbolTables used by the compiler:

On `Node`:
```ts
locals?: SymbolTable;                   // Locals associated with node
```

On `Symbol`:

```ts
members?: SymbolTable;                  // Class, interface or literal instance members
exports?: SymbolTable;                  // Module exports
```

Note: We saw `locals` getting initialized (to `{}`) by `bindChildren` based on `ContainerFlags`.

#### SymbolTable population
SymbolTables are populated with `Symbols` primarily by a call to `declareSymbol`. This function is presented below in entirety:

```ts
/**
 * Declares a Symbol for the node and adds it to symbols. Reports errors for conflicting identifier names.
 * @param symbolTable - The symbol table which node will be added to.
 * @param parent - node's parent declaration.
 * @param node - The declaration to be added to the symbol table
 * @param includes - The SymbolFlags that node has in addition to its declaration type (eg: export, ambient, etc.)
 * @param excludes - The flags which node cannot be declared alongside in a symbol table. Used to report forbidden declarations.
 */
function declareSymbol(symbolTable: SymbolTable, parent: Symbol, node: Declaration, includes: SymbolFlags, excludes: SymbolFlags): Symbol {
    Debug.assert(!hasDynamicName(node));

    // The exported symbol for an export default function/class node is always named "default"
    let name = node.flags & NodeFlags.Default && parent ? "default" : getDeclarationName(node);

    let symbol: Symbol;
    if (name !== undefined) {

        // Check and see if the symbol table already has a symbol with this name.  If not,
        // create a new symbol with this name and add it to the table.  Note that we don't
        // give the new symbol any flags *yet*.  This ensures that it will not conflict
        // with the 'excludes' flags we pass in.
        //
        // If we do get an existing symbol, see if it conflicts with the new symbol we're
        // creating.  For example, a 'var' symbol and a 'class' symbol will conflict within
        // the same symbol table.  If we have a conflict, report the issue on each
        // declaration we have for this symbol, and then create a new symbol for this
        // declaration.
        //
        // If we created a new symbol, either because we didn't have a symbol with this name
        // in the symbol table, or we conflicted with an existing symbol, then just add this
        // node as the sole declaration of the new symbol.
        //
        // Otherwise, we'll be merging into a compatible existing symbol (for example when
        // you have multiple 'vars' with the same name in the same container).  In this case
        // just add this node into the declarations list of the symbol.
        symbol = hasProperty(symbolTable, name)
            ? symbolTable[name]
            : (symbolTable[name] = createSymbol(SymbolFlags.None, name));

        if (name && (includes & SymbolFlags.Classifiable)) {
            classifiableNames[name] = name;
        }

        if (symbol.flags & excludes) {
            if (node.name) {
                node.name.parent = node;
            }

            // Report errors every position with duplicate declaration
            // Report errors on previous encountered declarations
            let message = symbol.flags & SymbolFlags.BlockScopedVariable
                ? Diagnostics.Cannot_redeclare_block_scoped_variable_0
                : Diagnostics.Duplicate_identifier_0;
            forEach(symbol.declarations, declaration => {
                file.bindDiagnostics.push(createDiagnosticForNode(declaration.name || declaration, message, getDisplayName(declaration)));
            });
            file.bindDiagnostics.push(createDiagnosticForNode(node.name || node, message, getDisplayName(node)));

            symbol = createSymbol(SymbolFlags.None, name);
        }
    }
    else {
        symbol = createSymbol(SymbolFlags.None, "__missing");
    }

    addDeclarationToSymbol(symbol, node, includes);
    symbol.parent = parent;

    return symbol;
}
```

Which SymbolTable is populated is driven by the first argument to this function. e.g. when adding a declaration to a *container* of kind `SyntaxKind.ClassDeclaration` or `SyntaxKind.ClassExpression` the function `declareClassMember` will get called which has the following code:

```ts
function declareClassMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
    return node.flags & NodeFlags.Static
        ? declareSymbol(container.symbol.exports, container.symbol, node, symbolFlags, symbolExcludes)
        : declareSymbol(container.symbol.members, container.symbol, node, symbolFlags, symbolExcludes);
}
```
