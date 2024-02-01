import AppError from '@middlewares/error/error-model'
import RefreshTokenRepository, {
  IRefreshTokenRepository
} from '@repositories/user/refresh token/refresh-token-repository'

export interface IDeleteRefreshTokenByIdUseCase {
  execute(id: string)
}

export default class DeleteRefreshTokenByIdUseCase
  implements IDeleteRefreshTokenByIdUseCase
{
  constructor(
    private repository: IRefreshTokenRepository = new RefreshTokenRepository()
  ) {}

  async execute(id: string) {
    try {
      await this.repository.deleteById(id)
    } catch {
      throw new AppError({
        status_code: 400,
        title: 'Erro ao deletar refresh token',
        message: 'Ocorreu um erro ao tentar deletar refresh token'
      })
    }
  }
}
