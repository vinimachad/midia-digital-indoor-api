import { prismaClient } from '@configs/prisma'
import { Banner, Prisma, PrismaClient } from '@prisma/client'

export interface IBannerRepository {
  list(): Promise<Banner[]>
  create(data: Prisma.BannerCreateInput)
}

export default class BannerRepository implements IBannerRepository {
  constructor(private client: PrismaClient = prismaClient) {}

  async list() {
    return await this.client.banner.findMany()
  }

  async create(data: Prisma.BannerCreateInput) {
    await this.client.banner.create({ data })
  }
}
