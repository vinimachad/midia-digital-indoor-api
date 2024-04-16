import jwt from '@configs/jwt'
import FindRefreshTokenByIdUseCase, {
  IFindRefreshTokenByIdUseCase
} from '@modules/refresh-token/use-cases/find-refresh-token-by-id'
import { NextFunction, Request, Response } from 'express'
import AppError from '../error/error-model'

const useAuthentication =
  (findByUserIdAndTokenUseCase: IFindRefreshTokenByIdUseCase = new FindRefreshTokenByIdUseCase()) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let { authorization } = req.headers

    if (!authorization)
      throw new AppError({
        status_code: 401,
        title: 'Parâmetro Authorization faltando',
        message: 'O campo Authorization no headers é obrigatório pra realizar essa chamada'
      })

    let [_, access_token] = authorization.split(' ')

    await _decodeJwt()
    next()

    async function _decodeJwt() {
      await _verifyAccessToken()
    }

    async function _verifyAccessToken() {
      try {
        jwt().accessToken().verify(access_token)
      } catch (error) {
        throw new AppError({ status_code: 401, title: 'Token inválido' })
      }
    }
  }

export default useAuthentication
