import { Prisma, Commercial } from '@prisma/client'
import BaseRepository, { IBaseRepository } from '@shared/utils/abstract-repository'

export interface ICommercialRepository extends IBaseRepository<Prisma.CommercialCreateInput, Commercial> {
  findManyByUserId(userId: string): Promise<Commercial[]>
}

export default class CommercialRepository
  extends BaseRepository<Prisma.CommercialCreateInput, Commercial>
  implements ICommercialRepository
{
  model: any

  constructor() {
    super()
    this.model = this.client.commercial
  }

  async findManyByUserId(userId: string) {
    return await this.model.findMany({ where: { user_id: userId } })
  }
}
