import { public as config } from '../config'
import { src, dest, watch, series } from 'gulp'
import { reload } from 'browser-sync'

/**
 * Task: Copy public
 * @returns {NodeJS.WritableStream}
 */
export function publicFiles() {
  return src(config.src)
    .pipe(dest(config.dist))
    .pipe(reload({ stream: true }))
}

/**
 * Task: public watch
 */
export function publicFilesWatch() {
  watch(config.src.public, series(publicFiles))
}
