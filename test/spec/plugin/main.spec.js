mocha.setup({ui: 'bdd', globals: ['script*', 'jQuery*']});

define(function(require, exports, module) {
    var expect = chai.expect
    var Sandbox = require('sandbox-mock');

    describe("plugin plugin", function () {
        var sandbox;
        before(function (done) {
            sandbox = new Sandbox({
                id:'plugin',
                name:'plugin',
                config:{},
                location:'plugin.js'
            })
            sandbox.once('loaded', function (obj) {
                sandbox = obj
                done()
            })
        })

        describe('Plugin', function () {
            it("Creates a plugin object once initiated", function () {
                expect(sandbox).to.exist
            });
        })
    })
})