var config      = require('../config');
var gulp        = require('gulp');
var watch       = require('gulp-watch');
var gulpif      = require('gulp-if');
var changed     = require('gulp-changed');
var babel       = require('gulp-babel');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var jshint      = require('gulp-jshint');
var jscs        = require('gulp-jscs');
var browsersync = require('browser-sync');

/**
 * Task: JS Transpile
 */
module.exports.transpile = function() {
    return gulp.src([config.paths.js.globStatic, config.paths.js.globComponents])
        .pipe(changed(config.paths.js.dirDist))
        .pipe(sourcemaps.init())
        .pipe(gulpif(config.paths.js.vendorFilter, babel()))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.js.dirDist))
        .pipe(browsersync.reload({ stream: true }));
};

/**
 * Task: JS Watch
 */
module.exports.watch = function() {
    watch([config.paths.js.globStatic, config.paths.js.globComponents], function() {
        gulp.start(['js-transpile']);
    });
};

/**
 * Task: JS Test
 */
module.exports.lint = function() {
    return gulp.src([config.paths.js.globStatic, config.paths.js.globComponents, '!' + config.paths.js.globVendor])
        .pipe(jscs())
        .on('error',handleJscsError)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
};

// JSCS error handler
var handleJscsError = function(err) {
    console.log(err.toString());
    process.exit(1);
};
