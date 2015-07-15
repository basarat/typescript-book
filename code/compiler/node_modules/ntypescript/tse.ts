// This transpiles the file and then executes it
/// <reference path="./bin/typescriptServices.d.ts"/>
var t: typeof ts = require('./bin/typescript.js');
var node = process.argv[0];
var script = process.argv[2];
// Remove `tse` from the argv
process.argv = [node].concat(process.argv.slice(2));

if (!script) {
    process.exit(0);
}

// Register globally:
import register = require("./register");


import vm = require('vm');
import fs = require('fs');
import path = require('path');
var jsContent = t.transpile(fs.readFileSync(script, 'utf8'));

// https://github.com/jashkenas/coffeescript/blob/master/lib/coffee-script/command.js#L114 
// `compilePath` triggered because of `opts.run`
// Then : https://github.com/jashkenas/coffeescript/blob/342b395b0a7c135dfea1fe5f66fa536794d114fe/src/coffee-script.coffee#L109

// Assign paths for node_modules loading
var dir = fs.realpathSync('.');
var mainModule = require.main;
mainModule.paths = require('module')._nodeModulePaths(dir);
mainModule._compile(jsContent, mainModule.filename);


