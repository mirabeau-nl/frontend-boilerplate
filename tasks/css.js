import autoprefixer from 'autoprefixer'
import cleanCSS from 'gulp-clean-css'
import { css as config } from '../config'
import filter from 'gulp-filter'
import { src, dest, watch, series } from 'gulp'
import postcss from 'gulp-postcss'
import { reload } from 'browser-sync'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import stylelint from 'gulp-stylelint'

const sass = gulpSass(dartSass)

/**
 * Task: CSS Compile
 * @returns {NodeJS.WritableStream}
 */
export function css() {
  const postcssProcessors = [autoprefixer()]

  return src(config.src.static)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssProcessors))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(config.dist.base))
    .pipe(filter('**/*.css'))
    .pipe(reload({ stream: true }))
}

/**
 * Task: CSS Watch
 */
export function cssWatch() {
  watch([config.src.staticAll, config.src.components], series(css))
}

/**
 * Task: CSS Lint
 * @returns {NodeJS.WritableStream}
 */
export function cssLint() {
  return src([
    config.src.staticAll,
    config.src.components,
    `!${config.src.vendor}`
  ]).pipe(
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
}
