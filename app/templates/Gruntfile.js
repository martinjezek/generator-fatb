'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('bower.json'),
        banner: '/*!\n' +
                ' * Plugin: <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
                ' * Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                ' * License: <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
                ' */\n',
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['Gruntfile.js', 'test/**/*.js', 'src/**/*.js']
        },
        jasmine : {
            options: {
                specs: 'test/**/*.js',
                vendor: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/**/dist/**/*.min.js']
            },
            src: 'src/**/*.js'
        },
        clean: {
            dist: 'dist/*'
        },
        uglify: {
            options: {
                mangle: false,
                compress: false,
                report: 'min'
            },
            full: {
                options: {
                    beautify: true,
                    preserveComments: 'some'
                },
                expand: true,
                cwd: 'src/js/',
                src: ['*.js', '!*.min.js'],
                dest: 'dist/js/'
            },
            min: {
                options: {
                    beautify: false
                },
                expand: true,
                cwd: 'src/js/',
                src: ['*.js', '!*.min.js'],
                dest: 'dist/js/',
                ext: '.min.js'
            }
        },
        cssmin: {
            options: {
                report: 'min'
            },
            min: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },
        copy: {
            css: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/'
            },
            img: {
                expand: true,
                cwd: 'src/img/',
                src: ['**/*.png', '**/*.jpg', '**/*.gif'],
                dest: 'dist/img/'
            }
        },
        usebanner: {
            options: {
                banner: '<%= banner %>',
                position: 'top',
                linebreak: false
            },
            js: {
                src: 'dist/js/**/*.js'
            },
            css: {
                src: 'dist/css/**/*.css'
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg', 'bower'],
                commitMessage: 'chore: release v%VERSION%',
                commitFiles: ['-a'],
                tagName: 'v%VERSION%',
                push: false
            }
        },
        changelog: {
            options: {
                editor: 'subl -w -n'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-conventional-changelog');

    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('minify', ['test', 'clean', 'uglify', 'cssmin', 'copy',]);

    // end-point tasks
    grunt.registerTask('dist', ['minify', 'usebanner']);
    grunt.registerTask('release', function(version) {
        grunt.task.run([
            'minify',
            'bump-only:' + ((version === undefined) ? 'patch' : version),
            'usebanner',
            'changelog',
            'bump-commit'
        ]);
    });
};
