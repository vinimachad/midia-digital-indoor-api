import AppError from '@middlewares/error/error-model'
import FindRefreshTokenByIdUseCase, {
  IFindRefreshTokenByIdUseCase
} from '@usecases/user/refresh-token/find-refresh-token-by-id-use-case'
import { NextFunction, Request, Response } from 'express'

const useAuthentication =
  (
    findByUserIdAndTokenUseCase: IFindRefreshTokenByIdUseCase = new FindRefreshTokenByIdUseCase()
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let { authorization } = req.headers

    if (!authorization)
      throw new AppError({
        status_code: 401,
        title: 'Parâmetro Authorization faltando',
        message:
          'O campo Authorization no headers é obrigatório pra realizar essa chamada'
      })

    let [_, token_jwt] = authorization.split(' ')

    await _decodeJwt()
    next()

    async function _decodeJwt() {
      await _verifyRefreshToken()
    }

    async function _verifyRefreshToken() {
      try {
        await findByUserIdAndTokenUseCase.execute(token_jwt)
      } catch (error) {
        throw error
      }
    }
  }

export default useAuthentication
