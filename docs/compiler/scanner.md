## Scanner
The source code for the TypeScript scanner is located entirely in `scanner.ts`. Scanner is *controlled* internally by the `Parser` to convert the source code to an AST. Here is what the desired outcome is.

```
SourceCode ~~ scanner ~~> Token Stream ~~ parser ~~> AST
```

### Usage by Parser
There is a *singleton* `scanner` created in `parser.ts` to avoid the cost of creating scanners over and over again. This scanner is then *primed* by the parser on demand using the `initializeState` function.

Here is a *simplied* version of the actual code in the parser that you can run demonstrating this concept:

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

This will print out the following :

```
VarKeyword
Identifier
FirstAssignment
FirstLiteralToken
SemicolonToken
```

### Scanner State
After you call `scan` the scanner updates its local state (position in the scan, current token details etc). The scanner provides a bunch of utility functions to get the current scanner state. In the below sample we create a scanner and then use it to identify the tokens as well as their positions in the code.

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

This will print out the following:
```
VarKeyword 0 3
Identifier 3 7
FirstAssignment 7 9
FirstLiteralToken 9 13
SemicolonToken 13 14
```

### Standalone scanner
Even though the TypeScript parser has a singleton scanner you can create a standalone scanner using `createScanner` and use its `setText`/`setTextPos` to scan at different points in a file for your amusement.
