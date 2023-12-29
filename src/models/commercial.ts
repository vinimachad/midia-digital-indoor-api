import { News, Weather } from '@prisma/client'

export type Commercial = {
  news?: News
  weather?: Weather
}
