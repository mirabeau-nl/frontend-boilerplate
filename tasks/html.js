import { html as config } from '../config';
import { reload } from 'browser-sync';
import gulp from 'gulp';
import render from 'gulp-nunjucks-render';
import watch from 'gulp-watch';
import envManager from './util/envManager';

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
            manageEnv: envManager
        }))
        .pipe(gulp.dest(config.dist.base))
        .on('end', reload);
});

/**
 * Task: HTML Watch
 */
gulp.task('html-watch', cb => {
    const paths = config.src;
    watch([paths.templates, paths.layout, paths.components], () => gulp.start(['html'], cb));
});
