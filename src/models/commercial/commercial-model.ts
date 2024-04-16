import AWSManager, { UploadReturn } from '@configs/aws'
import AppError from '@middlewares/error/error-model'
import { ICommercialRepository } from '@repositories/commercial/commercial-repository'
import { CommercialAnalysis } from '@type/commercial'

export interface ICommercialModel {
  createCommercialAnalysis(data: CommercialAnalysis.Request): Promise<void>
}

export type CommercialModelDTO = {
  aws: AWSManager
  commercialRepository: ICommercialRepository
}

export default ({ aws, commercialRepository }: CommercialModelDTO): ICommercialModel => {
  async function createCommercialAnalysis(data: CommercialAnalysis.Request) {
    try {
      const commercials = await commercialRepository.findManyByUserId(data.userId)
      const selectedCommercial = commercials.find((commercial) => commercial.index === Number(data.index))
      const filePath = 'commercials/'

      let { url, fileName } = (await aws.upload(filePath, {
        name: data.file.name,
        data: data.file.data
      })) as UploadReturn

      if (selectedCommercial) {
        await commercialRepository.update(selectedCommercial.id, {
          url: url,
          title: data.title,
          file_path: filePath,
          file_name: fileName,
          index: Number(data.index),
          description: data.description
        })
        await aws.delete(filePath, selectedCommercial.file_name ?? '')
        return
      }

      await commercialRepository.create({
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

  return {
    createCommercialAnalysis
  }
}
