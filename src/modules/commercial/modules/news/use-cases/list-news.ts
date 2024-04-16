import { News } from '@prisma/client'
import NewsRepository, { INewsRepository } from '../repository'

export interface IListNewsUseCase {
  execute(): Promise<News[]>
}

export default class ListNewsUseCase implements IListNewsUseCase {
  constructor(private repository: INewsRepository = new NewsRepository()) {}

  async execute() {
    return await this.repository.list()
  }
}
