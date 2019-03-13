import browsersync from 'browser-sync'
import { browsersync as config } from '../config'
import { series } from 'gulp'

/**
 * Initialize BrowserSync
 * @returns {Object}
 */
function setupBrowserSync() {
  return browsersync(config)
}

/**
 * Task: BrowserSync HTTP server
 * @param {Object} cb - Gulp callback function
 * @returns {Object}
 */
export const browserSync = cb => series(setupBrowserSync)(cb)
