var config       = require('../config');
var gulp         = require('gulp');
var watch        = require('gulp-watch');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var filter       = require('gulp-filter');
var minifyCss    = require('gulp-minify-css');
var autoprefixer = require('autoprefixer');
var browsersync  = require('browser-sync');

/**
 * Sub-task: Compile Sass
 */
gulp.task('css-compile-sass', function() {
    var postcssProcessors = [
        autoprefixer({
            browsers: config.css.autoprefixer.browsers
        })
    ];
    return gulp.src(config.css.src.static)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcssProcessors))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.css.dist.base))
        .pipe(filter('**/*.css'))
        .pipe(browsersync.reload({ stream: true }));
});

/**
 * Sub-task: Copy fonts
 */
gulp.task('css-copy-fonts', function() {
    return gulp.src(config.css.src.fonts)
        .pipe(gulp.dest(config.css.dist.fonts))
        .pipe(browsersync.reload({ stream: true }));
});

/**
 * Task: CSS Compile
 */
gulp.task('css-compile', ['css-compile-sass', 'css-copy-fonts']);

/**
 * Task: CSS Watch
 */
gulp.task('css-watch', ['css-compile'], function() {
    watch([config.css.src.staticAll, config.css.src.components], function() {
        gulp.start(['css-compile']);
    });
});

/**
 * Task: CSS Test
 */
gulp.task('css-lint', []);
