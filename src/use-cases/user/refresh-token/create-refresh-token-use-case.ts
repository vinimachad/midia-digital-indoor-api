import jwt from '@configs/jwt'
import AppError from '@middlewares/error/error-model'
import { RefreshToken } from '@prisma/client'
import RefreshTokenRepository, {
  IRefreshTokenRepository
} from '@repositories/user/refresh token/refresh-token-repository'

export interface ICreateRefreshTokenUseCase {
  execute(user_id: string): Promise<RefreshToken>
}

export default class CreateRefreshTokenUseCase
  implements ICreateRefreshTokenUseCase
{
  constructor(
    private repository: IRefreshTokenRepository = new RefreshTokenRepository()
  ) {}

  async execute(user_id: string) {
    let refresh_token = jwt().refreshToken().sign(user_id)
    try {
      return await this.repository.create({
        User: { connect: { id: user_id } },
        refresh_token,
        expires_date: '30d'
      })
    } catch {
      throw new AppError({
        status_code: 400,
        title: 'Erro ao criar refresh token'
      })
    }
  }
}
