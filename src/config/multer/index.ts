import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3'
import crypto from 'crypto'

const region = process.env.AWS_S3_REGION ?? ''
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID ?? ''
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY ?? ''

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

const local = multer.diskStorage({
  destination: './upload',
  filename(req, file, callback) {
    callback(null, file.originalname)
  }
})

const remote = multerS3({
  s3,
  acl: 'public-read',
  bucket: 'midia-digital-indoor-images',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err)
      let folder = 'commercials/'
      const fileName = folder + `${hash.toString('hex')}-${file.originalname}`
      cb(null, fileName)
    })
  }
})

const multerStorage = { local, remote }

export default multerStorage
