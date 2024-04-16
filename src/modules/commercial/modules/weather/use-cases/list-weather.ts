import { Weather } from '@prisma/client'
import WeatherRepository, { IWeatherRepository } from '../repository'

export interface IListWeatherUseCase {
  execute(): Promise<Weather[]>
}

export default class ListWeatherUseCase implements IListWeatherUseCase {
  constructor(private repository: IWeatherRepository = new WeatherRepository()) {}

  async execute() {
    return await this.repository.list()
  }
}
