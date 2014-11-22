'use strict';

var gulp            = require('gulp'),
    plugins         = {
        jshint      : require('gulp-jshint'),
        bump        : require('gulp-bump'),
        runSequence : require('run-sequence'),
        changelog   : require('conventional-changelog'),
        exec        : require('child_process').exec,
        argv        : require('yargs').argv,
        fs          : require('fs')
    };

require('./task/test')(gulp, plugins);
require('./task/release')(gulp, plugins);
