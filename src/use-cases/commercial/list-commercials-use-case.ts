import CommercialRepository, {
  ICommercialRepository
} from '@repositories/commercial/commercial-repository'
import ListNewsUseCase, { IListNewsUseCase } from './news/list-news-use-case'
import ListWeatherUseCase, {
  IListWeatherUseCase
} from './weather/list-weather-use-case'
import { Commercial } from 'models/commercial'

export interface IListCommercialsUseCase {
  execute(): Promise<Commercial[]>
}

export default class ListCommercialsUseCase implements IListCommercialsUseCase {
  constructor(
    private listNewsUseCase: IListNewsUseCase = new ListNewsUseCase(),
    private listWeatherUseCase: IListWeatherUseCase = new ListWeatherUseCase()
  ) {}

  async execute() {
    let news = await this.listNewsUseCase.execute()
    let weatherData = await this.listWeatherUseCase.execute()

    let maxLength = Math.max(news.length, weatherData.length)
    let data: Commercial[] = []

    for (let i = 0; i < maxLength; i++) {
      let newsPost = news[i % news.length]
      let weather = weatherData[i % weatherData.length]
      data.push({ news: newsPost })
      data.push({ weather })
    }

    return data
  }
}
