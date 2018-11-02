/* eslint-disable sort-imports */

import gulp from 'gulp'
import runSequence from 'run-sequence'

// Load tasks
import './tasks/clean'
import './tasks/codestyle'
import './tasks/browsersync'
import './tasks/html'
import './tasks/img'
import './tasks/css'
import './tasks/docs'
import './tasks/fonts'
import './tasks/js'
import './tasks/upload'
import './tasks/githooks'
import './tasks/zip'

gulp.task('dev', cb => {
  return runSequence(
    'clean',
    ['docs', 'html', 'img', 'css', 'fonts'],
    [
      'js',
      'browsersync',
      'docs-watch',
      'html-watch',
      'img-watch',
      'css-watch',
      'fonts-watch'
    ],
    cb
  )
})

gulp.task('dist', cb =>
  runSequence('clean', ['docs', 'html', 'img', 'css', 'fonts', 'js'], 'zip', cb)
)

gulp.task('codequality', ['css-lint', 'js-lint'])

gulp.task('test', ['js-test'])

gulp.task('upload', cb => runSequence('dist', 'file-upload', cb))
