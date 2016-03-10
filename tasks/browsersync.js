import { browsersync as config } from '../config';
import browsersync from 'browser-sync';
import gulp from 'gulp';

/**
 * Task: BrowserSync HTTP server
 */
gulp.task('browsersync', function(cb) { /* eslint no-unused-vars: 0 */
    browsersync(config);
});
