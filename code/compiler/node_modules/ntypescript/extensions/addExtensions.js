var fs = require('fs');
var EOL = require('os').EOL;
function readFile(filePath) {
    return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
function writeFile(filePath, content) {
    fs.writeFileSync(__dirname + '/' + filePath, content);
}
var dtsWithGlobal = readFile('../bin/typescriptServices.d.ts');
var dtsExtensionsGlobal = readFile('./extensions.d.ts');
var jsOriginal = readFile('../bin/typescript.js');
var jsExtensions = readFile('./extensions.js');
var finalDtsLocation = '../bin/ntypescript.d.ts';
var finalJsLocation = '../bin/ntypescript.js';
var finalDtsContent = dtsWithGlobal + EOL + dtsExtensionsGlobal + EOL + "\ndeclare module \"ntypescript\" {\n    export = ts;\n}\n";
var finalJsContent = jsOriginal + EOL + jsExtensions;
writeFile(finalDtsLocation, finalDtsContent);
writeFile(finalJsLocation, finalJsContent);
