import { fonts as config } from '../config'
import gulp from 'gulp'
import { reload } from 'browser-sync'
import watch from 'gulp-watch'

/**
 * Task: Copy fonts
 */
gulp.task('fonts', () => {
  return gulp
    .src(config.src.fonts)
    .pipe(gulp.dest(config.dist.fonts))
    .pipe(reload({ stream: true }))
})

/**
 * Task: Fonts watch
 */
gulp.task('fonts-watch', cb => {
  watch(config.src.fonts, () => gulp.start(['fonts'], cb))
})
