var gulp = require('gulp');
var swig = require('gulp-swig');

// Define paths
var globTemplates = global.paths.src + '/templates/**/*.html';
var globLayout    = global.paths.src + '/layout/*.html';
var globModules   = global.paths.src + '/modules/**/html/*.html';
var dirDist       = global.paths.dist + '/templates';

/**
 * Task: HTML Compile
 */
module.exports.compile = function() {
    gulp.src(globTemplates)
        .pipe(swig({ defaults: { cache: false } }))
        .pipe(gulp.dest(dirDist));
};

/**
 * Task: HTML Watch
 */
module.exports.watch = function() {
    gulp.watch([globTemplates, globLayout, globModules], ['html-compile']);
};
