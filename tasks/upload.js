import { upload as config } from '../config'
import ftp from 'vinyl-ftp'
import { src } from 'gulp'
import { log } from 'gulp-util'

/**
 * Task: Upload via FTP
 * @returns {NodeJS.ReadWriteStream}
 */
export function fileUpload() {
  config.options.log = log

  return src([config.src.all], { base: config.dist.base, buffer: false }).pipe(
    ftp.create(config.options).dest(config.dist.target)
  )
}
