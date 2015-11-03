var config = require('../config');
var gulp   = require('gulp');
var swig   = require('gulp-swig');
var watch  = require('gulp-watch');
var glob   = require('glob');
var path   = require('path');
var moment = require('moment-timezone');

/**
 * Sub-task: Docs copy statics
 */
gulp.task('docs-copy-statics', function() {
    return gulp.src(config.docs.src.statics)
        .pipe(gulp.dest(config.docs.dist.static));
});

/**
 * Sub-task: Docs render index
 */
gulp.task('docs-render-index', function() {

    // Grab list of templates
    var templates = glob.sync(config.docs.src.templatesAll, { nosort: true }).map(function(dir) {
        return path.relative(config.docs.src.templates, dir);
    });

    // Data
    var data = {
        templates: templates,
        lastUpdated: moment().tz('Europe/Amsterdam').format('DD-MM-YYYY HH:mm:ss z')
    };

    // Render index template
    return gulp.src(config.docs.src.index)
        .pipe(swig({ defaults: { cache: false }, data: data }))
        .pipe(gulp.dest(config.docs.dist.base));
});

/**
 * Task: Docs Compile
 */
gulp.task('docs-compile', ['docs-copy-statics', 'docs-render-index']);

/**
 * Task: Docs Watch
 */
gulp.task('docs-watch', ['docs-compile'], function() {
    var watching = [
        config.docs.src.index,
        config.html.src.templates,
        config.html.src.layout,
        config.html.src.components
    ];
    watch(watching, function() {
        gulp.start(['docs-compile']);
    });
});
