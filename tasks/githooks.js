var config = require('../config');
var gulp   = require('gulp');
var del    = require('del');

/**
 * Task: Copy Githooks
 */
gulp.task('githooks', ['githooks-clean'], function() {
    return gulp.src(config.githooks.src.all)
        .pipe(gulp.dest(config.githooks.dist.base));
});

/**
 * Task: Clean Githooks dist folder
 */
gulp.task('githooks-clean', function() {
    return del([config.githooks.dist.all]);
});
