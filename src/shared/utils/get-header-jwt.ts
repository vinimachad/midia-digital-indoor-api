import jwt from '@configs/jwt'
import { Request } from 'express'
export function getJwtFromHeader(req: Request): { token: string; userId: string } | undefined {
  let { authorization } = req.headers

  if (authorization) {
    let [_, token] = authorization.split(' ')
    return {
      token,
      userId: jwt().accessToken().verify(token).id
    }
  }
}
