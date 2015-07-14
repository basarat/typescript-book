var ntypescript_1 = require("ntypescript");
var scanner = ntypescript_1.createScanner(2, true);
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
    console.log(ntypescript_1.syntaxKindToName(token));
    token = scanner.scan();
}
