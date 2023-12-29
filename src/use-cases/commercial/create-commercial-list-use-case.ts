import ScrapJovemPanLatestNewsUseCase, {
  IScrapJovemPanLatestNewsUseCase
} from '@usecases/scrapping/scrap-jovem-pan-latest-news-use-case'
import GetWeatherCitiesUseCase, {
  IGetWeatherCitiesUseCase
} from '@usecases/weather/get-weather-cities-use-case'
import CreateNewsUseCase, {
  ICreateNewsUseCase
} from './news/create-news-use-case'
import CreateWeatherUseCase, {
  ICreateWeatherUseCase
} from './weather/create-weather-use-case'

export interface ICreateCommercialListUseCase {
  execute()
}

export default class CreateCommercialListUseCase
  implements ICreateCommercialListUseCase
{
  constructor(
    private getWeatherCitiesUseCase: IGetWeatherCitiesUseCase = new GetWeatherCitiesUseCase(),
    private scrapJovemPanLatestNewsUseCase: IScrapJovemPanLatestNewsUseCase = new ScrapJovemPanLatestNewsUseCase(),
    private createNewsUseCase: ICreateNewsUseCase = new CreateNewsUseCase(),
    private createWeatherUseCase: ICreateWeatherUseCase = new CreateWeatherUseCase()
  ) {}

  async execute() {
    const weatherData = await this.getWeatherCitiesUseCase.execute()
    const jpNews = await this.scrapJovemPanLatestNewsUseCase.execute()

    let maxLength = Math.max(jpNews.length, weatherData.length)

    for (let i = 0; i < maxLength; i++) {
      if (i < jpNews.length) {
        await this.createNewsUseCase.execute(jpNews[i])
      }

      if (i < weatherData.length) {
        let weather = weatherData[i]
        await this.createWeatherUseCase.execute(weather)
      }
    }
  }
}
