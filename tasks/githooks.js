import { githooks as config } from '../config';
import del from 'del';
import gulp from 'gulp';

/**
 * Task: Copy Githooks
 */
gulp.task('githooks', ['githooks-clean'], function() {
    return gulp.src(config.src.all)
        .pipe(gulp.dest(config.dist.base));
});

/**
 * Task: Clean Githooks dist folder
 */
gulp.task('githooks-clean', function() {
    return del.sync([config.dist.all]);
});
