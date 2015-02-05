var browsersync = require('browser-sync');

/**
 * Task: BrowserSync HTTP server
 */
module.exports = function() {
    browsersync({
        server: {
            baseDir: global.paths.dist,
            files: global.paths.dist + '/**'
        }
    });
};
