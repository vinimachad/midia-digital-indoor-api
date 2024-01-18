import { News } from 'models/news-model'
import CreateNewsUseCase, { ICreateNewsUseCase } from './create-news-use-case'

export interface ICreateManyNewsUseCase {
  execute(data: News[])
}

export default class CreateManyNewsUseCase implements ICreateManyNewsUseCase {
  constructor(
    private createNewsUseCase: ICreateNewsUseCase = new CreateNewsUseCase()
  ) {}

  async execute(data: News[]) {
    for (let item of data) {
      await this.createNewsUseCase.execute(item)
    }
  }
}
