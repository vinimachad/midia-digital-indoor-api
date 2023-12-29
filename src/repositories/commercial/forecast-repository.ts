import { prismaClient } from '@configs/prisma'
import { Forecast, Prisma, PrismaClient } from '@prisma/client'
import { number } from 'zod'

export interface IForecastRepository {
  findById(id: string)
  findByWeatherId(weatherId: string, index: number)
  list(): Promise<Forecast[]>
  update(id: string, data: Prisma.ForecastUpdateInput)
  create(data: Prisma.ForecastCreateInput): Promise<Forecast>
  deleteAll()
}

export default class ForecastRepository implements IForecastRepository {
  constructor(private client: PrismaClient = prismaClient) {}

  async list(): Promise<Forecast[]> {
    return await this.client.forecast.findMany()
  }

  async create(data: Prisma.ForecastCreateInput) {
    return await this.client.forecast.create({ data })
  }

  async findById(id: string) {
    return await this.client.forecast.findUnique({ where: { id } })
  }

  async findByWeatherId(weatherId: string, index: number) {
    return await this.client.forecast.findFirst({ where: { weatherId, index } })
  }

  async update(id: string, data: Prisma.ForecastUpdateInput) {
    return await this.client.forecast.update({
      data,
      where: { id }
    })
  }

  async deleteAll() {
    return await this.client.forecast.deleteMany()
  }
}
