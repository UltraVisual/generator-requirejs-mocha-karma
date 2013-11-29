'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore');


module.exports = YeomanGenerator;

function YeomanGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.mainJsFile = '';

  this.on('end', function () {
    console.log('\nI\'m all done. Just run npm install to install the required dependencies.');
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

util.inherits(YeomanGenerator, yeoman.generators.NamedBase);

YeomanGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'devFolderName',
    message: 'Would you like to include RequireJS (for AMD support)?',
    default: 'Y/n',
    warning: 'Yes: RequireJS will be placed into the JavaScript vendor directory.'
  }];

  var prompts = [];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    //this.compassBootstrap = (/y/i).test(props.compassBootstrap);
    this.devFolderName = (/y/i).test(props.devFolderName);

    cb();
  }.bind(this));
};

YeomanGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

YeomanGenerator.prototype.mocha = function mocha() {
  this.directory('test', 'test');
  this.template('spec.js', 'test/spec/' + this.appname + '.spec.js')
};

YeomanGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

YeomanGenerator.prototype.karmaConfig = function karmaConfig() {
  this.template('_karma.conf.js', 'karma.conf.js');
};

YeomanGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

YeomanGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_component.json', 'development/component.json');
};

YeomanGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

YeomanGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

YeomanGenerator.prototype.requirejs = function requirejs() {
  this.template('require.json', 'require.json')
};

YeomanGenerator.prototype.plugin = function plugin() {
  this.mkdir('development');
  this.mkdir('development/styles');
  this.mkdir('development/templates');
  this.mkdir('development/lib');
  this.template('main.js', 'development/' + this.appname + '.js')
};
