import { Prisma } from '@prisma/client'
import WeatherRepository, {
  IWeatherRepository
} from '@repositories/commercial/weather-repository'
import CreateCommercialUseCase, {
  ICreateCommercialUseCase
} from '../create-commercial-use-case'
import UpdateWeatherUseCase, {
  IUpdateWeatherUseCase
} from './update-weather-use-case'

export interface ICreateWeatherUseCase {
  execute(data: Prisma.WeatherCreateInput)
}

export default class CreateWeatherUseCase implements ICreateWeatherUseCase {
  constructor(
    private repository: IWeatherRepository = new WeatherRepository(),
    private createCommercialUseCase: ICreateCommercialUseCase = new CreateCommercialUseCase(),
    private updateWeatherUseCase: IUpdateWeatherUseCase = new UpdateWeatherUseCase()
  ) {}

  async execute(data: Prisma.WeatherCreateInput) {
    const alreadyExistWeather = await this.repository.findById(data.id)

    if (alreadyExistWeather) {
      this.updateWeatherUseCase.execute(alreadyExistWeather)
      return
    }

    let { id } = await this.repository.create(data)
    await this.createCommercialUseCase.execute({ weather: { connect: { id } } })
  }
}
