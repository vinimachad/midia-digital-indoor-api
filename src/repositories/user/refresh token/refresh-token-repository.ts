import { Prisma, RefreshToken } from '@prisma/client'
import BaseRepository from '@repositories/abstract-repository'

export interface IRefreshTokenRepository
  extends BaseRepository<Prisma.RefreshTokenCreateInput> {
  findByUserIdAndToken(data: {
    user_id: string
    refresh_token: string
  }): Promise<RefreshToken | null>
}

export default class RefreshTokenRepository
  extends BaseRepository<RefreshToken>
  implements IRefreshTokenRepository
{
  constructor() {
    super('RefreshToken')
  }

  async findByUserIdAndToken(data: { user_id: string; refresh_token: string }) {
    return await this.client.refreshToken.findFirst({
      where: {
        userId: data.user_id,
        refresh_token: data.refresh_token
      }
    })
  }
}
