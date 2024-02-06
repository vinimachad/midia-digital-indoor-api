import jwt from '@configs/jwt'
import AppError from '@middlewares/error/error-model'
import RefreshTokenRepository, {
  IRefreshTokenRepository
} from '@repositories/user/refresh token/refresh-token-repository'

export interface IFindRefreshTokenByIdUseCase {
  execute(token: string): Promise<{ id: string; refresh_token: string; user_id: string }>
}

export default class FindRefreshTokenByIdUseCase implements IFindRefreshTokenByIdUseCase {
  constructor(private repository: IRefreshTokenRepository = new RefreshTokenRepository()) {}

  async execute(token: string) {
    try {
      let { id: user_id } = jwt().refreshToken().verify(token)

      let refresh_token = await this.repository.findByUserIdAndToken({
        user_id,
        refresh_token: token
      })

      if (!refresh_token) {
        throw new AppError({
          status_code: 401,
          title: 'Refresh token inválido.',
          message: 'Este refresh token não existe.'
        })
      }

      return { id: refresh_token.id, refresh_token: token, user_id }
    } catch {
      throw new AppError({
        status_code: 401,
        title: 'Refresh token inválido.',
        message: 'Este refresh token não existe.'
      })
    }
  }
}
