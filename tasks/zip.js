var config = require('../config');
var gulp   = require('gulp');
var zip    = require("gulp-zip");

/**
 * Task: Add content to zip archive
 */
gulp.task('zip', function() {
    return gulp.src([config.zip.src.all])
        .pipe(zip(config.zip.filename))
        .pipe(gulp.dest(config.zip.dist.base));
});
