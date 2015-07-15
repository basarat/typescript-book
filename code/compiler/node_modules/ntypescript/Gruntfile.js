module.exports = function(grunt) {

    grunt.initConfig({
        ntypescript: {
            options: {
                project: '.'
            },
            default: {},
            pass: {
                options: {
                    project: './tests/grunt/pass'
                }
            },
            fail: {
                options: {
                    project: './tests/grunt/fail'
                }
            },
        },
    });

    grunt.loadTasks('tasks');
    // They would do:
    // grunt.loadNpmTasks('ntypescript');

    grunt.registerTask('default', ['ntypescript:default']);
};