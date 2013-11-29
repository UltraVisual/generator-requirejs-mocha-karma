(function () {

	var tests = [];
	for (var file in window.__karma__.files) {
		if (window.__karma__.files.hasOwnProperty(file)) {
			if (/\/base\/.+\.spec.js/.test(file)) {
				tests.push(file);
			}
		}
	}

	require.config({
		baseUrl: '/base/development/',
		paths: {
			'chai': '../test/spec/lib/chai',
			'sinon': '../test/spec/lib/sinon',
			'sinon-chai': '../test/spec/lib/sinon-chai'
		},

		deps: ['chai', 'sinon', 'sinon-chai'],

		shim: {
			sinon: {
				exports: 'sinon'
			}
		},

		callback: function (chai, sinon, sinonChai) {
			window.chai = chai;
			window.assert = chai.assert;
			window.expect = chai.expect;

			chai.use(sinonChai);
			window.sinon = sinon;

			require(tests, window.__karma__.start);
		}
	})
})();