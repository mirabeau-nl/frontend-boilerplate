/* eslint-disable sort-imports */

import { series, parallel } from 'gulp'

// Load tasks
import { clean } from './tasks/clean'
import { codestyle, codestyleIsValid } from './tasks/codestyle'
import { browserSync } from './tasks/browsersync'
import { html, htmlWatch, moveTemplatesToRoot } from './tasks/html'
import { img, imgWatch } from './tasks/img'
import { css, cssWatch, cssLint } from './tasks/css'
import { docs, docsWatch } from './tasks/docs'
import { fonts, fontsWatch } from './tasks/fonts'
import { js, jsLint, jsTest } from './tasks/js'
import { mock, mockWatch } from './tasks/mock'
import { fileUpload } from './tasks/upload'
import { publicFiles, publicFilesWatch } from './tasks/publicFiles'
import { githooks } from './tasks/githooks'
import { zip } from './tasks/zip'

function dev(cb) {
  return series(
    clean,
    parallel(docs, html, img, css, fonts, mock),
    parallel(
      js,
      browserSync,
      docsWatch,
      htmlWatch,
      imgWatch,
      cssWatch,
      fontsWatch,
      publicFilesWatch,
      mockWatch
    )
  )(cb)
}

function dist(cb) {
  const { argv } = process

  if (argv.includes('--static')) {
    return series(
      clean,
      parallel(html, img, css, fonts, publicFiles, js),
      moveTemplatesToRoot
    )(cb)
  }

  return series(
    clean,
    parallel(docs, html, img, css, fonts, publicFiles, mock, js),
    zip
  )(cb)
}

function codequality(cb) {
  return parallel(cssLint, jsLint)(cb)
}

function test(cb) {
  return series(jsTest)(cb)
}

function upload(cb) {
  return series(dist, fileUpload)(cb)
}

export {
  githooks,
  codestyle,
  codestyleIsValid,
  dev,
  dist,
  codequality,
  test,
  publicFiles,
  upload
}
