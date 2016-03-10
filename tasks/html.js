import { html as config } from '../config';
import { reload as browsersync } from 'browser-sync';
import gulp from 'gulp';
import swig from 'gulp-swig';
import watch from 'gulp-watch';

/**
 * Task: HTML Compile
 */
gulp.task('html', function() {
    return gulp.src(config.src.templates)
        .pipe(swig({ defaults: { cache: false } }))
        .pipe(gulp.dest(config.dist.base))
        .pipe(browsersync({ stream: true }));
});

/**
 * Task: HTML Watch
 */
gulp.task('html-watch', function(cb) {
    var paths = config.src;
    watch([paths.templates, paths.layout, paths.components], () => gulp.start(['html'], cb));
});
