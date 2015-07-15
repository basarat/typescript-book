/*
 * ntypescript
 * https://github.com/basarat/ntypescript
 *
 * Copyright (c) 2015 Basarat Syed
 * Licensed under the MIT license.
 */

import * as path from "path";

function gruntPlugin(grunt) {
    grunt.registerMultiTask('ntypescript', 'TypeScript grunt plugin', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = {
            project: '.',
        };
        options = this.options(options);

        if (!options.project) {
            console.error('tsconfig must be specified using options');
            return false;
        }

        const project: string = path.resolve(options.project);
        const args = [__dirname + '/../bin/tsc', '-p', project];
        // console.log(args); // Debug

        var done = this.async();
        grunt.util.spawn({
            cmd: process.execPath,
            args: args
        }, (error, result, code: number) => {
            console.log(result.stdout || result.stderr);
            done(!code);
        });
    });
};

export = gruntPlugin;