var connect = require('gulp-connect');

module.exports = function() {

    connect.server({
        port: 1337,
        root: global.paths.dest,
        middleware: function(connect, opt) {
            console.log('lolol');
        }
    });

};
