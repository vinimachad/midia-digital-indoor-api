import jwt from '@configs/jwt'
import CreateRefreshTokenUseCase, {
  ICreateRefreshTokenUseCase
} from './create-refresh-token-use-case'
import DeleteRefreshTokenByIdUseCase, {
  IDeleteRefreshTokenByIdUseCase
} from './delete-refresh-token-by-id-use-case'
import FindRefreshTokenByIdUseCase, {
  IFindRefreshTokenByIdUseCase
} from './find-refresh-token-by-id-use-case'
import { String } from 'aws-sdk/clients/dms'

export interface ICanRefreshTokenUseCaseUseCase {
  execute(token: string)
}

export default class CanRefreshTokenUseCaseUseCase
  implements ICanRefreshTokenUseCaseUseCase
{
  constructor(
    private findRefreshTokenByUserIdUseCase: IFindRefreshTokenByIdUseCase = new FindRefreshTokenByIdUseCase(),
    private deleteRefreshTokenByIdUseCase: IDeleteRefreshTokenByIdUseCase = new DeleteRefreshTokenByIdUseCase(),
    private createRefreshTokenUseCase: ICreateRefreshTokenUseCase = new CreateRefreshTokenUseCase()
  ) {}

  async execute(token: string) {
    let jwtToken = this.verifyTokenJwt(token)

    if (jwtToken) {
      let { id: user_id } = jwtToken
      return await this.createRefreshToken(user_id)
    }

    let { user_id, id } =
      await this.findRefreshTokenByUserIdUseCase.execute(token)
    await this.deleteRefreshTokenByIdUseCase.execute(id)
    return await this.createRefreshToken(user_id)
  }

  private async createRefreshToken(user_id: String) {
    let { refresh_token } =
      await this.createRefreshTokenUseCase.execute(user_id)
    return { refresh_token }
  }

  private verifyTokenJwt(token: string) {
    try {
      return jwt().jwtToken().verify(token)
    } catch {
      return undefined
    }
  }
}
