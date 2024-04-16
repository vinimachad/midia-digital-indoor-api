import jwt from '@configs/jwt'
import CreateRefreshTokenUseCase, { ICreateRefreshTokenUseCase } from './create-refresh-token'
import DeleteRefreshTokenByIdUseCase, { IDeleteRefreshTokenByIdUseCase } from './delete-refresh-token-by-id'
import FindRefreshTokenByIdUseCase, { IFindRefreshTokenByIdUseCase } from './find-refresh-token-by-id'
import { String } from 'aws-sdk/clients/dms'
import AppError from '@shared/middlewares/error/error-model'

export interface ICanRefreshTokenUseCaseUseCase {
  execute(token?: string): Promise<{ refresh_token: string; access_token: string }>
}

export default class CanRefreshTokenUseCaseUseCase implements ICanRefreshTokenUseCaseUseCase {
  constructor(
    private findRefreshTokenByUserIdUseCase: IFindRefreshTokenByIdUseCase = new FindRefreshTokenByIdUseCase(),
    private deleteRefreshTokenByIdUseCase: IDeleteRefreshTokenByIdUseCase = new DeleteRefreshTokenByIdUseCase(),
    private createRefreshTokenUseCase: ICreateRefreshTokenUseCase = new CreateRefreshTokenUseCase()
  ) {}

  async execute(refresh_token: string) {
    let isValidRefreshToken = this.verifyRefreshToken(refresh_token)

    if (!isValidRefreshToken) {
      throw new AppError({ status_code: 401, title: 'Sessão expirada.', message: 'Faça o login novamente.' })
    }

    let { id: refresh_token_id, user_id } = await this.findRefreshTokenByUserIdUseCase.execute(refresh_token)
    await this.deleteRefreshTokenByIdUseCase.execute(refresh_token_id)

    return {
      refresh_token: await this.createRefreshToken(user_id),
      access_token: jwt().accessToken().sign(user_id)
    }
  }

  private async createRefreshToken(user_id: String) {
    let { refresh_token } = await this.createRefreshTokenUseCase.execute(user_id)
    return refresh_token
  }

  private verifyRefreshToken(refresh_token: string) {
    try {
      return jwt().refreshToken().verify(refresh_token)
    } catch {
      return
    }
  }
}
