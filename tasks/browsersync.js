/* eslint-disable no-unused-vars */

import browsersync from 'browser-sync'
import { browsersync as config } from '../config'
import gulp from 'gulp'

/**
 * Task: BrowserSync HTTP server
 */
gulp.task('browsersync', cb => browsersync(config))
