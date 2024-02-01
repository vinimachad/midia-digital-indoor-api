import AppError from '@middlewares/error/error-model'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default function useAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { authorization } = req.headers

  if (!authorization)
    throw new AppError({
      status_code: 401,
      title: 'Parâmetro Authorization faltando',
      message:
        'O campo Authorization no headers é obrigatório pra realizar essa chamada'
    })

  let [_, token_jwt] = authorization.split(' ')

  let decodedJwt = _decodeJwt()
  next()

  function _decodeJwt() {
    try {
      return jwt.verify(token_jwt, process.env.JWT_SECRET_KEY ?? '') as {
        id: string
      }
    } catch {
      throw new AppError({
        status_code: 401,
        title: 'Token inválido',
        message: 'Token inválido'
      })
    }
  }
}
