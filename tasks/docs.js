import config from '../config';
import { sync as glob } from 'glob';
import gulp from 'gulp';
import swig from 'gulp-swig';
import watch from 'gulp-watch';
import moment from 'moment-timezone';
import { relative } from 'path';
import runSequence from 'run-sequence';
import sassdoc from 'sassdoc';

/**
 * Sub-task: Docs copy statics
 */
gulp.task('docs-copy-statics', () => {
    return gulp.src(config.docs.src.statics)
        .pipe(gulp.dest(config.docs.dist.static));
});

/**
 * Sub-task: Docs render index
 */
gulp.task('docs-render-index', () => {

    // Grab list of templates
    const templates = glob(config.docs.src.templatesAll, { nosort: true }).map(dir => relative(config.docs.src.templates, dir));

    // Data
    const data = {
        templates: templates,
        lastUpdated: moment().tz('Europe/Amsterdam').format('DD-MM-YYYY HH:mm:ss z')
    };

    // Render index template
    return gulp.src(config.docs.src.index)
        .pipe(swig({ defaults: { cache: false }, data: data }))
        .pipe(gulp.dest(config.docs.dist.base));
});

/**
 * Task: Docs sassdoc
 */
gulp.task('docs-sassdoc', () => {
    return gulp.src([config.css.src.staticAll, config.css.src.components])
        .pipe(sassdoc({ dest: config.docs.dist.sassdocs }));
});

/**
 * Task: Docs Compile
 */
gulp.task('docs', cb => runSequence(['docs-copy-statics', 'docs-render-index', 'docs-sassdoc'], cb));

/**
 * Task: Docs Watch
 */
gulp.task('docs-watch', cb => {
    const watching = [
        config.docs.src.index,
        config.html.src.templates,
        config.html.src.layout,
        config.html.src.components
    ];
    watch(watching, () => gulp.start(['docs'], cb));
});
