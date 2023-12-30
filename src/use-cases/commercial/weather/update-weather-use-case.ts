import { Prisma } from '@prisma/client'
import WeatherRepository, {
  IWeatherRepository
} from '@repositories/commercial/weather-repository'

export interface IUpdateWeatherUseCase {
  execute(data: Prisma.WeatherUpdateInput)
}

export default class UpdateWeatherUseCase implements IUpdateWeatherUseCase {
  constructor(
    private repository: IWeatherRepository = new WeatherRepository()
  ) {}

  async execute(data: Prisma.WeatherCreateInput) {
    return await this.repository.update(data.id, data)
  }
}
