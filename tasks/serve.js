var connect = require('gulp-connect');

/**
 * Task: HTTP Server
 */
module.exports = function() {
    connect.server({
        port: 1337,
        root: global.paths.dist
    });
};
