var spawn = require('child_process').spawn;
var rjsConfig = require('./require.json');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: '<json:package.json>',

        requirejs: {
            compile: {
                options: rjsConfig
            }
        },

        csso: {
            main: {
                options: {
                    restructure: true
                },
                files: [
                    {src: 'production/styles/style.css', dest: 'production/styles/style.css'}
                ]
            }
        }
    })

    grunt.registerTask('install', 'Install client packages.', function () {
        var bower = spawn('./node_modules/.bin/bower', ['install'])
        bower.stdout.pipe(process.stdout)
        bower.stderr.pipe(process.stderr)
        bower.on('exit', this.async())
    })

    grunt.loadNpmTasks('grunt-contrib-requirejs')

    grunt.registerTask('default', ['requirejs', 'test'])
}
