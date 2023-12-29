import { News, Prisma } from '@prisma/client'
import NewsRepository, {
  INewsRepository
} from '@repositories/commercial/news-repository'
import CreateCommercialUseCase, {
  ICreateCommercialUseCase
} from '../create-commercial-use-case'

export interface ICreateNewsUseCase {
  execute(news: Prisma.NewsCreateInput)
}

export default class CreateNewsUseCase implements ICreateNewsUseCase {
  constructor(
    private createCommercialUseCase: ICreateCommercialUseCase = new CreateCommercialUseCase(),
    private newsRepository: INewsRepository = new NewsRepository()
  ) {}

  async execute(news: Prisma.NewsCreateInput) {
    const alreadyExistNews = await this.newsRepository.findById(news.id)
    if (alreadyExistNews) return

    const { id } = await this.newsRepository.create(news)
    await this.createCommercialUseCase.execute({ news: { connect: { id } } })
  }
}
