import CreateManyNewsUseCase, { ICreateManyNewsUseCase } from '../modules/news/use-cases/crete-many-news'
import ScrapJovemPanLatestNewsUseCase, {
  IScrapJovemPanLatestNewsUseCase
} from '../modules/news/use-cases/scrap-jovem-pan-latest-news'
import CreateWeatherUseCase, { ICreateWeatherUseCase } from '../modules/weather/use-cases/create-weather'
import GetWeatherCitiesUseCase, { IGetWeatherCitiesUseCase } from '../modules/weather/use-cases/get-weather-cities'
import { WeatherRequest } from '../modules/weather/use-cases/get-weather-city-by-id'

export interface ICreateCommercialListUseCase {
  execute()
}

export default class CreateCommercialListUseCase implements ICreateCommercialListUseCase {
  constructor(
    private getWeatherCitiesUseCase: IGetWeatherCitiesUseCase = new GetWeatherCitiesUseCase(),
    private scrapJovemPanLatestNewsUseCase: IScrapJovemPanLatestNewsUseCase = new ScrapJovemPanLatestNewsUseCase(),
    private createManyNewsUseCase: ICreateManyNewsUseCase = new CreateManyNewsUseCase(),
    private createWeatherUseCase: ICreateWeatherUseCase = new CreateWeatherUseCase()
  ) {}

  async execute() {
    const weatherData = await this.getWeatherCitiesUseCase.execute()
    const jpNews = await this.scrapJovemPanLatestNewsUseCase.execute()

    await this.createManyNewsUseCase.execute(jpNews)
    await this.createManyWeathers(weatherData)
  }

  private async createManyWeathers(data: WeatherRequest[]) {
    for (let item of data) {
      await this.createWeatherUseCase.execute(item)
    }
  }
}
