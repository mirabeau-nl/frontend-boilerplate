import { githooks as config } from '../config'
import del from 'del'
import { src, dest, series } from 'gulp'

/**
 * Sub-task: Delete Git hooks dist folder
 * @returns {NodeJS.WritableStream}
 */
function cleanHooks() {
  return del(config.dist.all)
}

/**
 * Sub-task: Copy pre-configured Git hooks to .git folder
 * @returns {NodeJS.WritableStream}
 */
function copyHooks() {
  return src(config.src.all).pipe(dest(config.dist.base, { mode: '0500' }))
}

/**
 * Task: Copy Git hooks
 * @param {Object} cb - Gulp callback function
 * @returns {Object}
 */
export const githooks = cb => series(cleanHooks, copyHooks)(cb)
