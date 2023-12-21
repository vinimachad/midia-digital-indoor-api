import { prismaClient } from '@configs/prisma'
import { CommercialModel } from '@entities/commercial'
import { PrismaClient } from '@prisma/client'

export interface ICommercialRepository {
  list()
  findById(id: string)
  create(data: CommercialModel)
}

export default class CommercialRepository implements ICommercialRepository {
  constructor(private client: PrismaClient = prismaClient) {}

  async list() {
    return await this.client.commercial.findMany()
  }

  async findById(id: string) {
    return await this.client.commercial.findUnique({ where: { id } })
  }

  async create(data: CommercialModel) {
    await this.client.commercial.create({ data })
  }
}
