## Синтаксичний аналізатор (Parser)
Вихідний код синтаксичного аналізатора TypeScript повністю знаходиться у файлі `parser.ts`. Сканер *керується* зсередини `Parser` для перетворення вихідного коду в AST. Нижче наведено огляд бажаного результату.

```
SourceCode ~~ scanner ~~> Token Stream ~~ parser ~~> AST
```

Парсер реалізований як сінглтон (аналогічні причини, як у `scanner`, не хочемо перестворювати його, якщо можемо повторно ініціалізувати). Фактично він реалізований як `namespace Parser`, який містить *state* (змінні стану) для парсера, а також сінглтон `scanner`. Як зазначалося раніше, він містить `const scanner`. Функції парсера керують цим сканером.

### Використання програмою
Синтаксичний аналізатор опосередковано керується програмою (опосередковано, оскільки насправді він керується `CompilerHost`, про який ми згадували раніше). По суті, це спрощений стек викликів:

```
Program ->
    CompilerHost.getSourceFile ->
        (global function parser.ts).createSourceFile ->
            Parser.parseSourceFile
```

Функція `parseSourceFile` не лише встановлює стан для парсера, але й встановлює стан для сканера, викликаючи функцію `initializeState`. Потім він продовжує розбір вихідного файлу за допомогою `parseSourceFileWorker`.

### Приклад використання
Перш ніж ми заглибимося у внутрішню роботу синтаксичного аналізатора, наведемо приклад коду, який використовує парсер TypeScript для отримання AST вихідного файлу (за допомогою `ts.createSourceFile`), а потім виводить його на друк.

`code/compiler/parser/runParser.ts`
```ts
import * as ts from "ntypescript";

function printAllChildren(node: ts.Node, depth = 0) {
    console.log(new Array(depth + 1).join('----'), ts.formatSyntaxKind(node.kind), node.pos, node.end);
    depth++;
    node.getChildren().forEach(c=> printAllChildren(c, depth));
}

var sourceCode = `
var foo = 123;
`.trim();

var sourceFile = ts.createSourceFile('foo.ts', sourceCode, ts.ScriptTarget.ES5, true);
printAllChildren(sourceFile);
```

У результаті буде виведено наступне:

```ts
SourceFile 0 14
---- SyntaxList 0 14
-------- VariableStatement 0 14
------------ VariableDeclarationList 0 13
---------------- VarKeyword 0 3
---------------- SyntaxList 3 13
-------------------- VariableDeclaration 3 13
------------------------ Identifier 3 7
------------------------ FirstAssignment 7 9
------------------------ FirstLiteralToken 9 13
------------ SemicolonToken 13 14
---- EndOfFileToken 14 14
```

Це схоже на дерево, якщо ви нахиляєте голову вліво.
