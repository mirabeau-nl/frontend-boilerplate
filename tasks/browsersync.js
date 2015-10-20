var config      = require('../config');
var gulp        = require('gulp');
var browsersync = require('browser-sync');

/**
 * Task: BrowserSync HTTP server
 */
gulp.task('browsersync', function() {
    browsersync({
        server: {
            baseDir: config.browsersync.dist.base
        },
        /*ghostMode: false,
        notify: false,*/
        open: false
    });
});
