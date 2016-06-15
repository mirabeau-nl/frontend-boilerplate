import { js as config } from '../config';
import { collectUsedBabelHelpers, writeBabelHelpers } from '../tasks/util/taskhelpers';
import { readFileSync } from 'fs';
import babel from 'gulp-babel';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import { reload as browsersync } from 'browser-sync';

let usedBabelHelpers = [];

/**
 * Task: JS RequireJS Compile
 */
gulp.task('js-requirejs', () => {
    // Build list of active babel presets & plugins
    const babelrc = JSON.parse(readFileSync(`${__dirname}/../.babelrc`, { encoding: 'utf8' }));
    const babelConfig = { presets: babelrc.presets, plugins: babelrc.env.browser.requirejs.plugins };

    return gulp.src([config.src.all, config.src.components, config.src.conditioner, '!./src/static/js/bundle.js'])
        .pipe(sourcemaps.init())
        .pipe(gulpif(config.babelFilter, babel(babelConfig)))
        .pipe(gulpif(config.babelFilter, collectUsedBabelHelpers(null, usedBabelHelpers)))
        .pipe(gulpif(config.needsCopying, uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulpif(config.needsCopying, gulp.dest(config.dist.base)))
        .pipe(browsersync({ stream: true }))
        .on('end', () => writeBabelHelpers(usedBabelHelpers));
});
