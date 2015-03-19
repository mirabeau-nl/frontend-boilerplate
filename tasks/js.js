var gulp        = require('gulp');
var watch       = require('gulp-watch');
var gulpif      = require('gulp-if');
var changed     = require('gulp-changed');
var babel       = require('gulp-babel');
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
    var vendorFilter = function(file) {
        return !/vendor/.test(file.path);
    };
    gulp.src([globStatic, globComponents])
        .pipe(changed(dirDist))
        .pipe(sourcemaps.init())
        .pipe(gulpif(vendorFilter, babel()))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirDist))
        .pipe(browsersync.reload({ stream: true }));
};

/**
 * Task: JS Watch
 */
module.exports.watch = function() {
    watch([globStatic, globComponents], function() {
        gulp.start(['js-transpile']);
    });
};
