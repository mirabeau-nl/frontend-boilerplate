var config      = require('../config');
var browsersync = require('browser-sync');

/**
 * Task: BrowserSync HTTP server
 */
module.exports = function() {
    browsersync({
        server: {
            baseDir: config.paths.browsersync.baseDir
        },
        /*ghostMode: false,
        notify: false,*/
        open: false
    });
};
