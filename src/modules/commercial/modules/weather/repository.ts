import { prismaClient } from '@configs/prisma'
import { Prisma, PrismaClient, Weather } from '@prisma/client'

export interface IWeatherRepository {
  findById(id: string)
  list(): Promise<Weather[]>
  update(id: string, data: Prisma.WeatherUpdateInput)
  create(data: Prisma.WeatherCreateInput): Promise<Weather>
}

export default class WeatherRepository implements IWeatherRepository {
  constructor(private client: PrismaClient = prismaClient) {}

  async list(): Promise<Weather[]> {
    return await this.client.weather.findMany({
      include: { forecast: { take: 4, orderBy: { index: 'asc' } } }
    })
  }

  async create(data: Prisma.WeatherCreateInput) {
    return await this.client.weather.create({ data })
  }

  async findById(id: string) {
    return await this.client.weather.findUnique({ where: { id } })
  }

  async update(id: string, data: Prisma.WeatherUpdateInput) {
    return await this.client.weather.update({
      data,
      where: { id }
    })
  }
}
