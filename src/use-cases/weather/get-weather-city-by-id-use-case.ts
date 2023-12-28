import axios from 'axios'
import { Forecast, Weather } from 'models/weather'

export interface IGetWeatherCityByIdUseCase {
  execute(city_id: string)
}

export type WeatherRequest = {
  city_name: string
  sunrise: string
  sunset: string
  temp: string
  description: string
  condition_slug: string
  forecast: ForecastRequest[]
}

export type ForecastRequest = {
  date: string
  max: string
  min: string
  condition: string
}

export default class GetWeatherCityByIdUseCase
  implements IGetWeatherCityByIdUseCase
{
  async execute(city_id: string): Promise<WeatherRequest> {
    try {
      const response = await axios.get<{ results: Weather }>(
        `https://api.hgbrasil.com/weather?woeid=${city_id}&key=c17e55b4`
      )
      const {
        city_name,
        sunrise,
        sunset,
        temp,
        description,
        condition_slug,
        forecast
      } = response.data.results

      return {
        city_name,
        sunrise,
        sunset,
        temp: `${temp}º C`,
        description,
        condition_slug: `https://assets.hgbrasil.com/weather/icons/conditions/${condition_slug}.svg`,
        forecast: this.getTheFourthFirstForecasts(forecast)
      }
    } catch (error) {
      throw error
    }
  }

  private getTheFourthFirstForecasts(data: Forecast[]) {
    return this.formatForecast(data).slice(0, 4)
  }

  private formatForecast(data: Forecast[]): ForecastRequest[] {
    return data.map((item) => {
      return {
        condition: `https://assets.hgbrasil.com/weather/icons/conditions/${item.condition}.svg`,
        max: `Máxima de ${item.max}º C`,
        min: `Mínima de ${item.min}º C`,
        date: `${item.weekday} - ${item.date}`
      }
    })
  }
}
