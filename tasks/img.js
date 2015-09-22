var config   = require('../config');
var gulp     = require('gulp');
var watch    = require('gulp-watch');
var changed  = require('gulp-changed');
var imagemin = require('gulp-imagemin');

/**
 * Task: Image optimizer
 */
module.exports.optimize = function() {
    return gulp.src(config.paths.img.globImages)
        .pipe(changed(config.paths.img.dirDist))
        .pipe(imagemin())
        .pipe(gulp.dest(config.paths.img.dirDist));
};

/**
 * Task: Image Watch
 */
module.exports.watch = function() {
    watch([config.paths.img.globImages], function() {
        gulp.start(['img-optimize']);
    });
};
