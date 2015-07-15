/// <reference path="./bin/typescriptServices.d.ts"/>
var t = require('./bin/typescript.js');
var node = process.argv[0];
var script = process.argv[2];
process.argv = [node].concat(process.argv.slice(2));
if (!script) {
    process.exit(0);
}
var fs = require('fs');
var jsContent = t.transpile(fs.readFileSync(script, 'utf8'));
var dir = fs.realpathSync('.');
var mainModule = require.main;
mainModule.paths = require('module')._nodeModulePaths(dir);
mainModule._compile(jsContent, mainModule.filename);
