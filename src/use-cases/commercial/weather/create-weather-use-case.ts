import WeatherRepository, {
  IWeatherRepository
} from '@repositories/commercial/weather-repository'
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

  private async createForecasts(
    weatherId: string,
    forecasts: ForecastRequest[]
  ) {
    await forecasts.forEach(async (data) => {
      await this.createForecastUseCase.execute(weatherId, data)
    })
  }
}
