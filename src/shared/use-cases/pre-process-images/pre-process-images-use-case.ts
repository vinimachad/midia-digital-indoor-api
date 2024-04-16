import { UploadedFile } from 'express-fileupload'
import path from 'path'
import sharp from 'sharp'

export interface IPreProcessImagesUseCase {
  execute(file?: UploadedFile)
}

export default class PreProcessImagesUseCase implements IPreProcessImagesUseCase {
  async execute(file?: UploadedFile): Promise<void> {
    if (!file) {
      throw new Error('Precisamos de um arquivo')
    }

    let in_local_file_path = path.join(__dirname, '..', '..', '..', '/upload', file?.name ?? '')

    let out_local_file_path = path.join(__dirname, '..', '..', '..', '/upload', '/processed-images', file?.name ?? '')

    try {
      await new Promise((resolve, reject) => {
        sharp(in_local_file_path)
          .resize(640, 426)
          .jpeg({ quality: 60 })
          .png({ quality: 60 })
          .toFile(out_local_file_path, (err, result) => (err ? reject(err) : resolve(result)))
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
