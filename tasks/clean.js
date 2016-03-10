import { clean as config } from '../config';
import del from 'del';
import gulp from 'gulp';

/**
 * Task: Clean dist/ folder
 */
gulp.task('clean', function() {
    del.sync(config.dist.base);
});
