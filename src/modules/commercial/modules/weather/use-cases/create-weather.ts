import UpdateWeatherUseCase, { IUpdateWeatherUseCase } from './update-weather'
import CreateForecastUseCase, { ICreateForecastUseCase } from '../modules/forecast/create-forecast'
import { ForecastRequest, WeatherRequest } from './get-weather-city-by-id'
import WeatherRepository, { IWeatherRepository } from '../repository'

export interface ICreateWeatherUseCase {
  execute(data: WeatherRequest)
}

export default class CreateWeatherUseCase implements ICreateWeatherUseCase {
  constructor(
    private repository: IWeatherRepository = new WeatherRepository(),
    private createForecastUseCase: ICreateForecastUseCase = new CreateForecastUseCase(),
    private updateWeatherUseCase: IUpdateWeatherUseCase = new UpdateWeatherUseCase()
  ) {}

  async execute(data: WeatherRequest) {
    const alreadyExistWeather = await this.repository.findById(data.id)

    if (alreadyExistWeather) {
      const weatherData = { ...data, forecast: undefined }
      let updatedWeather = await this.updateWeatherUseCase.execute(weatherData)
      await this.createForecasts(alreadyExistWeather.id, data.forecast)
      return updatedWeather
    }

    return await this.repository.create({
      ...data,
      forecast: { createMany: { data: data.forecast } }
    })
  }

  private async createForecasts(weatherId: string, forecasts: ForecastRequest[]) {
    await forecasts.forEach(async (data) => {
      await this.createForecastUseCase.execute(weatherId, data)
    })
  }
}
