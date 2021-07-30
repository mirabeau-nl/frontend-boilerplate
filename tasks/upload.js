import { upload as config } from '../config'
import SftpUpload from 'sftp-upload'

/**
 * Task: Upload via FTP
 * @returns {NodeJS.Promise<String>}
 */
export function fileUpload() {
  return new Promise((resolve, reject) => {
    // Get private key from BASE64 environment variable =
    const buff = new Buffer.from(config.options.privateKey, 'base64')

    // Set the readable private key
    config.options.privateKey = buff

    // Prepare FTP upload
    const sftp = new SftpUpload(config.options)

    sftp
      .on('error', err => {
        return reject(err)
      })
      .on('uploading', progress => {
        // eslint-disable-next-line no-console
        console.info(
          `Uploading ${progress.percent}% completed – ${progress.file}`
        )
      })
      .on('completed', () => {
        return resolve('Upload complete')
      })
      .upload()
  })
}
