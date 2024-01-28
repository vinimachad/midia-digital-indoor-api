import { StreamingBlobPayloadInputTypes } from '@smithy/types'
import aws from 'aws-sdk'

export type File = {
  name: string
  data: StreamingBlobPayloadInputTypes
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
    this.s3.deleteObject({
      Bucket: this.bucket,
      Key: path + image
    })
  }

  async upload(path: string, files: File[] | File) {
    if (Array.isArray(files)) {
      var urls: string[] = []
      for (let file of files) {
        let url = await this.uploadFile(path, file)
        urls.push(url)
      }
      return urls
    } else {
      return await this.uploadFile(path, files)
    }
  }

  private async uploadFile(path: string, file: File) {
    let bucket = process.env.AWS_S3_BUCKET ?? ''
    let fileName = file.name.replaceAll(' ', '')
    let url = `https://${bucket}.s3.sa-east-1.amazonaws.com/${path}${fileName}`

    const bucketParams = {
      Bucket: bucket,
      Key: path + fileName,
      Body: file.data
    }

    return new Promise<string>(async (resolve, reject) => {
      this.s3.putObject(bucketParams, (err, _) => {
        if (err) {
          reject(err)
        } else {
          resolve(url)
        }
      })
    })
  }
}
