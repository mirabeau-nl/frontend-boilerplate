var gulp   = require( 'gulp' );
var gutil  = require( 'gulp-util' );
var ftp    = require( 'vinyl-ftp' );
var config = require('../config');

/**
 * Task: Upload via FTP
 */
module.exports.upload = function() {

    var opts = config.upload.options;
    opts.log = gutil.log;

    return gulp.src([config.upload.globDist], { base: config.upload.targetBase, buffer: false })
        .pipe(ftp.create(opts).dest(config.upload.targetPath));
};
