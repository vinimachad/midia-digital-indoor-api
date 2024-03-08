export default {
  access_token: {
    name: 'access_token',
    config: {
      httpOnly: true,
      expires: (() => {
        let expireDate = new Date()
        expireDate.setHours(expireDate.getHours() + 1)
        return expireDate
      })()
    }
  },
  refresh_token: {
    name: 'refresh_token',
    config: {
      httpOnly: true,
      expires: (() => {
        let expireDate = new Date()
        expireDate.setDate(expireDate.getDate() + 30)
        return expireDate
      })()
    }
  }
}
