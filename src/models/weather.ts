export type Weather = {
  temp: number
  date: string
  condition_code: string
  description: string
  currently: string
  city: string
  img_id: string
  sunrise: string
  sunset: string
  condition_slug: string
  city_name: string
  forecast: Forecast[]
}

export type Forecast = {
  date: string
  weekday: string
  max: number
  min: number
  cloudiness: number
  rain: number
  rain_probability: number
  description: string
  condition: string
}
