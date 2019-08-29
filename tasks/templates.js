import { base, html } from '../config'
import { src, dest, series } from 'gulp'
import del from 'del'

/**
 * Sub-task: Copy templates to root of dist folder
 * @returns {NodeJS.WritableStream}
 */
function copyTemplates() {
  return src([`${html.dist.base}/**/*`])
    .pipe(dest(base.dist))
}

/**
 * Sub-task: Delete "dist/templates/" folder
 * @returns {Object}
 */
function delDistFolder() {
  return del(html.dist.base)
}

/**
 * Task: Move files from "dist/templates" to "dist/" folder after the dist command
 * @param {Object} cb - Gulp callback function
 * @returns {Object}
 */
export const templates = cb => series(copyTemplates, delDistFolder)(cb)