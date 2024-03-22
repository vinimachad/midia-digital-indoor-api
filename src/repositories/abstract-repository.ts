import { prismaClient } from '@configs/prisma'
import { PrismaClient } from '@prisma/client'

export default abstract class BaseRepository<T> {
  abstract model: any

  constructor(protected client: PrismaClient = prismaClient) {}

  async findById(id: string) {
    return await this.model.findUnique({ where: { id } })
  }

  async create(data: T) {
    return await this.model.create({ data })
  }

  async list() {
    return await this.model.findMany()
  }

  async deleteById(id: string) {
    await this.model.delete({ where: { id } })
  }
}
