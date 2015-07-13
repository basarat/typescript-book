var fs = require("fs");
var vm = require("vm");
function makeTsGlobal(typescriptServices) {
    var sandbox = {
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
    global.ts = sandbox.ts;
}
exports.makeTsGlobal = makeTsGlobal;
makeTsGlobal();
function syntaxKindToName(kind) {
    return ts.SyntaxKind[kind];
}
exports.syntaxKindToName = syntaxKindToName;
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
    var name = syntaxKindToName(token);
    console.log(name);
    token = scanner.scan();
}
