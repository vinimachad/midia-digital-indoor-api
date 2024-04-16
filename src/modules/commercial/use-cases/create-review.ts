import AWSManager, { UploadReturn } from '@configs/aws'
import AppError from '@shared/middlewares/error/error-model'
import { CommercialAnalysis } from '@shared/types/commercial'
import { ICommercialRepository } from '../repository'

export interface ICreateReviewUseCase {
  execute(data: CommercialAnalysis.Request): Promise<void>
}

export type CommercialModelDTO = {
  aws: AWSManager
  commercialRepository: ICommercialRepository
}

export default class CreateReviewUseCase implements ICreateReviewUseCase {
  constructor(
    private aws: AWSManager,
    private commercialRepository: ICommercialRepository
  ) {}

  async execute(data: CommercialAnalysis.Request) {
    try {
      const commercials = await this.commercialRepository.findManyByUserId(data.userId)
      const selectedCommercial = commercials.find((commercial) => commercial.index === Number(data.index))
      const filePath = 'commercials/'
      const { fileName, url } = await this.uploadFile(filePath, data.file.name, data.file.data)

      if (selectedCommercial) {
        await this.commercialRepository.update(selectedCommercial.id, {
          url: url,
          title: data.title,
          file_path: filePath,
          file_name: fileName,
          index: Number(data.index),
          description: data.description
        })
        await this.aws.delete(filePath, selectedCommercial.file_name ?? '')
        return
      }

      await this.commercialRepository.create({
        url: url,
        title: data.title,
        file_path: filePath,
        file_name: fileName,
        index: Number(data.index),
        description: data.description,
        user: { connect: { id: data.userId } }
      })
    } catch (error) {
      throw new AppError({
        status_code: 400,
        title: 'Ocorreu um erro',
        message: 'Tivemos um erro ao realizar o seu upload, tente novamente mais tarde'
      })
    }
  }

  private async uploadFile(filePath: string, fileName: string, data: Buffer) {
    return (await this.aws.upload(filePath, {
      data,
      name: fileName
    })) as UploadReturn
  }
}
