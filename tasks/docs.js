import config from '../config';
import gulp from 'gulp';
import render from 'gulp-nunjucks-render';
import watch from 'gulp-watch';
import moment from 'moment-timezone';
import runSequence from 'run-sequence';
import sassdoc from 'sassdoc';
import transform from 'gulp-transform';
import ext from 'gulp-ext-replace';
import helpers from './util/docHelpers';

/**
 * Sub-task: Docs copy statics
 */
gulp.task('docs-copy-statics', () =>
    gulp.src(config.docs.src.statics)
        .pipe(gulp.dest(config.docs.dist.static))
);

/**
 * Sub-task: Docs render index
 */
gulp.task('docs-render-index', () => {

    // Grab list of templates
    const templates = helpers.getRelativePaths(config.docs.src.templatesAll, config.docs.src.templates);
    const components = helpers.getComponentTree(config.docs.src.componentsAll, config.docs.src.components);

    // Data
    const data = {
        templates: templates,
        components: components,
        lastUpdated: moment().tz('Europe/Amsterdam').format('DD-MM-YYYY HH:mm:ss z')
    };


    const paths = [
        config.docs.src.indexDir,
        config.docs.src.layoutDir,
        config.html.src.layoutDir,
        config.html.src.componentsDir
    ];

    // Render index template
    return gulp.src(config.docs.src.index)
        .pipe(render({ path: paths, data: data }))
        .pipe(gulp.dest(config.docs.dist.base));
});

/**
 * Task: Docs components
 */
gulp.task('docs-render-components', ['docs-render-component-demos'], () =>

    gulp.src([config.docs.src.componentsAll])
        .pipe(transform((content, file) => helpers.renderComponent(content, file)))
        .pipe(ext('.html'))
        .pipe(gulp.dest(config.docs.dist.components))

);

gulp.task('docs-render-component-demos', () =>

    gulp.src([config.docs.src.componentsAll])
        .pipe(transform((content, file) => helpers.renderComponentDemo(content, file)))
        .pipe(ext('.demo.html'))
        .pipe(gulp.dest(config.docs.dist.components))

);

/**
 * Task: Docs sassdoc
 */
gulp.task('docs-sassdoc', () =>
    gulp.src([config.css.src.staticAll, config.css.src.components])
        .pipe(sassdoc({ dest: config.docs.dist.sassdocs }))
);

/**
 * Task: Docs Compile
 */
gulp.task('docs', cb =>
    runSequence([
        'docs-copy-statics',
        'docs-render-index',
        'docs-render-components',
        'docs-render-component-demos',
        'docs-sassdoc'
    ], cb)
);

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
