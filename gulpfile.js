var gulp = require('gulp');

// Load vars from .env files into ENV
require('dotenv').load();

// Load tasks
var taskClean       = require('./tasks/clean');
var taskBrowsersync = require('./tasks/browsersync');
var tasksHTML       = require('./tasks/html');
var tasksImages     = require('./tasks/img');
var tasksCSS        = require('./tasks/css');
var tasksJS         = require('./tasks/js');
var tasksUpload     = require('./tasks/upload');
var tasksGithooks   = require('./tasks/githooks');

// Clean dist/ folder
gulp.task('clean', taskClean);

// Serve files from dist/ folder
gulp.task('browsersync', taskBrowsersync);

// Swig to HTML compiler
gulp.task('html-compile', tasksHTML.compile);
gulp.task('html-watch', ['html-compile'], tasksHTML.watch);

// Image optimizer
gulp.task('img-optimize', tasksImages.optimize);
gulp.task('img-watch', ['img-optimize'], tasksImages.watch);

// Sass & Autoprefixer to CSS compiler
gulp.task('css-compile', tasksCSS.compile);
gulp.task('css-watch', ['css-compile'], tasksCSS.watch);
gulp.task('css-sassdoc', tasksCSS.sassdoc);
gulp.task('css-lint', []);

// JavaScript transpiler
gulp.task('js-transpile', tasksJS.transpile);
gulp.task('js-lint', tasksJS.lint);
gulp.task('js-watch', ['js-transpile'], tasksJS.watch);

// Upload
gulp.task('file-upload', ['dist'], tasksUpload.upload);

// Githook tasks
gulp.task('githooks-clean', tasksGithooks.clean);
gulp.task('githooks', ['githooks-clean'], tasksGithooks.copy);

// Group-tasks
gulp.task('dev', ['clean', 'browsersync', 'html-watch', 'img-watch', 'css-watch', 'js-watch']);
gulp.task('dist', ['clean', 'html-compile', 'img-optimize', 'css-compile', 'js-transpile']);
gulp.task('test', ['js-lint', 'css-lint']);
gulp.task('upload', ['file-upload']);
