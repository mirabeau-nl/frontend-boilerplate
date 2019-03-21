import { clean as config } from '../config'
import del from 'del'
import { series } from 'gulp'

/**
 * Sub-task: Delete dist folder
 * @returns {Object}
 */
function cleanDist() {
  return del(config.dist.base)
}

/**
 * Task: Clean "dist/" folder
 * @param {Object} cb - Gulp callback function
 * @returns {Object}
 */
export const clean = cb => series(cleanDist)(cb)
