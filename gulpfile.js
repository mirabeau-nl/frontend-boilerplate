var gulp = require('gulp');

global.paths = {
    src:  __dirname + '/src',
    dist: __dirname + '/dist'
};

// Localhost webserver
gulp.task('connect', require('./tasks/connect'));

// Sass/Autoprefixer compiler
var sassTasks = require('./tasks/sass');
gulp.task('sass-compile', sassTasks.compile);
gulp.task('sass-watch', ['sass-compile'], sassTasks.watch);

// JavaScript
/*var jsTasks = require('./tasks/js');
gulp.task('js-compile', jsTasks.compile);
gulp.task('js-watch', ['js-compile'], jsTasks.watch);*/

// Group-task
gulp.task('dev', ['connect', 'sass-watch']);
