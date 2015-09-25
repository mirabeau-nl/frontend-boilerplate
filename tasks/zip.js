var config = require('../config');
var gulp   = require('gulp');
var zip    = require("gulp-zip");

/**
 * Task: Add content to zip archive
 */
module.exports.zip = function() {

    return gulp.src([config.zip.paths.globDist])
        .pipe(zip(config.zip.filename))
        .pipe(gulp.dest(config.zip.paths.dirDist));
};
