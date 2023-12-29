import { prismaClient } from '@configs/prisma'
import { Commercial, Prisma, PrismaClient } from '@prisma/client'

export interface ICommercialRepository {
  list()
  findById(id: string)
  create(data: Prisma.CommercialCreateInput)
}

export default class CommercialRepository implements ICommercialRepository {
  constructor(private client: PrismaClient = prismaClient) {}

  async list() {
    return await this.client.commercial.findMany()
  }

  async findById(id: string) {
    return await this.client.commercial.findUnique({ where: { id } })
  }

  async create(data: Prisma.CommercialCreateInput) {
    await this.client.commercial.create({ data })
  }
}
