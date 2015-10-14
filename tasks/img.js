var config   = require('../config');
var gulp     = require('gulp');
var watch    = require('gulp-watch');
var changed  = require('gulp-changed');
var imagemin = require('gulp-imagemin');

/**
 * Task: Image optimizer
 */
gulp.task('img-optimize', function() {
    return gulp.src(config.img.src.all)
        .pipe(changed(config.img.dist.base))
        .pipe(imagemin())
        .pipe(gulp.dest(config.img.dist.base));
});

/**
 * Task: Image Watch
 */
gulp.task('img-watch', ['img-optimize'], function() {
    watch([config.img.src.all], function() {
        gulp.start(['img-optimize']);
    });
});
