## Сканер (Scanner)
Вихідний код сканера TypeScript повністю знаходиться у файлі `scanner.ts`. Сканер *контролюється* внутрішньо `парсером` для перетворення вихідного коду в AST. Ось бажаний результат.

```
SourceCode ~~ scanner ~~> Token Stream ~~ parser ~~> AST
```

### Використання парсером
У файлі `parser.ts` створено `сканер` (як *сінглтон*), щоб уникнути витрат на створення сканерів знову і знову. Цей сканер потім *запускається* синтаксичним аналізатором на вимогу за допомогою функції `initializeState`.

Нижче наведено *спрощену* версію коду синтаксичного аналізатора, яку ви можете запустити для демонстрації цієї концепції:

`code/compiler/scanner/runScanner.ts`
```ts
import * as ts from "ntypescript";

// TypeScript has a singleton scanner
const scanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ true);

// That is initialized using a function `initializeState` similar to
function initializeState(text: string) {
    scanner.setText(text);
    scanner.setOnError((message: ts.DiagnosticMessage, length: number) => {
        console.error(message);
    });
    scanner.setScriptTarget(ts.ScriptTarget.ES5);
    scanner.setLanguageVariant(ts.LanguageVariant.Standard);
}

// Sample usage
initializeState(`
var foo = 123;
`.trim());

// Start the scanning
var token = scanner.scan();
while (token != ts.SyntaxKind.EndOfFileToken) {
    console.log(ts.formatSyntaxKind(token));
    token = scanner.scan();
}
```

У результаті буде виведено наступне:

```
VarKeyword
Identifier
FirstAssignment
FirstLiteralToken
SemicolonToken
```

### Стан сканера (Scanner State)
Після виклику `scan` сканер оновлює свій локальний стан (позицію у скануванні, поточні дані токенів тощо). Сканер надає набір утиліт для отримання поточного стану сканера. У наведеному нижче прикладі ми створюємо сканер, а потім використовуємо його для ідентифікації токенів, а також їх позицій у коді.

`code/compiler/scanner/runScannerWithPosition.ts`
```ts
// Sample usage
initializeState(`
var foo = 123;
`.trim());

// Start the scanning
var token = scanner.scan();
while (token != ts.SyntaxKind.EndOfFileToken) {
    let currentToken = ts.formatSyntaxKind(token);
    let tokenStart = scanner.getStartPos();
    token = scanner.scan();
    let tokenEnd = scanner.getStartPos();
    console.log(currentToken, tokenStart, tokenEnd);
}
```

У результаті буде виведено наступне:
```
VarKeyword 0 3
Identifier 3 7
FirstAssignment 7 9
FirstLiteralToken 9 13
SemicolonToken 13 14
```

### Самостійний сканер (Standalone scanner)
Незважаючи на те, що парсер TypeScript має сінглтон сканера, ви також можете створити самостійний сканер, використовуючи `createScanner`, і використовувати його методи `setText`/`setTextPos` для сканування різних частин файлу на ваш розсуд або задоволення. 

