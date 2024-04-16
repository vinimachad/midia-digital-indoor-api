import { News } from '@shared/types/news-model'
import NewsRepository, { INewsRepository } from '../repository'

export interface ICreateManyNewsUseCase {
  execute(data: News[])
}

export default class CreateManyNewsUseCase implements ICreateManyNewsUseCase {
  constructor(private repository: INewsRepository = new NewsRepository()) {}

  async execute(data: News[]) {
    let ids = data.map((item) => item.id)
    const existingNewsIds = (await this.repository.findManyByIds(ids)).map((item) => item.id)
    const uniqueItems = data.filter((data) => !existingNewsIds.includes(data.id))
    await this.repository.createMany(uniqueItems.reverse())
  }
}
