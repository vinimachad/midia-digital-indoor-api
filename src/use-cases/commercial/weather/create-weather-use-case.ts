import { Prisma } from '@prisma/client'
import WeatherRepository, {
  IWeatherRepository
} from '@repositories/commercial/weather-repository'
import CreateCommercialUseCase, {
  ICreateCommercialUseCase
} from '../create-commercial-use-case'
import UpdateWeatherUseCase, {
  IUpdateWeatherUseCase
} from './update-weather-use-case'
import {
  ForecastRequest,
  WeatherRequest
} from '@usecases/weather/get-weather-city-by-id-use-case'
import CreateForecastUseCase, {
  ICreateForecastUseCase
} from './forecast/create-forecast-use-case'

export interface ICreateWeatherUseCase {
  execute(data: WeatherRequest)
}

export default class CreateWeatherUseCase implements ICreateWeatherUseCase {
  constructor(
    private repository: IWeatherRepository = new WeatherRepository(),
    private createCommercialUseCase: ICreateCommercialUseCase = new CreateCommercialUseCase(),
    private createForecastUseCase: ICreateForecastUseCase = new CreateForecastUseCase(),
    private updateWeatherUseCase: IUpdateWeatherUseCase = new UpdateWeatherUseCase()
  ) {}

  async execute(data: WeatherRequest) {
    const alreadyExistWeather = await this.repository.findById(data.id)
    const weatherData = { ...data, forecast: undefined }

    if (alreadyExistWeather) {
      await this.updateWeatherUseCase.execute(weatherData)
      await this.createForecasts(alreadyExistWeather.id, data.forecast)
      return
    }

    let { id } = await this.repository.create({
      ...data,
      forecast: { createMany: { data: data.forecast } }
    })
    await this.createCommercialUseCase.execute({ weather: { connect: { id } } })
  }

  private async createForecasts(
    weatherId: string,
    forecasts: ForecastRequest[]
  ) {
    await forecasts.forEach(async (data) => {
      await this.createForecastUseCase.execute(weatherId, data)
    })
  }
}
