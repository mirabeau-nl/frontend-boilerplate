var config      = require('../config');
var gulp        = require('gulp');
var watch       = require('gulp-watch');
var swig        = require('gulp-swig');
var browsersync = require('browser-sync');

/**
 * Task: HTML Compile
 */
module.exports.compile = function() {
    return gulp.src(config.paths.html.globTemplates)
        .pipe(swig({ defaults: { cache: false } }))
        .pipe(gulp.dest(config.paths.html.dirDist))
        .pipe(browsersync.reload({ stream: true }));
};

/**
 * Task: HTML Watch
 */
module.exports.watch = function() {
    var paths = config.paths.html;
    watch([paths.globTemplates, paths.globLayout, paths.globComponents], function() {
        gulp.start(['html-compile']);
    });
};
