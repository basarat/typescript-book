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
initializeState("\nvar foo = 123;\n");
var token = scanner.scan();
while (token != 1) {
    console.log(ts.syntaxKindToName(token));
    token = scanner.scan();
}
