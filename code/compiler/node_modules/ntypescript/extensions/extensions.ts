module ts {
    export function syntaxKindToName(kind: ts.SyntaxKind): string {
        return (<any>ts).SyntaxKind[kind];
    }
}
if (typeof global !== "undefined") {
    (global as any).ts = ts;
}
if (typeof window !== "undefined") {
    (window as any).ts = ts;
}
