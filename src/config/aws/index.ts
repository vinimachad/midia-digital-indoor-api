import { StreamingBlobPayloadInputTypes } from '@smithy/types'
import aws from 'aws-sdk'
import { randomUUID } from 'crypto'

export type File = {
  name: string
  data: StreamingBlobPayloadInputTypes
}

export type UploadReturn = {
  fileName: string
  url: string
}

export default class AWSManager {
  private region = process.env.AWS_S3_REGION ?? ''
  private accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID ?? ''
  private secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY ?? ''
  private bucket = process.env.AWS_S3_BUCKET ?? ''

  private s3 = new aws.S3({
    region: this.region,
    credentials: {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey
    }
  })

  delete(path: string, image: string) {
    return new Promise<void>((resolve, reject) => {
      this.s3.deleteObject(
        {
          Bucket: this.bucket,
          Key: path + image
        },
        () => resolve()
      )
    })
  }

  async upload(path: string, files: File[] | File) {
    if (Array.isArray(files)) {
      var uploads: UploadReturn[] = []
      for (let file of files) {
        let upload = await this.uploadFile(path, file)
        uploads.push(upload)
      }
      return uploads
    } else {
      return await this.uploadFile(path, files)
    }
  }

  private async uploadFile(path: string, file: File) {
    let bucket = process.env.AWS_S3_BUCKET ?? ''
    let uuid = randomUUID()
    let fileName = uuid + file.name.replaceAll(' ', '')
    let url = `https://${bucket}.s3.sa-east-1.amazonaws.com/${path}${fileName}`

    const bucketParams = {
      Bucket: bucket,
      Key: path + fileName,
      Body: file.data
    }

    return new Promise<UploadReturn>(async (resolve, reject) => {
      this.s3.putObject(bucketParams, (err, _) => {
        if (err) {
          reject(err)
        } else {
          resolve({ url, fileName })
        }
      })
    })
  }
}
