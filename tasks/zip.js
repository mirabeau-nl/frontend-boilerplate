import { readFileSync, writeFileSync } from 'fs'
import config from '../config'
import gulp from 'gulp'
import zip from 'gulp-zip'

/**
 * Write a-href to zip file to index.html
 */
const updateIndex = () => {
  // Read generated index.html
  const docsTpl = readFileSync(config.docs.dist.index, { encoding: 'utf8' })

  // Replace html comment with link
  const linkHtml = `<p><a href="${config.zip.filename}">Download ZIP</a></p>`
  const docsHtml = docsTpl.replace('<!--[[dist.zip]]-->', linkHtml)

  // Write new html
  writeFileSync(config.docs.dist.index, docsHtml)
}

/**
 * Task: Add content to zip archive
 */
gulp.task('zip', () => {
  return gulp
    .src([config.zip.src.all])
    .pipe(zip(config.zip.filename))
    .pipe(gulp.dest(config.zip.dist.base))
    .on('end', updateIndex)
})
