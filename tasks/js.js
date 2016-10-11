import { reload as browsersync } from 'browser-sync';
import { js as config } from '../config';
import { readFileSync, writeFileSync } from 'fs';
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import watch from 'gulp-watch';
import path from 'path';
import through from 'through2';
import uglifyjs from 'uglify-js';
import mocha from 'gulp-mocha';

/**
 * Capture which babel helpers are actually used
 * @param {String[]} usedBabelHelpers - The array of babel helpers, passed by reference
 * @returns {Transform} - A Node.js streams3 transform stream
 */
const collectUsedBabelHelpers = usedBabelHelpers => {
    return through.obj((file, enc, cb) => {
        file.babel.usedHelpers.map(helper => usedBabelHelpers.push(helper));
        cb(null, file);
    });
};

/**
 * Write-out babel-helpers
 * @param {String[]} usedBabelHelpers - The array of babel helpers, passed by reference
 */
const writeBabelHelpers = usedBabelHelpers => { /* eslint max-statements: 0 */

    // Generate the babel helpers file
    const buildHelpers = require(`${__dirname}/../node_modules/babel-core/lib/tools/build-external-helpers`);
    writeFileSync(config.dist.babelHelpers, buildHelpers(usedBabelHelpers));

    const pwd = process.cwd();
    const filename = path.relative(config.dist.base, config.dist.babelHelpers);

    // Sourcemap: Make sure the 'sourceMappingURL' is correct
    process.chdir(config.dist.base);
    const minified = uglifyjs.minify(filename, {
        outSourceMap: `${path.basename(filename)}.map`,
        sourceRoot: '/source/',
        sourceMapIncludeSources: true
    });
    process.chdir(pwd);

    // Sourcemap: Make sure the 'file' property is correct
    const sourcemap = JSON.parse(minified.map);
    sourcemap.file = filename;
    minified.map = JSON.stringify(sourcemap);

    // Write babel helpers and it's sourcemap
    writeFileSync(config.dist.babelHelpers, minified.code);
    writeFileSync(`${config.dist.babelHelpers}.map`, minified.map);
};

const isFixed = function(file) {
    return file.eslint && file.eslint.fixed;
};

/**
 * Task: JS Compile
 */
gulp.task('js', () => {

    // Build list of active babel presets & plugins
    const babelrc = JSON.parse(readFileSync(`${__dirname}/../.babelrc`, { encoding: 'utf8' }));
    const babelConfig = { presets: babelrc.presets, plugins: babelrc.env.browser.plugins };

    const usedBabelHelpers = [];

    return gulp.src([config.src.all, config.src.components])
        .pipe(sourcemaps.init())
        .pipe(gulpif(config.babelFilter, babel(babelConfig)))
        .pipe(gulpif(config.babelFilter, collectUsedBabelHelpers(usedBabelHelpers)))
        .pipe(gulpif(config.needsCopying, uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulpif(config.needsCopying, gulp.dest(config.dist.base)))
        .pipe(browsersync({ stream: true }))
        .on('end', writeBabelHelpers.bind(null, usedBabelHelpers));
});

/**
 * Task: JS Watch
 */
gulp.task('js-watch', cb => {
    watch([config.src.all, config.src.components], () => gulp.start(['js'], cb));
});

/**
 * Task: JS Test
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
