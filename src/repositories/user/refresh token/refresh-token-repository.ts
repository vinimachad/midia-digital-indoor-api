import { Prisma, RefreshToken } from '@prisma/client'
import BaseRepository from '@repositories/abstract-repository'

export interface IRefreshTokenRepository extends BaseRepository<Prisma.RefreshTokenCreateInput> {
  findByUserId(user_id: string): Promise<RefreshToken[]>
  create(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken>
  findByUserIdAndToken(data: { user_id: string; refresh_token: string }): Promise<RefreshToken | null>
}

export default class RefreshTokenRepository extends BaseRepository<RefreshToken> implements IRefreshTokenRepository {
  model: any

  constructor() {
    super()
    this.model = this.client.refreshToken
  }

  async findByUserIdAndToken(data: { user_id: string; refresh_token: string }) {
    return await this.client.refreshToken.findFirst({
      where: {
        userId: data.user_id,
        refresh_token: data.refresh_token
      }
    })
  }

  async findByUserId(user_id: string) {
    return await this.client.refreshToken.findMany({
      where: { userId: user_id }
    })
  }
}
