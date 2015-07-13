import * as fs from "fs";
import * as vm from "vm";
export function makeTsGlobal(typescriptServices?: string) {
    var sandbox = {
        // This is going to gather the ts module exports
        ts: {},
        console: console,
        require: require,
        module: module,
        process: process
    };
    vm.createContext(sandbox);

    vm.runInContext(fs.readFileSync(__dirname + '/src/types.js').toString(), sandbox);
    vm.runInContext(fs.readFileSync(__dirname + '/src/core.js').toString(), sandbox);
    vm.runInContext(fs.readFileSync(__dirname + '/src/diagnosticInformationMap.generated.js').toString(), sandbox);
    vm.runInContext(fs.readFileSync(__dirname + '/src/scanner.js').toString(), sandbox);

    // Finally export ts to the local global namespace
    (global as any).ts = sandbox.ts;
}
makeTsGlobal();
export function syntaxKindToName(kind: ts.SyntaxKind) {
    return (<any>ts).SyntaxKind[kind];
}

// TypeScript has a singelton scanner
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
`);

// Start the scanning
var token = scanner.scan();
while (token != ts.SyntaxKind.EndOfFileToken) {
    var name = syntaxKindToName(token);
    console.log(name);
    token = scanner.scan();
}
