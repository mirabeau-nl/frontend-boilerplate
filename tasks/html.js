import { html as config, moduleLoader } from '../config';
import { reload as browsersync } from 'browser-sync';
import gulp from 'gulp';
import render from 'gulp-nunjucks-render';
import watch from 'gulp-watch';

/**
 * Task: HTML Compile
 */
gulp.task('html', () => {
    return gulp.src(config.src.templates)
        .pipe(render({
            path: [
                config.src.templatesDir,
                config.src.layoutDir,
                config.src.componentsDir
            ],
            data: {
                moduleLoader: moduleLoader
            }
        }))
        .pipe(gulp.dest(config.dist.base))
        .pipe(browsersync({ stream: true }));
});

/**
 * Task: HTML Watch
 */
gulp.task('html-watch', cb => {
    const paths = config.src;
    watch([paths.templates, paths.layout, paths.components], () => gulp.start(['html'], cb));
});
