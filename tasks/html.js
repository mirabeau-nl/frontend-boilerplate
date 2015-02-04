var gulp = require('gulp');
var swig = require('gulp-swig');

// Define paths
var globPages   = global.paths.src + '/pages/**/*.html';
var globLayout  = global.paths.src + '/layout/*.html';
var globModules = global.paths.src + '/modules/**/html/*.html';
var dirDist     = global.paths.dist + '/pages';

/**
 * Task: HTML Compile
 */
module.exports.compile = function() {
    gulp.src(globPages)
        .pipe(swig({ defaults: { cache: false } }))
        .pipe(gulp.dest(dirDist));
};

/**
 * Task: HTML Watch
 */
module.exports.watch = function() {
    gulp.watch([globPages, globLayout, globModules], ['html-compile']);
};
