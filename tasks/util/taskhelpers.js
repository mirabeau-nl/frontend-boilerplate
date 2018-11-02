import { js as config } from '../../config'
import { readFileSync, writeFileSync } from 'fs'
import mkdirp from 'mkdirp'
import path from 'path'
import uglifyjs from 'uglify-js'
import babelify from 'babelify'

const buildHelpers = require(`${__dirname}/../../node_modules/babel-core/lib/tools/build-external-helpers`)

module.exports = {
  /**
   * Capture which babel helpers are actually used
   * @param {Object} tr - The transform passed in
   * @param {String[]} usedBabelHelpers - The array of babel helpers, passed by reference
   */
  collectUsedBabelHelpers: (tr, usedBabelHelpers) => {
    /* eslint consistent-return: 0 */
    if (tr instanceof babelify) {
      tr.once('babelify', result =>
        result.metadata.usedHelpers.map(helper => usedBabelHelpers.push(helper))
      )
    }
  },

  /**
   * Write-out babel-helpers
   * @param {String[]} usedBabelHelpers - The array of babel helpers, passed by reference
   */
  writeBabelHelpers: usedBabelHelpers => {
    /* eslint max-statements: 0 */

    // Create babel helpers js directory and write file
    mkdirp(path.dirname(config.dist.babelHelpers))
    writeFileSync(config.dist.babelHelpers, buildHelpers(usedBabelHelpers))

    const pwd = process.cwd()
    const filename = path.relative(config.dist.base, config.dist.babelHelpers)

    // Sourcemap: Make sure the 'sourceMappingURL' is correct
    process.chdir(config.dist.base)

    const fileContent = readFileSync(filename, 'utf8')

    const minified = uglifyjs.minify(fileContent, {
      sourceMap: {
        filename: `${path.basename(filename)}.map`,
        root: '/source/',
        includeSources: true
      },
      output: {
        code: true
      }
    })

    if (minified.error) {
      global.console.error(`Error minifying: ${minified.error}`)
    }

    process.chdir(pwd)

    // Write babel helpers
    writeFileSync(config.dist.babelHelpers, minified.code)

    // Sourcemap: Make sure the 'file' property is correct
    const sourcemap = JSON.parse(minified.map)
    sourcemap.file = filename
    minified.map = JSON.stringify(sourcemap)

    writeFileSync(`${config.dist.babelHelpers}.map`, minified.map)
  }
}
