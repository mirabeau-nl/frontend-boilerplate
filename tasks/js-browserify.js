import { js as config } from '../config';
import { collectUsedBabelHelpers, writeBabelHelpers, getBundler } from '../tasks/util/taskhelpers';
import gulp from 'gulp';
import es from 'event-stream';
import streamify from 'gulp-streamify';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import { reload as browsersync } from 'browser-sync';
import babelify from 'babelify';
import glob from 'glob';

let usedBabelHelpers = [];
const task = process.argv[process.argv.length - 1];
const plugins = ['errorify'];

if (task === 'dev') {
    plugins.push('watchify');
}

/**
 * Create a browserify bundle
 * @param {Object} options Source entry file to initiate browserify
 * @returns {Object} - Browserify object
 */
const createBundle = options => {

    // Build list of active babel presets & plugins
    let bundler = getBundler(options.entry, plugins);

    const bundle = () => {
        // Transform, bundle, minify and save bundle + init browsersync;
        return bundler.bundle()
            .pipe(source(options.bundle))
            .pipe(streamify(sourcemaps.init({ loadMaps: true })))
            .pipe(streamify(uglify()))
            .pipe(streamify(sourcemaps.write(config.dist.base)))
            .pipe(gulp.dest(config.dist.base))
            .pipe(browsersync({ stream: true }));
    };

    // Add event listener -> After transform: retrieve all used helpers
    bundler.on('transform', tr => {
        if (tr instanceof babelify) {
            tr.once('babelify', result => collectUsedBabelHelpers(result, usedBabelHelpers));
        }
    });

    bundler.on('update', bundle);

    const files = glob.sync(config.src.components);

    files.forEach(file => {
        let component = file.split('.');
        component = component[1].split('/');
        component = `${component[component.length - 2]}/${component[component.length - 1]}`;
        bundler.require(file, { expose: component });
    });

    return bundle();
};

/**
 * Task: JS Browserify Compile
 */
gulp.task('js-browserify', () => {
    // Create a tasklist wit an entry for each bundle
    let tasks = config.bundles.map(entry => createBundle(entry));

    // Merge tasks and write babel helpers when all tasks are finished
    return es.merge(tasks)
        .on('end', () => writeBabelHelpers(usedBabelHelpers));
});
