import config from '../config'
import gulp from 'gulp'
import eslint from 'gulp-eslint'
import mocha from 'gulp-mocha'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import glob from 'glob'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import { reload } from 'browser-sync'

const task = process.argv[process.argv.length - 1]
const isFixed = file => file.eslint && file.eslint.fixed

/**
 * Task: JS Lint
 */
gulp.task('js-lint', () => {
  const src = [
    './gulpfile.babel.js',
    './config.js',
    './tasks/**/*.js',
    config.js.src.all,
    config.js.src.components,
    `!${config.js.src.vendor}`
  ]

  return gulp
    .src(src)
    .pipe(
      eslint({
        fix: config.js.eslintAutofix,
        ignorePath: config.codestyle.ignorefile
      })
    )
    .pipe(eslint.format())
    .pipe(gulpif(isFixed, gulp.dest(file => file.base)))
    .pipe(eslint.failAfterError())
})

/**
 * Task: JS Compile
 */
gulp.task('js', ['js-browserify'])

/**
 * Task: JS unit tests
 */
gulp.task('js-test', () => {
  return gulp.src([config.js.src.tests]).pipe(
    mocha({
      compilers: ['js:@babel/register']
    })
  )
})

const bundleFile = (file, opts) => {
  const bundler = browserify(file, opts)

  const bundle = () =>
    bundler
      .bundle()
      .pipe(source(file))
      .pipe(rename({ dirname: '' }))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.js.dist.base))
      .pipe(reload({ stream: true }))

  bundler.on('update', bundle)

  return bundle()
}

/**
 * Task: JS Browserify
 */
gulp.task('js-browserify', done => {
  const opts = config.js.browserify

  if (task === 'dev') {
    opts.plugin = opts.plugin.concat('watchify')
  }

  glob(config.js.src.bundles, (err, files) => {
    if (err) done(err)

    const tasks = files
      .map(file => bundleFile(file, opts))
      .map(bundler => new Promise(resolve => bundler.on('end', resolve)))

    Promise.all(tasks).then(done)
  })
})
