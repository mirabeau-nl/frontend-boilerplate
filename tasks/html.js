var config      = require('../config');
var gulp        = require('gulp');
var watch       = require('gulp-watch');
var swig        = require('gulp-swig');
var browsersync = require('browser-sync');

/**
 * Task: HTML Compile
 */
gulp.task('html-compile', function() {
    return gulp.src(config.html.src.templates)
        .pipe(swig({ defaults: { cache: false } }))
        .pipe(gulp.dest(config.html.dist.base))
        .pipe(browsersync.reload({ stream: true }));
});

/**
 * Task: HTML Watch
 */
gulp.task('html-watch', ['html-compile'], function() {
    var paths = config.html.src;
    watch([paths.templates, paths.layout, paths.components], function() {
        gulp.start(['html-compile']);
    });
});
