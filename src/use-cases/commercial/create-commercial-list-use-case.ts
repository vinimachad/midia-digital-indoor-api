import ScrapJovemPanLatestNewsUseCase, {
  IScrapJovemPanLatestNewsUseCase
} from '@usecases/scrapping/scrap-jovem-pan-latest-news-use-case'
import GetWeatherCitiesUseCase, {
  IGetWeatherCitiesUseCase
} from '@usecases/weather/get-weather-cities-use-case'
import CreateManyNewsUseCase, {
  ICreateManyNewsUseCase
} from './news/crete-many-news-use-case'
import CreateWeatherUseCase, {
  ICreateWeatherUseCase
} from './weather/create-weather-use-case'
import { WeatherRequest } from '@usecases/weather/get-weather-city-by-id-use-case'

export interface ICreateCommercialListUseCase {
  execute()
}

export default class CreateCommercialListUseCase
  implements ICreateCommercialListUseCase
{
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
    // let maxLength = Math.max(jpNews.length, weatherData.length)

    // for (let i = 0; i < maxLength; i++) {
    //   let weather = weatherData[i % weatherData.length]
    //   let news = jpNews[i % jpNews.length]
    //   await this.createCommercialUseCase.execute(weather, news)
    // }
  }

  private async createManyWeathers(data: WeatherRequest[]) {
    for (let item of data) {
      await this.createWeatherUseCase.execute(item)
    }
  }
}
