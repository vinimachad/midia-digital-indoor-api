import NewsRepository, {
  INewsRepository
} from '@repositories/commercial/news-repository'
import ListWeatherUseCase, {
  IListWeatherUseCase
} from './weather/list-weather-use-case'
import BannerRepository, {
  IBannerRepository
} from '@repositories/commercial/banner-repository'
import CreateCommercialUseCase, {
  ICreateCommercialUseCase
} from './create-commercial-use-case'
import { skip } from 'node:test'

export type CommercialsPaginated = {
  totalPages: number
  currentPage: number
  previous?: number
  next?: {
    page: number
    limit: number
  }
  data: any[]
}

export interface IListCommercialsUseCase {
  execute(skip: number, take: number): Promise<CommercialsPaginated>
}

export default class ListCommercialsUseCase implements IListCommercialsUseCase {
  constructor(
    private newsRepository: INewsRepository = new NewsRepository(),
    private createCommercialUseCase: ICreateCommercialUseCase = new CreateCommercialUseCase()
  ) {}

  async execute(page: number, limit: number): Promise<CommercialsPaginated> {
    let pagination = await this.paginate(page, limit)

    const data = await this.createCommercialUseCase.execute(
      pagination.skip,
      limit
    )
    return {
      ...pagination,
      data
    }
  }

  private async paginate(page: number, limit: number) {
    const totalCommercials = await this.newsRepository.count()
    const totalPages = Math.ceil(totalCommercials / limit)
    const skip = (page - 1) * limit
    const endIndex = page * limit
    let previous = page === 1 ? undefined : page - 1
    let next =
      page === totalPages
        ? undefined
        : {
            page: page + 1,
            limit
          }

    return {
      skip,
      totalPages,
      currentPage: page,
      previous,
      next
    }
  }
}
