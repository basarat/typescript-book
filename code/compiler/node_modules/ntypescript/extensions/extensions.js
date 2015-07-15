var ts;
(function (ts) {
    function syntaxKindToName(kind) {
        return ts.SyntaxKind[kind];
    }
    ts.syntaxKindToName = syntaxKindToName;
})(ts || (ts = {}));
if (typeof global !== "undefined") {
    global.ts = ts;
}
if (typeof window !== "undefined") {
    window.ts = ts;
}
