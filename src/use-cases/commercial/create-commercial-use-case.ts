import { Commercial, Prisma } from '@prisma/client'
import CommercialRepository, {
  ICommercialRepository
} from '@repositories/commercial/commercial-repository'

// type CommercialRequest = {
//   file?: Express.Multer.File
//   time_seconds: number
// }

export interface ICreateCommercialUseCase {
  execute(data: Prisma.CommercialCreateInput): Promise<void>
}

export default class CreateCommercialUseCase
  implements ICreateCommercialUseCase
{
  constructor(
    private commercialRepository: ICommercialRepository = new CommercialRepository()
  ) {}

  async execute(data: Prisma.CommercialCreateInput) {
    await this.commercialRepository.create(data)
  }
}
