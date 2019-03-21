import { fonts as config } from '../config'
import { src, dest, watch, series } from 'gulp'
import { reload } from 'browser-sync'

/**
 * Task: Copy fonts
 * @returns {NodeJS.WritableStream}
 */
export function fonts() {
  return src(config.src.fonts)
    .pipe(dest(config.dist.fonts))
    .pipe(reload({ stream: true }))
}

/**
 * Task: Fonts watch
 */
export function fontsWatch() {
  watch(config.src.fonts, series(fonts))
}
