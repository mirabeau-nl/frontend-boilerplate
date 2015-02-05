var gulp        = require('gulp');
var swig        = require('gulp-swig');
var browsersync = require('browser-sync');

// Define paths
var globTemplates  = global.paths.src + '/templates/**/*.html';
var globLayout     = global.paths.src + '/layout/*.html';
var globComponents = global.paths.src + '/components/**/*.html';
var dirDist        = global.paths.dist + '/templates';

/**
 * Task: HTML Compile
 */
module.exports.compile = function() {
    gulp.src(globTemplates)
        .pipe(swig({ defaults: { cache: false } }))
        .pipe(gulp.dest(dirDist))
        .pipe(browsersync.reload({ stream: true }));
};

/**
 * Task: HTML Watch
 */
module.exports.watch = function() {
    gulp.watch([globTemplates, globLayout, globComponents], ['html-compile']);
};
