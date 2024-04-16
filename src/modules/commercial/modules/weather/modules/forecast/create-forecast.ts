import { Prisma } from '@prisma/client'
import ForecastRepository, { IForecastRepository } from './repository'

export interface ICreateForecastUseCase {
  execute(weatherId: string, data: Prisma.ForecastCreateInput)
}

export default class CreateForecastUseCase implements ICreateForecastUseCase {
  constructor(private repository: IForecastRepository = new ForecastRepository()) {}

  async execute(weatherId: string, data: Prisma.ForecastCreateInput) {
    let alreadyExistsForecast = await this.repository.findByWeatherId(weatherId, data.index)

    if (alreadyExistsForecast) {
      await this.repository.update(alreadyExistsForecast.id, data)
      return
    }

    await this.repository.create(data)
  }
}
