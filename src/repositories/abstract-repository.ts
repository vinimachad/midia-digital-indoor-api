import { prismaClient } from '@configs/prisma'
import { Prisma, PrismaClient } from '@prisma/client'

export default abstract class BaseRepository<T> {
  constructor(
    private model: Prisma.ModelName,
    protected client: PrismaClient = prismaClient
  ) {}

  async findById(id: string) {
    return await this.client[this.model].findUnique({ where: { id } })
  }

  async create(data: T) {
    return await this.client[this.model].create({ data })
  }

  async list() {
    return await this.client[this.model].findMany()
  }

  async deleteById(id: string) {
    await this.client[this.model].delete({ where: { id } })
  }
}
