var ts = require("ntypescript");
var scanner = ts.createScanner(2, true);
function initializeState(text) {
    scanner.setText(text);
    scanner.setOnError(function (message, length) {
        console.error(message);
    });
    scanner.setScriptTarget(1);
    scanner.setLanguageVariant(0);
}
initializeState("\nvar foo = 123;\n".trim());
var token = scanner.scan();
while (token != 1) {
    var currentToken = ts.syntaxKindToName(token);
    var tokenStart = scanner.getStartPos();
    token = scanner.scan();
    var tokenEnd = scanner.getStartPos();
    console.log(currentToken, tokenStart, tokenEnd);
}
