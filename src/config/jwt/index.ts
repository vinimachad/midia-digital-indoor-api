import jsonwebtoken from 'jsonwebtoken'

export default function jwt() {
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
      sign: (user_id: string) => _sign(user_id, secret, 10)
    }
  }

  return {
    refreshToken,
    accessToken
  }
}
