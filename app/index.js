'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

    initializing: function() {
        this.ucFirst = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };
        this.log(this.yeoman);
        this.log('This is a FatB generator, the jQuery plugin scaffolding tool:');
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
            message   : 'Author\'s Full Name',
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
        }];

        this.prompt(prompts, function (answers) {
            this.answers = answers;
            // create a camel cased name
            this.answers.nameCamelCased = '';
            var camelCaseNext = false;
            for (var x = 0; x < this.answers.name.length; x++) {
                var charAt = this.answers.name.charAt(x);
                if (charAt === '-') {
                    camelCaseNext = true;
                } else {
                    if (camelCaseNext) {
                        this.answers.nameCamelCased += charAt.toUpperCase();
                        camelCaseNext = false;
                    } else {
                        this.answers.nameCamelCased += charAt;
                    }
                }
            }
            this.answers.nameUcFirst = this.ucFirst(this.answers.nameCamelCased);
            this.answers.nameUpperCase = this.answers.name.replace(/[-]/g, ' ').toUpperCase();
            this.answers.year = new Date().getFullYear().toString();
            this.answers.repository = this.answers.authorName.toLowerCase().replace(/[\s]/g, '') + '/' + this.answers.name;
            done();
        }.bind(this));
    },

    writing: function() {

        // demo
        this.dest.mkdir('demo');
        this.dest.mkdir('demo/build');
        this.src.copy('demo/build/.npmignore', 'demo/build/.gitignore'); // fix issue with auto-renaming on publish
        this.dest.mkdir('demo/src');
        this.dest.mkdir('demo/src/jade');
        this.template('demo/src/jade/index.jade', 'demo/src/jade/index.jade', this.answers);
        this.dest.mkdir('demo/src/jade/partials');
        this.template('demo/src/jade/partials/head.jade', 'demo/src/jade/partials/head.jade', this.answers);
        this.template('demo/src/jade/partials/layout.jade', 'demo/src/jade/partials/layout.jade', this.answers);
        this.dest.mkdir('demo/src/js');
        this.template('demo/src/js/main.js', 'demo/src/js/main.js', this.answers);
        this.dest.mkdir('demo/src/sass');
        this.template('demo/src/sass/style.scss', 'demo/src/sass/style.scss', this.answers);

        // dist
        this.dest.mkdir('dist');
        this.src.copy('dist/.npmignore', 'dist/.gitignore'); // fix issue with auto-renaming on publish

        // src
        this.dest.mkdir('src');
        this.dest.mkdir('src/js');
        this.template('src/js/fatb.js', 'src/js/' + this.answers.name + '.js', this.answers);
        this.dest.mkdir('src/sass');
        this.template('src/sass/fatb.scss', 'src/sass/' + this.answers.name + '.scss', this.answers);

        // task
        this.dest.mkdir('task');
        this.src.copy('task/banner.js'  , 'task/banner.js');
        this.src.copy('task/connect.js' , 'task/connect.js');
        this.src.copy('task/default.js' , 'task/default.js');
        this.src.copy('task/demo.js'    , 'task/demo.js');
        this.src.copy('task/dist.js'    , 'task/dist.js');
        this.src.copy('task/jade.js'    , 'task/jade.js');
        this.src.copy('task/js.js'      , 'task/js.js');
        this.src.copy('task/release.js' , 'task/release.js');
        this.src.copy('task/sass.js'    , 'task/sass.js');
        this.src.copy('task/test.js'    , 'task/test.js');
        this.src.copy('task/watch.js'   , 'task/watch.js');

        // test
        this.dest.mkdir('test');
        this.template('test/fatb.js', 'test/' + this.answers.name + '.js', this.answers);

        // configs, dot files, etc
        this.src.copy('.bowerrc'        , '.bowerrc');
        this.src.copy('.editorconfig'   , '.editorconfig');
        this.src.copy('.gitattributes'  , '.gitattributes');
        this.src.copy('.jshintrc'       , '.jshintrc');
        this.src.copy('.npmignore'      , '.gitignore');
        this.src.copy('.sublime-project', '.sublime-project');
        this.src.copy('.travis.yml'     , '.travis.yml');
        this.template('bower.json'      , 'bower.json'  , this.answers);
        this.src.copy('CHANGELOG.md'    , 'CHANGELOG.md');
        this.src.copy('gulpfile.js'     , 'gulpfile.js');
        this.template('LICENSE'         , 'LICENSE'     , this.answers);
        this.template('package.json'    , 'package.json', this.answers);
        this.template('README.md'       , 'README.md'   , this.answers);
    },

    install: function() {
        this.installDependencies();
    }

});
