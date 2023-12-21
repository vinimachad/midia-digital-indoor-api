import CommercialRepository, {
  ICommercialRepository
} from '@repositories/commercial/commercial-repository'

type CommercialRequest = {
  file?: Express.Multer.File
  time_seconds: number
}

export interface ICreateCommercialUseCase {
  execute(data: CommercialRequest): void
}

export default class CreateCommercialUseCase
  implements ICreateCommercialUseCase
{
  constructor(
    private commercialRepository: ICommercialRepository = new CommercialRepository()
  ) {}

  async execute(data: CommercialRequest) {
    // if (!data) {
    //   throw new Error('Precisamos de todos os dados para criar uma propaganda')
    // }
    // await this.commercialRepository.create(data)
  }
}
