import { prismaClient } from '@configs/prisma'
import { News, Prisma, PrismaClient } from '@prisma/client'

export interface INewsRepository {
  list(): Promise<News[]>
  create(data: Prisma.NewsCreateInput): Promise<News>
  findById(id: string)
}

export default class NewsRepository implements INewsRepository {
  constructor(private client: PrismaClient = prismaClient) {}

  async list() {
    return await this.client.news.findMany()
  }

  async create(data: Prisma.NewsCreateInput) {
    return await this.client.news.create({ data })
  }

  async findById(id: string) {
    return await this.client.news.findUnique({ where: { id } })
  }
}
