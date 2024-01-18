import { prismaClient } from '@configs/prisma'
import { News, Prisma, PrismaClient } from '@prisma/client'

export interface INewsRepository {
  count()
  findById(id: string)
  list(): Promise<News[]>
  listWithPagination(skip: number, take: number): Promise<News[]>
  create(data: Prisma.NewsCreateInput): Promise<News>
}

export default class NewsRepository implements INewsRepository {
  constructor(private client: PrismaClient = prismaClient) {}

  async count() {
    return await this.client.news.count()
  }

  async list() {
    return await this.client.news.findMany()
  }

  async create(data: Prisma.NewsCreateInput) {
    return await this.client.news.create({ data })
  }

  async findById(id: string) {
    return await this.client.news.findUnique({ where: { id } })
  }

  async listWithPagination(skip: number, take: number) {
    return await this.client.news.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' }
    })
  }
}
