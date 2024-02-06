import jwt from '@configs/jwt'
import RefreshTokenRepository, {
  IRefreshTokenRepository
} from '@repositories/user/refresh token/refresh-token-repository'

export interface ICreateRefreshTokenAndDeleteOthersUseCase {
  execute(user_id: string): Promise<string>
}

export default class CreateRefreshTokenAndDeleteOthersUseCase implements ICreateRefreshTokenAndDeleteOthersUseCase {
  constructor(private repository: IRefreshTokenRepository = new RefreshTokenRepository()) {}

  async execute(user_id: string) {
    let refresh_tokens = await this.repository.findByUserId(user_id)

    if (!refresh_tokens) {
      return await this.createRefreshToken(user_id)
    }

    for (let token of refresh_tokens) {
      await this.repository.deleteById(token.id)
    }

    return await this.createRefreshToken(user_id)
  }

  private async createRefreshToken(user_id: string) {
    let { refresh_token } = await this.repository.create({
      refresh_token: jwt().refreshToken().sign(user_id),
      expires_date: '30d',
      User: { connect: { id: user_id } }
    })
    return refresh_token
  }
}
