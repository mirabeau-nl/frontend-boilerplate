import changed from 'gulp-changed'
import { img as config } from '../config'
import { src, dest, watch, series } from 'gulp'
import imagemin from 'gulp-imagemin'

/**
 * Task: Image optimizer
 * @returns {NodeJS.WritableStream}
 */
export function img() {
  return src(config.src.all)
    .pipe(changed(config.dist.base))
    .pipe(imagemin())
    .pipe(dest(config.dist.base))
}

/**
 * Task: Image Watch
 */
export function imgWatch() {
  watch(config.src.all, series(img))
}
