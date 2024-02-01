import UserController from '@controllers/user/user-controller'
import useAuthentication from '@middlewares/auth/use-authentication'
import useValidate from '@middlewares/zod/use-validate'
import { userSchema } from '@models/zod/schemas/user'
import { Router } from 'express'

import jwt from 'jsonwebtoken'

const userRoutes = Router()
const userController = UserController()

userRoutes.post('/register', useValidate(userSchema), userController.create)
userRoutes.get('/jwt', (req, res) => {
  let secret = process.env.JWT_SECRET_KEY ?? ''
  res.status(200).json({
    jwt: jwt.sign({ id: 'asdasdaqweasdasd' }, secret, { expiresIn: 30 })
  })
})
userRoutes.get('/test', useAuthentication, (req, res) => {
  res.status(204)
})

export default userRoutes
