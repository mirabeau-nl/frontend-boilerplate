var gulp = require('gulp');

// Load vars from .env files into ENV
require('dotenv').load({ silent: true });

// Load tasks
require('./tasks/clean');
require('./tasks/browsersync');
require('./tasks/html');
require('./tasks/img');
require('./tasks/css');
require('./tasks/js');
require('./tasks/upload');
require('./tasks/githooks');
require('./tasks/zip');

gulp.task('dev', [
    'clean',
    'browsersync',
    'html-watch',
    'img-watch',
    'css-watch',
    'js-watch'
]);

gulp.task('dist', [
    'clean',
    'html-compile',
    'img-optimize',
    'css-compile',
    'js-transpile'
], function() { gulp.start(['zip']); });

gulp.task('test', [
    'js-lint',
    'css-lint'
]);

gulp.task('upload', [
    'file-upload'
]);
