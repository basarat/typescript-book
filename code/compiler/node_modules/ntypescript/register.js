/// <reference path="./bin/typescriptServices.d.ts"/>
var t = require('./bin/typescript.js');
var fileExtension = ['.ts', '.tsx'];
exports.isTypeScript = function (file) { return /\.(ts|tsx)$/.test(file); };
var fs = require('fs');
function loadFile(module, filename) {
    var js = t.transpile(fs.readFileSync(filename, 'utf8'));
    module._compile(js, filename);
}
exports.loadFile = loadFile;
if (require.extensions) {
    for (var _i = 0; _i < fileExtension.length; _i++) {
        var ext = fileExtension[_i];
        require.extensions[ext] = loadFile;
    }
}
var child_process = require('child_process');
if (child_process) {
    var fork = child_process.fork;
    var binary = require.resolve('./bin/tse');
    child_process.fork = function (path, args, options) {
        if (exports.isTypeScript(path)) {
            if (!Array.isArray(args)) {
                options = args || {};
                args = [];
            }
            args = [path].concat(args);
            path = binary;
        }
        fork(path, args, options);
    };
}
