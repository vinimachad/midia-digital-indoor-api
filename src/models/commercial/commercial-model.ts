import AWSManager from '@configs/aws'
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
      let url = await aws.upload('commercials/', { name: data.file.name, data: data.file.data })
      let uploadUrl: string = ''

      if (typeof url === 'string') {
        uploadUrl = url
      } else if (Array.isArray(url)) {
        uploadUrl = url[0]
      }

      await commercialRepository.create({
        url: uploadUrl,
        index: Number(data.index),
        title: data.title,
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
