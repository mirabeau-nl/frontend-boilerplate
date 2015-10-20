var config = require('../config');
var gulp   = require('gulp');
var gutil  = require('gulp-util');
var ftp    = require('vinyl-ftp');

/**
 * Task: Upload via FTP
 */
gulp.task('file-upload', ['dist'], function() {
    var opts = config.upload.options;
    opts.log = gutil.log;
    return gulp.src([config.upload.src.all], { base: config.upload.dist.base, buffer: false })
        .pipe(ftp.create(opts).dest(config.upload.dist.target));
});
