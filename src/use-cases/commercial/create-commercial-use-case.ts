import BannerRepository, {
  IBannerRepository
} from '@repositories/commercial/banner-repository'
import ListWeatherUseCase, {
  IListWeatherUseCase
} from './weather/list-weather-use-case'
import NewsRepository, {
  INewsRepository
} from '@repositories/commercial/news-repository'
import { Commercial } from 'models/commercial'

export interface ICreateCommercialUseCase {
  execute(skip: number, limit: number): Promise<Commercial[]>
}

export default class CreateCommercialUseCase
  implements ICreateCommercialUseCase
{
  constructor(
    private newsRepository: INewsRepository = new NewsRepository(),
    private bannerRepository: IBannerRepository = new BannerRepository(),
    private listWeatherUseCase: IListWeatherUseCase = new ListWeatherUseCase()
  ) {}

  async execute(skip: number, limit: number) {
    var data: Commercial[] = []
    let news = await this.newsRepository.listWithPagination(skip, limit)
    let banners = await this.bannerRepository.list()
    let weathers = await this.listWeatherUseCase.execute()

    for (let i = 0; i < news.length; i++) {
      let weather = weathers[i % weathers.length]
      data.push({ weather, banners, news: news[i] })
    }

    return data
  }
}
