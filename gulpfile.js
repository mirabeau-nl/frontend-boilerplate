var gulp = require('gulp');

// Define paths
global.paths = {
    src:  './src',
    dist: './dist'
};

// Load tasks
var taskBrowsersync = require('./tasks/browsersync');
var tasksHTML       = require('./tasks/html');
var tasksCSS        = require('./tasks/css');

// Serve files from dist/ folder
gulp.task('browsersync', taskBrowsersync);

// Swig to HTML compiler
gulp.task('html-compile', tasksHTML.compile);
gulp.task('html-watch', ['html-compile'], tasksHTML.watch);

// Sass & Autoprefixer to CSS compiler
gulp.task('css-compile', tasksCSS.compile);
gulp.task('css-watch', ['css-compile'], tasksCSS.watch);

// Group-task
gulp.task('dev', ['browsersync', 'html-watch', 'css-watch']);
