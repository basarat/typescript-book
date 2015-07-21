### Checker error reporting
The checker uses the local `error` function to report errors. Here is the function:

```ts
function error(location: Node, message: DiagnosticMessage, arg0?: any, arg1?: any, arg2?: any): void {
    let diagnostic = location
        ? createDiagnosticForNode(location, message, arg0, arg1, arg2)
        : createCompilerDiagnostic(message, arg0, arg1, arg2);
    diagnostics.add(diagnostic);
}
```
