import { Banner, News, Weather } from '@prisma/client'

export type Commercial = {
  news?: News
  weather?: Weather
  banners?: Banner[]
}
