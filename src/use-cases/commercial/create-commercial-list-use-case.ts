import ScrapJovemPanLatestNewsUseCase, {
  IScrapJovemPanLatestNewsUseCase
} from '@usecases/scrapping/scrap-jovem-pan-latest-news-use-case'
import GetWeatherCitiesUseCase, {
  IGetWeatherCitiesUseCase
} from '@usecases/weather/get-weather-cities-use-case'
import { WeatherRequest } from '@usecases/weather/get-weather-city-by-id-use-case'
import { News } from 'models/news-model'

export interface ICreateCommercialListUseCase {
  execute()
}

export default class CreateCommercialListUseCase
  implements ICreateCommercialListUseCase
{
  constructor(
    private getWeatherCitiesUseCase: IGetWeatherCitiesUseCase = new GetWeatherCitiesUseCase(),
    private scrapJovemPanLatestNewsUseCase: IScrapJovemPanLatestNewsUseCase = new ScrapJovemPanLatestNewsUseCase()
  ) {}

  async execute() {
    const weatherData = await this.getWeatherCitiesUseCase.execute()
    const jpNews = await this.scrapJovemPanLatestNewsUseCase.execute()
    return this.buildCommercialList(jpNews, weatherData)
  }

  private buildCommercialList(news: News[], weatherData: WeatherRequest[]) {
    let maxLength = Math.max(news.length, weatherData.length)
    let data: { news?: News; weather?: WeatherRequest }[] = []
    for (let i = 0; i < maxLength; i++) {
      data.push({ news: news[i % news.length] })
      data.push({ weather: weatherData[i % weatherData.length] })
    }
    return data
  }
}
