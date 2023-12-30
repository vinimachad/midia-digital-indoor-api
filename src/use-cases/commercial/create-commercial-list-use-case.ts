import ScrapJovemPanLatestNewsUseCase, {
  IScrapJovemPanLatestNewsUseCase
} from '@usecases/scrapping/scrap-jovem-pan-latest-news-use-case'
import GetWeatherCitiesUseCase, {
  IGetWeatherCitiesUseCase
} from '@usecases/weather/get-weather-cities-use-case'
import CreateCommercialUseCase, {
  ICreateCommercialUseCase
} from './create-commercial-use-case'

export interface ICreateCommercialListUseCase {
  execute()
}

export default class CreateCommercialListUseCase
  implements ICreateCommercialListUseCase
{
  constructor(
    private getWeatherCitiesUseCase: IGetWeatherCitiesUseCase = new GetWeatherCitiesUseCase(),
    private scrapJovemPanLatestNewsUseCase: IScrapJovemPanLatestNewsUseCase = new ScrapJovemPanLatestNewsUseCase(),
    private createCommercialUseCase: ICreateCommercialUseCase = new CreateCommercialUseCase()
  ) {}

  async execute() {
    const weatherData = await this.getWeatherCitiesUseCase.execute()
    const jpNews = await this.scrapJovemPanLatestNewsUseCase.execute()

    let maxLength = Math.max(jpNews.length, weatherData.length)

    for (let i = 0; i < maxLength; i++) {
      let weather = weatherData[i % weatherData.length]
      let news = jpNews[i % jpNews.length]
      await this.createCommercialUseCase.execute(weather, news)
    }
  }
}
