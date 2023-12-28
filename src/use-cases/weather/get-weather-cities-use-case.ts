import GetWeatherCityByIdUseCase, {
  IGetWeatherCityByIdUseCase,
  WeatherRequest
} from './get-weather-city-by-id-use-case'

export interface IGetWeatherCitiesUseCase {
  execute(): Promise<WeatherRequest[]>
}

enum CitiesIds {
  CAMPO_GRANDE = '26804347'
  // CORUMBA = '455947',
  // AQUIDAUANA = '456043',
  // MIRANDA = '456335',
  // COXIM = '457088',
  // SAO_PAULO = '455827'
}

export default class GetWeatherCitiesUseCase
  implements IGetWeatherCitiesUseCase
{
  private cities: CitiesIds[] = Object.values(CitiesIds)
  constructor(
    private getWeatherCityByIdUseCase: IGetWeatherCityByIdUseCase = new GetWeatherCityByIdUseCase()
  ) {}

  async execute(): Promise<WeatherRequest[]> {
    const weatherPromises: Promise<WeatherRequest>[] = this.cities.map(
      async (cityId) => await this.getWeatherCityByIdUseCase.execute(cityId)
    )

    return await Promise.all(weatherPromises)
  }
}
