var gulp = require('gulp');

// Define paths
global.paths = {
    src:  __dirname + '/src',
    dist: __dirname + '/dist'
};

// Load tasks
var taskServe = require('./tasks/serve');
var tasksHTML = require('./tasks/html');
var tasksCSS  = require('./tasks/css');

// Serve files from dist/ folder
gulp.task('serve', taskServe);

// Swig to HTML compiler
gulp.task('html-compile', tasksHTML.compile);
gulp.task('html-watch', ['html-compile'], tasksHTML.watch);

// Sass & Autoprefixer to CSS compiler
gulp.task('css-compile', tasksCSS.compile);
gulp.task('css-watch', ['css-compile'], tasksCSS.watch);

// Group-task
gulp.task('dev', ['serve', 'html-watch', 'css-watch']);
