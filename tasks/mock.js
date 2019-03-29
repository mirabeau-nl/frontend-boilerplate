import { mock as config } from '../config'
import { src, dest, watch, series } from 'gulp'
import { reload } from 'browser-sync'

/**
 * Task: Copy mock data
 * @returns {NodeJS.WritableStream}
 */
export function mock() {
  return src(config.src.mock)
    .pipe(dest(config.dist.mock))
    .pipe(reload({ stream: true }))
}

/**
 * Task: Mock watch
 */
export function mockWatch() {
  watch(config.src.mock, series(mock))
}
