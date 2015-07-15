var ts = require("ntypescript");
function printAllChildren(node, depth) {
    if (depth === void 0) { depth = 0; }
    console.log(new Array(depth + 1).join('----'), ts.syntaxKindToName(node.kind), node.pos, node.end);
    depth++;
    node.getChildren().forEach(function (c) { return printAllChildren(c, depth); });
}
var sourceCode = "\nvar foo = 123;\n".trim();
var sourceFile = ts.createSourceFile('foo.ts', sourceCode, 1, true);
printAllChildren(sourceFile);
