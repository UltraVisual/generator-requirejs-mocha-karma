var spawn = require('child_process').spawn;
var rjsConfig = require('./require.json');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg:'<json:package.json>',

        requirejs:{
            compile:{
                options:rjsConfig
            }
        },

        csso:{
            main:{
                options:{
                    restructure:true
                },
                files:[
                    {src:'production/styles/style.css', dest:'production/styles/style.css'}
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

    grunt.registerTask('run-tests', 'Run the spec tests.', function () {
        var runner = spawn('./node_modules/.bin/mocha-phantomjs', ['test/spec/runner.html'])
        runner.stdout.pipe(process.stdout)
        runner.stderr.pipe(process.stderr)
        runner.on('exit', this.async())
    })

    grunt.registerTask('enable-debug', 'Build in development mode.', function () {
        var rjsconfig = require('./require.json')
        rjsconfig.optimize = "none"
    })

    grunt.loadNpmTasks('grunt-contrib-requirejs')
    grunt.loadNpmTasks('grunt-console-plugin-mocks')

    grunt.registerTask('build', ['bower', 'requirejs', 'sandbox-css'])
    grunt.registerTask('build-dev', ['enable-debug', 'build'])
    grunt.registerTask('test-dev', ['build-dev', 'prepare-tests', 'run-tests'])
    grunt.registerTask('test', ['prepare-tests', 'run-tests'])
    grunt.registerTask('default', ['build', 'test'])
}
