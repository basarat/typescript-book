/*
 * ntypescript
 * https://github.com/basarat/ntypescript
 *
 * Copyright (c) 2015 Basarat Syed
 * Licensed under the MIT license.
 */
var path = require("path");
function gruntPlugin(grunt) {
    grunt.registerMultiTask('ntypescript', 'TypeScript grunt plugin', function () {
        var options = {
            project: '.',
        };
        options = this.options(options);
        if (!options.project) {
            console.error('tsconfig must be specified using options');
            return false;
        }
        var project = path.resolve(options.project);
        var args = [__dirname + '/../bin/tsc', '-p', project];
        var done = this.async();
        grunt.util.spawn({
            cmd: process.execPath,
            args: args
        }, function (error, result, code) {
            console.log(result.stdout || result.stderr);
            done(!code);
        });
    });
}
;
module.exports = gruntPlugin;
