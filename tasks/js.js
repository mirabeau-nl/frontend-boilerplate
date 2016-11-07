import { js as config, moduleLoader } from '../config';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import watch from 'gulp-watch';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';

const isFixed = file => file.eslint && file.eslint.fixed;

/**
 * Import the module loader task
 */
if (moduleLoader === 'browserify') {
    require('./js-browserify').default;
} else if (moduleLoader === 'requirejs') {
    require('./js-requirejs').default;
}


/**
 * Task: JS Compile
 */
gulp.task('js', [`js-${moduleLoader}`]);

/**
 * Task: JS Vendor
 */
gulp.task('js-vendor', () => {
    return gulp.src(config.src.vendor)
        .pipe(uglify())
        .pipe(gulp.dest(config.dist.vendor));
});

/**
 * Task: JS Watch
 */
gulp.task('js-watch', cb => {
    if (moduleLoader === 'requirejs') {
        watch([config.src.all, config.src.components], () => gulp.start(['js'], cb));
    } else {
        cb();
    }
});

/**
 * Task: JS Lint
 */
gulp.task('js-lint', () => {
    const src = [
        './gulpfile.babel.js',
        './tasks/**/*.js',
        config.src.all,
        config.src.components,
        `!${config.src.polyfill}`,
        `!${config.src.vendor}`
    ];

    return gulp.src(src)
        .pipe(eslint({ fix: config.eslintAutofix }))
        .pipe(eslint.format())
        .pipe(gulpif(isFixed, gulp.dest(file => file.base)))
        .pipe(eslint.failAfterError());
});

/**
 * Task: JS unit tests
 */
gulp.task('js-test', () => {
    require('babel-register');

    return gulp.src([config.src.tests])
        .pipe(mocha());
});
