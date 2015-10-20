var config = require('../config');
var gulp   = require('gulp');
var del    = require('del');

/**
 * Task: Clean dist/ folder
 */
gulp.task('clean', function() {
    del.sync(config.clean.dist.base);
});
