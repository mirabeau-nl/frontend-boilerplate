import { img as config } from '../config';
import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import watch from 'gulp-watch';

/**
 * Task: Image optimizer
 */
gulp.task('img', function() {
    return gulp.src(config.src.all)
        .pipe(changed(config.dist.base))
        .pipe(imagemin())
        .pipe(gulp.dest(config.dist.base));
});

/**
 * Task: Image Watch
 */
gulp.task('img-watch', function(cb) {
    watch([config.src.all], () => gulp.start(['img'], cb));
});
