import { Prisma } from '@prisma/client'
import NewsRepository, { INewsRepository } from '../repository'

export interface ICreateNewsUseCase {
  execute(news: Prisma.NewsCreateInput)
}

export default class CreateNewsUseCase implements ICreateNewsUseCase {
  constructor(private newsRepository: INewsRepository = new NewsRepository()) {}

  async execute(news: Prisma.NewsCreateInput) {
    const alreadyExistNews = await this.newsRepository.findById(news.id)
    if (alreadyExistNews) return
    await this.newsRepository.create(news)
  }
}
