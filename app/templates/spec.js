mocha.setup({ui: 'bdd', globals: ['script*', 'jQuery*']});

define([], function() {
    var expect = chai.expect;

    describe("<% _.slugify(appname) %> unit test", function () {

        describe('dummy test', function () {
            it("****** needs writing ********", function () {
                expect(undefined).to.exist
            });
        })
    })
})