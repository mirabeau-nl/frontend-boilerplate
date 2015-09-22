var config       = require('../config');
var gulp         = require('gulp');
var watch        = require('gulp-watch');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var filter       = require('gulp-filter');
var browsersync  = require('browser-sync');
var sassdoc      = require('sassdoc');
var minifyCss    = require('gulp-minify-css');

/**
 * Task: CSS Compile
 */
module.exports.compile = function() {
    var postcssProcessors = [
        autoprefixer({
            browsers: config.autoprefixer.browsers
        })
    ];

    /**
     * Task: Compile Sass
     */
    gulp.task('css-compile-sass', function() {
        return gulp.src(config.paths.css.globStatic)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss(postcssProcessors))
            .pipe(minifyCss())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.paths.css.dirDist))
            .pipe(filter('**/*.css'))
            .pipe(browsersync.reload({
                stream: true
            }));
    });

    /**
     * Task: Copy fonts
     */
    gulp.task('css-copy-fonts', function() {
        return gulp.src(config.paths.css.globFonts)
            .pipe(gulp.dest(config.paths.css.dirDistFonts))
            .pipe(browsersync.reload({ stream: true })); /* Todo: seems to cause a problem with browserSync (refresh) */
    });

    return gulp.start(['css-compile-sass', 'css-copy-fonts']);

};

/**
 * Task: CSS Watch
 */
module.exports.watch = function() {
    watch([config.paths.css.globStaticAll, config.paths.css.globComponents], function() {
        gulp.start(['css-compile']);
    });
};

/**
 * Task: Generate Sassdoc documentation
 */
module.exports.sassdoc = function() {
    var options = {
        dest: config.paths.css.sassdocsDist
    };

    gulp.src([config.paths.css.globStaticAll, config.paths.css.globComponents])
        .pipe(sassdoc(options));
};
