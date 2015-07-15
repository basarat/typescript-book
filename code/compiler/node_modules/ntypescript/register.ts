/// <reference path="./bin/typescriptServices.d.ts"/>
var t: typeof ts = require('./bin/typescript.js');

/** Determine if a filename represents a TypeScript file. */
var fileExtension = ['.ts', '.tsx'];
export var isTypeScript = (file) => /\.(ts|tsx)$/.test(file);

/** Load and runt TypeScript for Node */
import fs = require('fs');
export function loadFile(module, filename) {
    var js = t.transpile(fs.readFileSync(filename,'utf8'));
    module._compile(js, filename);
}

/** If the installed version of Node supports require.extensions, register TypeScript as an extension. */
if (require.extensions) {
    for (var ext of fileExtension) {
        require.extensions[ext] = loadFile;
    }
}

/** If we’re on Node, patch child_process.fork so that TypeScript is able to fork both TypeScript files, and JavaScript files, directly. */
import child_process = require('child_process');
if (child_process) {
    var {fork} = child_process;
    var binary = require.resolve('./bin/tse');
    child_process.fork = <any>function(path, args?, options?) {
        if (isTypeScript(path)) {
            if (!Array.isArray(args)) {
                options = args || {}
                args = []
            }
            args = [path].concat(args)
            path = binary
        }
        fork(path, args, options)
    }
}