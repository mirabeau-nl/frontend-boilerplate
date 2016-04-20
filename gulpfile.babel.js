import 'babel-polyfill';
import gulp from 'gulp';
import runSequence from 'run-sequence';

// Load tasks
import './tasks/clean';
import './tasks/browsersync';
import './tasks/html';
import './tasks/img';
import './tasks/css';
import './tasks/docs';
import './tasks/fonts';
import './tasks/js';
import './tasks/upload';
import './tasks/githooks';
import './tasks/zip';

gulp.task('dev', cb => runSequence(
    'clean',
    ['docs', 'html', 'img', 'css', 'fonts', 'js'],
    ['browsersync', 'docs-watch', 'html-watch', 'img-watch', 'css-watch', 'fonts-watch', 'js-watch'],
    cb
));

gulp.task('dist', cb => runSequence(
    'clean',
    ['docs', 'html', 'img', 'css', 'fonts', 'js'],
    'zip',
    cb
));

gulp.task('lint', [
    'js-lint',
    'css-lint'
]);

gulp.task('test', [
    'js-test'
]);

gulp.task('upload', cb => runSequence(
    'dist',
    'file-upload',
    cb
));
