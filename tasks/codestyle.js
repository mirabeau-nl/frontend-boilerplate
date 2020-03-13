import { codestyle as config } from '../config'
import fs from 'fs'
import ignore from 'ignore' // introduced in 5.0.0
import Observable from 'zen-observable'
import path from 'path'
import prettier from 'prettier'
import pkg from '../package.json'
import { sync as glob } from 'glob'

function globVinyl(pattern) {
  return glob(pattern).map(file => ({ path: file }))
}

function readVinyl(vinyl) {
  vinyl.contents = fs.readFileSync(vinyl.path, 'utf8')
  return vinyl
}

function writeVinyl(vinyl) {
  fs.writeFileSync(vinyl.path, vinyl.contents, 'utf8')
  return vinyl
}

function prettierFormat(vinyl) {
  const prettierOpt = Object.assign({ filepath: vinyl.path }, pkg.prettier)
  const newContents = prettier.format(vinyl.contents, prettierOpt)
  vinyl.prettierWasFormatted = vinyl.contents !== newContents
  vinyl.contents = newContents
  return vinyl
}

function prettierCheck(vinyl) {
  const prettierOpt = Object.assign({ filepath: vinyl.path }, pkg.prettier)
  vinyl.prettierIsInvalid = !prettier.check(vinyl.contents, prettierOpt)
  return vinyl
}

function makeFilter(ignoreFile) {
  const ignoreList = fs.readFileSync(ignoreFile, 'utf8').split(/\r?\n/)
  const filter = ignore().add(ignoreList)
  return vinyl => !filter.ignores(vinyl.path)
}

function reduceResult(prev, curr) {
  const isInvalid = prev.isInvalid || 0
  const wasFormatted = prev.hasFormatted || 0
  return {
    isInvalid: curr.prettierIsInvalid ? isInvalid + 1 : isInvalid,
    hasFormatted: curr.prettierWasFormatted ? wasFormatted + 1 : wasFormatted
  }
}

function printResult(result, cb) {
  if (result.hasFormatted) {
    console.warn(
      `\nCode style: Prettier formatted ${result.hasFormatted} files.\n`
    )
  }

  if (result.isInvalid) {
    console.error(
      `\nCode style: Prettier found ${result.isInvalid} incorrectly formatted files.\n`
    )

    process.exit(1)

    return cb()
  }

  return cb()
}

/**
 * Task: Codestyle
 *  Formats all code according to style throughout the app
 *  Corresponds to:
 *   $ prettier --write --ignore-path .lintignore "**\/*.{md,css,scss,js,json}"
 * @param {Object} cb - Gulp callback function
 * @returns {Object}
 */
export function codestyle(cb) {
  return Observable.from(globVinyl(config.glob))
    .filter(makeFilter(config.ignorefile))
    .map(readVinyl)
    .map(prettierFormat)
    .map(writeVinyl)
    .reduce(reduceResult)
    .subscribe(result => printResult(result, cb))
}

/**
 * Task: Is Valid Codestyle?
 *  Checks for valid codestyle usage throughout the app,
 *   exits with non-zero if the codestyle does not pass.
 *  Corresponds to:
 *   $ prettier --list-different --ignore-path .lintignore "**\/*.{md,css,scss,js,json}"
 * @param {Object} cb - Gulp callback function
 * @returns {Object}
 */
export function codestyleIsValid(cb) {
  return Observable.from(globVinyl(config.glob))
    .filter(makeFilter(config.ignorefile))
    .map(readVinyl)
    .map(prettierCheck)
    .reduce(reduceResult)
    .subscribe(result => printResult(result, cb))
}
