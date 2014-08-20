'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

    initializing: function() {
        this.ucFirst = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        this.log(this.yeoman);
        this.log('This is FatB generator, the jQuery plugin scaffolding tool:');
    },

    prompting: function () {
        var done = this.async();

        var prompts = [{
            type      : 'input',
            name      : 'name',
            message   : 'Name',
            default   : this.appname.replace(/\s/g, '-') // Default to current folder name
        },{
            type      : 'input',
            name      : 'title',
            message   : 'Title',
            default   : this.ucFirst(this.appname)
        },{
            type      : 'input',
            name      : 'description',
            message   : 'Description',
            default   : 'This plugin provides functionality to ...'
        },{
            type      : 'input',
            name      : 'authorName',
            message   : 'Author\'s Name',
            default   : 'Martin Jezek'
        },{
            type      : 'input',
            name      : 'authorEmail',
            message   : 'Author\'s Email',
            default   : 'info@martin-jezek.com'
        },{
            type      : 'list',
            name      : 'private',
            message   : 'Private',
            default   : 0,
            choices   : [{
                name  : 'true',
                value : true
            },{
                name  : 'false',
                value : false
            }]
        },{
            type      : 'input',
            name      : 'repository',
            message   : 'Repository',
            default   : 'git@github.com:<USER>/<REPO>.git'
        },{
            type      : 'input',
            name      : 'homepage',
            message   : 'Homepage',
            default   : 'https://github.com/<USER>/<REPO>'
        },{
            type      : 'input',
            name      : 'bugs',
            message   : 'Bugs',
            default   : 'https://github.com/<USER>/<REPO>/issues'
        },{
            type      : 'list',
            name      : 'licenseType',
            message   : 'License Type',
            default   : 0,
            choices   : [{
                name  : 'MIT',
                value : 'MIT'
            },{
                name  : 'GPL',
                value : 'GPL'
            },{
                name  : 'Apache',
                value : 'Apache'
            }]
        },{
            type      : 'input',
            name      : 'licenseUrl',
            message   : 'License URL',
            default   : 'https://raw.githubusercontent.com/<USER>/<REPO>/master/LICENSE'
        }];

        this.prompt(prompts, function (answers) {
            this.answers = answers;
            this.answers.name = this.answers.name.replace(/\s/g, '-');
            this.answers.nameUcFirst = this.ucFirst(this.answers.name);
            this.answers.nameUpperCase = this.answers.name.toUpperCase();
            this.answers.year = new Date().getFullYear().toString();
            done();
        }.bind(this));
    },

    writing: function() {
        // demo
        this.mkdir('demo');
        this.mkdir('demo/01-default');
        this.mkdir('demo/01-default/js');
        this.mkdir('demo/01-default/css');
        this.mkdir('demo/01-default/img');
        this.template('demo/01-default/index.html', 'demo/01-default/index.html', this.answers);
        this.template('demo/01-default/js/main.js', 'demo/01-default/js/main.js', this.answers);
        this.copy('demo/01-default/css/style.css', 'demo/01-default/css/style.css');

        // dist
        this.mkdir('dist');

        // src
        this.mkdir('src');
        this.mkdir('src/js');
        this.template('src/js/plugin.js', 'src/js/' + this.answers.name + '.js', this.answers);

        // test
        this.mkdir('test');
        this.template('test/plugin.js', 'test/' + this.answers.name + '.js', this.answers);

        // configs, dot files, etc
        this.template('package.json', 'package.json', this.answers);
        this.template('bower.json', 'bower.json', this.answers);
        this.template('README.md', 'README.md', this.answers);
        this.template('LICENSE', 'LICENSE', this.answers);
        this.copy('Gruntfile.js', 'Gruntfile.js');
        this.copy('CHANGELOG.md', 'CHANGELOG.md');
        this.copy('.sublime-project', '.sublime-project');
        this.copy('.jshintrc', '.jshintrc');
        this.copy('.npmignore', '.gitignore'); // fix issue with auto-renaming on publish
        this.copy('.gitattributes', '.gitattributes');
        this.copy('.editorconfig', '.editorconfig');
        this.copy('.bowerrc', '.bowerrc');
    },

    install: function() {
        this.installDependencies();
    }

});
