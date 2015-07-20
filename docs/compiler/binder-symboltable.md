### SymbolTable 

Its implemented as a simple HashMap. Here is the interface (`types.ts`): 

```ts
interface SymbolTable {
    [index: string]: Symbol;
}
```

SymbolTables as initialized by binding. There are a few SymbolTables used by the compiler. 

On `Node`: 
```ts
locals?: SymbolTable;                   // Locals associated with node
```

On `Symbol`: 

```ts
members?: SymbolTable;                  // Class, interface or literal instance members
exports?: SymbolTable;                  // Module exports
```

#### `locals`
We saw locals getting initialized by `bindChildren` based on `ContainerFlags`. Here's how it gets populated: 

