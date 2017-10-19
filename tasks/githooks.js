import { githooks as config } from '../config';
import del from 'del';
import gulp from 'gulp';

/**
 * Task: Copy Githooks
 */
gulp.task('githooks', ['githooks-clean'], () => {
    return gulp.src(config.src.all)
        .pipe(gulp.dest(config.dist.base, { mode: '0500' }));
});

/**
 * Task: Clean Githooks dist folder
 */
gulp.task('githooks-clean', () => {
    return del.sync([config.dist.all]);
});
