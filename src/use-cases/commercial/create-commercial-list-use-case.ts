import ScrapJovemPanLatestNewsUseCase, {
  IScrapJovemPanLatestNewsUseCase
} from '@usecases/scrapping/scrap-jovem-pan-latest-news-use-case'
import GetWeatherCitiesUseCase, {
  IGetWeatherCitiesUseCase
} from '@usecases/weather/get-weather-cities-use-case'
import { WeatherRequest } from '@usecases/weather/get-weather-city-by-id-use-case'
import { News } from 'models/news-model'
import CreateNewsUseCase, {
  ICreateNewsUseCase
} from './news/create-news-use-case'

export interface ICreateCommercialListUseCase {
  execute()
}

export default class CreateCommercialListUseCase
  implements ICreateCommercialListUseCase
{
  constructor(
    private getWeatherCitiesUseCase: IGetWeatherCitiesUseCase = new GetWeatherCitiesUseCase(),
    private scrapJovemPanLatestNewsUseCase: IScrapJovemPanLatestNewsUseCase = new ScrapJovemPanLatestNewsUseCase(),
    private createNewsUseCase: ICreateNewsUseCase = new CreateNewsUseCase()
  ) {}

  async execute() {
    const weatherData = await this.getWeatherCitiesUseCase.execute()
    const jpNews = await this.scrapJovemPanLatestNewsUseCase.execute()
    return await this.buildCommercialList(jpNews, weatherData)
  }

  private async buildCommercialList(
    news: News[],
    weatherData: WeatherRequest[]
  ) {
    let maxLength = Math.max(news.length, weatherData.length)
    let data: { news?: News; weather?: WeatherRequest }[] = []
    for (let i = 0; i < maxLength; i++) {
      let newsPost = news[i % news.length]
      await this.createNewsUseCase.execute(newsPost)
      data.push({ news: news[i % news.length] })
      data.push({ weather: weatherData[i % weatherData.length] })
    }
    return data
  }
}
