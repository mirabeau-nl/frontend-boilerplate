import { js as config } from '../config';
import { collectUsedBabelHelpers, writeBabelHelpers } from '../tasks/util/taskhelpers';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import glob from 'glob';
import es from 'event-stream';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import { reload } from 'browser-sync';

let usedBabelHelpers = [];
const task = process.argv[process.argv.length - 1];
const isFixed = file => file.eslint && file.eslint.fixed;

/**
 * Task: JS Compile
 */
gulp.task('js', ['js-browserify']);

/**
 * Task: JS Lint
 */
gulp.task('js-lint', () => {
    const src = [
        './gulpfile.babel.js',
        './tasks/**/*.js',
        config.src.all,
        config.src.components,
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
    return gulp.src([config.src.tests])
        .pipe(mocha({
            compilers: [
                'js:babel-register'
            ]
        }));
});


const bundleFile = file => {

    const opts = config.browserify;

    if (task === 'dev') {
        opts.plugin = opts.plugin.concat('watchify');
    }

    const bundler = browserify(file, config.browserify);

    const bundle = () => bundler.bundle()
        .pipe(source(file))
        .pipe(rename({ dirname: '' }))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dist.base))
        .pipe(reload({ stream: true }));

    bundler
        .on('transform', tr => collectUsedBabelHelpers(tr, usedBabelHelpers))
        .on('update', bundle);

    return bundle();

};

/**
 * Task: JS Browserify
 */
gulp.task('js-browserify', done => {

    glob(config.src.bundles, (err, files) => {

        if (err) { done(err); }

        const tasks = files.map(bundleFile);

        return es.merge(tasks).on('end', () => {
            writeBabelHelpers(usedBabelHelpers);
            done();
        });

    });
});
