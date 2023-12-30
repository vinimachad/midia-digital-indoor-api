import { prismaClient } from '@configs/prisma'
import { Commercial, Prisma, PrismaClient } from '@prisma/client'

export interface ICommercialRepository {
  findById(id: string)
  findByNewsId(id: string)
  count(): Promise<number>
  create(data: Prisma.CommercialCreateInput)
  list(skip: number, take: number): Promise<Commercial[]>
  update(id: string, data: Prisma.CommercialUpdateInput)
}

export default class CommercialRepository implements ICommercialRepository {
  constructor(private client: PrismaClient = prismaClient) {}

  async count() {
    return await this.client.commercial.count()
  }

  async list(skip: number, take: number) {
    return await this.client.commercial.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        news: true,
        weather: { include: { forecast: true } }
      }
    })
  }

  async findById(id: string) {
    return await this.client.commercial.findUnique({ where: { id } })
  }

  async create(data: Prisma.CommercialCreateInput) {
    await this.client.commercial.create({ data })
  }

  async findByNewsId(id: string) {
    return await this.client.commercial.findFirst({ where: { newsId: id } })
  }

  async update(id: string, data: Prisma.CommercialUpdateInput) {
    return await this.client.commercial.update({ where: { id }, data })
  }
}
