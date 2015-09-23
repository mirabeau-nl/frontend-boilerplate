var config = require('../config');
var gulp   = require('gulp');
var del    = require('del');

/**
 * Task: Copy Githooks
 */
module.exports.copy = function() {
    return gulp.src(config.paths.githooks.globGithooks)
        .pipe(gulp.dest(config.paths.githooks.dirDist));
};

/**
 * Task: Clean Githooks dist folder
 */
module.exports.clean = function() {
    return del([config.paths.githooks.globDist]);
};
