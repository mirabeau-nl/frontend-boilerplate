var gulp         = require('gulp');
var watch        = require('gulp-watch');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var filter       = require('gulp-filter');
var browsersync  = require('browser-sync');

// Define paths
var globStatic     = global.paths.src + '/static/scss/**/!(_)*.scss';
var globStaticAll  = global.paths.src + '/static/scss/**/*.scss';
var globComponents = global.paths.src + '/components/**/*.scss';
var dirDist        = global.paths.dist + '/static/css';

/**
 * Task: CSS Compile
 */
module.exports.compile = function() {
    gulp.src(globStatic)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed', errLogToConsole: true }))
        .pipe(sourcemaps.write({ sourceRoot: '.' }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer('last 1 version', '> 5%'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirDist))
        .pipe(filter('**/*.css'))
        .pipe(browsersync.reload({ stream: true }));
};

/**
 * Task: CSS Watch
 */
module.exports.watch = function() {
    watch([globStaticAll, globComponents], function() {
        gulp.start(['css-compile']);
    });
};
