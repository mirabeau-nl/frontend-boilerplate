var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');

// Define paths
var globImages = global.paths.src + '/static/img/**/*.{svg,png,jpg}';
var dirDist    = global.paths.dist + '/static/img';

/**
 * Task: Image optimizer
 */
module.exports.optimize = function() {
    gulp.src(globImages)
        .pipe(imagemin())
        .pipe(gulp.dest(dirDist));
};

/**
 * Task: Image Watch
 */
module.exports.watch = function() {
    gulp.watch([globImages], ['img-optimize']);
};
