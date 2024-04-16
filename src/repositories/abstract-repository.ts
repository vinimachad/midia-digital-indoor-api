import { prismaClient } from '@configs/prisma'
import { Prisma, PrismaClient } from '@prisma/client'

export interface IBaseRepository<T, Return> {
  list(): Promise<Return[]>
  create(data: T): Promise<Return>
  findById(id: string): Promise<Return>
  deleteById(id: string): Promise<void>
  update(id: string, data: any): Promise<void>
}

export default abstract class BaseRepository<T, Return> implements IBaseRepository<T, Return> {
  abstract model: any

  constructor(protected client: PrismaClient = prismaClient) {}

  async list() {
    return await this.model.findMany()
  }

  async create(data: T) {
    return await this.model.create({ data })
  }

  async findById(id: string) {
    return await this.model.findUnique({ where: { id } })
  }

  async deleteById(id: string) {
    await this.model.delete({ where: { id } })
  }

  async update(id: string, data: any) {
    await this.model.update({ data, where: { id } })
  }
}
