'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore');


module.exports = ConsolePluginGenerator;

function ConsolePluginGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.mainJsFile = '';

  this.on('end', function () {
    console.log('\nI\'m all done. Just run ' + 'npm install'.bold.yellow + ' to install the required dependencies.');
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

util.inherits(ConsolePluginGenerator, yeoman.generators.NamedBase);

ConsolePluginGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    name: 'includeRequireJS',
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
    this.includeRequireJS = (/y/i).test(props.includeRequireJS);

    cb();
  }.bind(this));
};

ConsolePluginGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

ConsolePluginGenerator.prototype.mocha = function mocha() {
  this.directory('test', 'test');
  this.template('spec.js', 'test/spec/' + this.appname.replace("console-plugin-", "") + '.spec.js')
};

ConsolePluginGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

ConsolePluginGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

ConsolePluginGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_component.json', 'development/component.json');
};

ConsolePluginGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

ConsolePluginGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

ConsolePluginGenerator.prototype.requirejs = function requirejs() {
  this.template('require.json', 'require.json')
};

ConsolePluginGenerator.prototype.plugin = function plugin() {
  this.mkdir('development');
  this.mkdir('development/styles');
  this.mkdir('development/templates');
  this.mkdir('development/lib');
  this.template('plugin.js', 'development/' + this.appname + '.js')
};
