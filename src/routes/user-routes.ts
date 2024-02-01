import jwt from '@configs/jwt'
import UserController from '@controllers/user/user-controller'
import useAuthentication from '@middlewares/auth/use-authentication'
import useValidate from '@middlewares/zod/use-validate'
import { userSchema } from '@models/zod/schemas/user'
import CanRefreshTokenUseCaseUseCase from '@usecases/user/refresh-token/can-refresh-token-use-case-use-case'
import { Router } from 'express'

const userRoutes = Router()
const userController = UserController()

userRoutes.post('/register', useValidate(userSchema), userController.create)

userRoutes.get('/jwt', (req, res) => {
  res.status(200).json({
    jwt: jwt().jwtToken().sign('7c807ff8-e66a-44a0-a322-d1eeeaf534bf')
  })
})

userRoutes.get('/refresh-token', async (req, res) => {
  let auth = req.headers.authorization ?? ''
  let [_, token] = auth.split(' ')
  let canRefreshToken = new CanRefreshTokenUseCaseUseCase()
  let results = await canRefreshToken.execute(token)
  res.status(200).json({ results })
})

userRoutes.get('/test', useAuthentication(), (req, res) => {
  res.status(200).json({ message: 'ok' })
})

export default userRoutes
