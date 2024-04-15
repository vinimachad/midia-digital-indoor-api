import jsonwebtoken from 'jsonwebtoken'

type TokenConfig = {
  verify: (token: string) => { id: string }
  sign: (userId: string) => string
}

export interface IConfigJwt {
  accessToken: () => TokenConfig
  refreshToken: () => TokenConfig
}

export default function jwt(): IConfigJwt {
  function _verify(token: string, secret: string) {
    return jsonwebtoken.verify(token, secret) as { id: string }
  }

  function _sign(id: string, secret: string, expiresIn: string | number | undefined) {
    return jsonwebtoken.sign({ id }, secret, { expiresIn })
  }

  function refreshToken() {
    let secret = process.env.REFRESH_TOKEN_SECRET_KEY ?? ''
    return {
      verify: (token: string) => _verify(token, secret),
      sign: (user_id: string) => _sign(user_id, secret, '30d')
    }
  }

  function accessToken() {
    let secret = process.env.SECRET_ACCESS_TOKEN_KEY ?? ''
    return {
      verify: (token: string) => _verify(token, secret),
      sign: (user_id: string) => _sign(user_id, secret, '1h')
    }
  }

  return {
    refreshToken,
    accessToken
  }
}
