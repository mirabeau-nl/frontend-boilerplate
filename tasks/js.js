var config      = require('../config');
var gulp        = require('gulp');
var watch       = require('gulp-watch');
var gulpif      = require('gulp-if');
var changed     = require('gulp-changed');
var babel       = require('gulp-babel');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var eslint      = require('gulp-eslint');
var browsersync = require('browser-sync');

/**
 * Task: JS Transpile
 */
gulp.task('js-transpile', function() {
    return gulp.src([config.js.src.all, config.js.src.components])
        .pipe(changed(config.js.dist.base))
        .pipe(sourcemaps.init())
        .pipe(gulpif(config.js.vendorFilter, babel()))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.js.dist.base))
        .pipe(browsersync.reload({ stream: true }));
});

/**
 * Task: JS Watch
 */
gulp.task('js-watch', ['js-transpile'], function() {
    watch([config.js.src.all, config.js.src.components], function() {
        gulp.start(['js-transpile']);
    });
});

/**
 * Task: JS Test
 */
gulp.task('js-lint', function() {
    var src = config.js.src;
    return gulp.src([src.all, src.components, '!' + src.vendor])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
