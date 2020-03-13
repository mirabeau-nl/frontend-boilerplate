import config from '../config'
import { src, dest, series } from 'gulp'
import eslint from 'gulp-eslint'
import mocha from 'gulp-mocha'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify-es'
import sourcemaps from 'gulp-sourcemaps'
import glob from 'glob'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import { reload } from 'browser-sync'

const task = process.argv[process.argv.length - 1]
const isFixed = file => file.eslint && file.eslint.fixed

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
      .pipe(dest(config.js.dist.base))
      .pipe(reload({ stream: true }))

  bundler.on('update', bundle)

  return bundle()
}

const jsBrowserify = done => {
  const opts = config.js.browserify

  if (task === 'dev') {
    opts.plugin = opts.plugin.concat('watchify')
  }

  glob(config.js.src.bundles, (err, files) => {
    if (err) {
      done(err)
    }

    const tasks = files
      .map(file => bundleFile(file, opts))
      .map(bundle => new Promise(resolve => bundle.on('finish', resolve)))

    Promise.all(tasks)
      .then(() => done())
      .catch(done)
  })
}

/**
 * Task: JS Compile
 * @param {Object} cb - Gulp callback function
 * @returns {Object}
 */
export function js(cb) {
  return series(jsBrowserify)(cb)
}

/**
 * Task: JS Lint
 * @returns {stream}
 */
export function jsLint() {
  const paths = [
    './gulpfile.babel.js',
    './config.js',
    './tasks/**/*.js',
    config.js.src.all,
    config.js.src.components,
    `!${config.js.src.vendor}`
  ]

  return src(paths)
    .pipe(
      eslint({
        fix: config.js.eslintAutofix,
        ignorePath: config.codestyle.ignorefile
      })
    )
    .pipe(eslint.format())
    .pipe(gulpif(isFixed, dest(file => file.base)))
    .pipe(eslint.failAfterError())
}

/**
 * Task: JS unit tests
 * @returns {NodeJS.WritableStream}
 */
export function jsTest() {
  return src([config.js.src.tests]).pipe(
    mocha({
      compilers: ['js:@babel/register']
    })
  )
}
