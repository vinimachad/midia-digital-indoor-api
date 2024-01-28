import { prismaClient } from '@configs/prisma'
import { Banner, Prisma, PrismaClient } from '@prisma/client'

export interface IBannerRepository {
  update(data: Banner)
  list(): Promise<Banner[]>
  create(data: Prisma.BannerCreateInput)
  createMany(data: Prisma.BannerCreateInput[])
  findByUrl(url: string): Promise<Banner | null>
  findManyByUrl(data: string[]): Promise<Banner[]>
}

export default class BannerRepository implements IBannerRepository {
  constructor(private client: PrismaClient = prismaClient) {}

  async findByUrl(url: string) {
    return await this.client.banner.findFirst({ where: { url } })
  }

  async findManyByUrl(data: string[]) {
    return await this.client.banner.findMany({ where: { url: { in: data } } })
  }

  async list() {
    return await this.client.banner.findMany()
  }

  async create(data: Prisma.BannerCreateInput) {
    await this.client.banner.create({ data })
  }

  async createMany(data: Prisma.BannerCreateManyInput[]) {
    await this.client.banner.createMany({ data })
  }

  async update(data: Banner) {
    await this.client.banner.update({
      data: { url: data.url },
      where: { id: data.id }
    })
  }
}
