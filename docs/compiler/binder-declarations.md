### Символи та декларації
Посилання між `node` та `symbol` встановлюється за допомогою кількох функцій. Одна з таких функцій, яка використовується для зв'язку між вузлом `SourceFile` та символом вихідного файлу (у випадку зовнішнього модуля), - це функція `addDeclarationToSymbol`.

Примітка: `Symbol` для вихідного файлу зовнішнього модуля встановлюється як `flags : SymbolFlags.ValueModule` та `name: '"' + removeFileExtension(file.fileName) + '"'`).

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

Важливі сполучні частини:
* Створює посилання на символ з вузла AST (`node.symbol`).
* Додає вузол як *одну з* декларацій символу (`symbol.declarations`).

#### Декларація
Декларація у `types.ts` це лише `node` із необов’язковим ім’ям.

```ts
interface Declaration extends Node {
    _declarationBrand: any;
    name?: DeclarationName;
}
```
