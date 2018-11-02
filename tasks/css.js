import autoprefixer from 'autoprefixer'
import cleanCSS from 'gulp-clean-css'
import { css as config } from '../config'
import filter from 'gulp-filter'
import gulp from 'gulp'
import postcss from 'gulp-postcss'
import { reload } from 'browser-sync'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import stylelint from 'gulp-stylelint'
import watch from 'gulp-watch'

/**
 * Task: CSS Compile
 */
gulp.task('css', () => {
  const postcssProcessors = [autoprefixer()]

  return gulp
    .src(config.src.static)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssProcessors))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist.base))
    .pipe(filter('**/*.css'))
    .pipe(reload({ stream: true }))
})

/**
 * Task: CSS Watch
 */
gulp.task('css-watch', cb => {
  watch([config.src.staticAll, config.src.components], () =>
    gulp.start(['css'], cb)
  )
})

/**
 * Task: CSS Lint
 */
gulp.task('css-lint', () => {
  return gulp
    .src([config.src.staticAll, config.src.components, `!${config.src.vendor}`])
    .pipe(
      stylelint({
        failAfterError: true,
        reporters: [
          {
            formatter: 'string',
            console: true
          }
        ]
      })
    )
})
