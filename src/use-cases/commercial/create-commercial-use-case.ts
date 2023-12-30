import CommercialRepository, {
  ICommercialRepository
} from '@repositories/commercial/commercial-repository'
import { WeatherRequest } from '@usecases/weather/get-weather-city-by-id-use-case'
import { News } from 'models/news-model'
import CreateWeatherUseCase, {
  ICreateWeatherUseCase
} from './weather/create-weather-use-case'

export interface ICreateCommercialUseCase {
  execute(weather: WeatherRequest, news: News): Promise<void>
}

export default class CreateCommercialUseCase
  implements ICreateCommercialUseCase
{
  constructor(
    private createWeatherUseCase: ICreateWeatherUseCase = new CreateWeatherUseCase(),
    private commercialRepository: ICommercialRepository = new CommercialRepository()
  ) {}

  async execute(weather: WeatherRequest, news: News) {
    let existsCommercial = await this.commercialRepository.findByNewsId(news.id)

    let updatedOrCreatedWeather =
      await this.createWeatherUseCase.execute(weather)

    if (existsCommercial) {
      await this.commercialRepository.update(existsCommercial.id, {
        weather: {
          update: updatedOrCreatedWeather,
          connectOrCreate: {
            where: { id: updatedOrCreatedWeather.id },
            create: updatedOrCreatedWeather
          }
        }
      })
      return
    }

    await this.commercialRepository.create({
      news: { create: news },
      weather: { connect: { id: updatedOrCreatedWeather.id } }
    })
  }
}
