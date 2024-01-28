import AWSManager from '@configs/aws'
import { UploadedFile } from 'express-fileupload'

export default class UploadBannersUseCase {
  constructor() {}

  async execute(
    files: UploadedFile | UploadedFile[]
  ): Promise<string | string[]> {
    let aws = new AWSManager()

    try {
      return await aws.upload('banners/', files)
    } catch (error) {
      throw new Error()
    }
  }
}
