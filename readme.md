# Console Plugin Generator

Generator for html5 console plugins.

## Requirements
To use this generator you will need to have Yeoman, Node.js and NPM installed. You can do so through Homebrew.

	brew install node
	sudo npm install -g yeoman

## Usage

Create a directory with the name you want the plugin to be called and change in to it.

	mkdir foobar
	cd foobar

Install the generator in the new directory.

	npm install git+ssh://gitosis@git.dev.gamesys.corp:generator-console-plugin.git

Generate a new plugin.

	yo console-plugin