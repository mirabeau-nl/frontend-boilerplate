var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var browsersync = require('browser-sync');

// Define paths
var globStatic     = global.paths.src + '/static/js/**/*.js';
var globComponents = global.paths.src + '/components/**/*.js';
var dirDist        = global.paths.dist + '/static/js';

/**
 * Task: JS Transpile
 */
module.exports.transpile = function() {
    gulp.src([globStatic, globComponents])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirDist))
        .pipe(browsersync.reload({ stream: true }));
};

/**
 * Task: JS Watch
 */
module.exports.watch = function() {
    gulp.watch([globStatic, globComponents], ['js-transpile']);
};
