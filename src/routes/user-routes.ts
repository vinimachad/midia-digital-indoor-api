import UserController from '@controllers/user/user-controller'
import useAuthentication from '@middlewares/auth/use-authentication'
import useValidate from '@middlewares/zod/use-validate'
import { userSchema } from '@models/zod/schemas/user'
import { userLoginSchema } from '@models/zod/schemas/user-login'
import express, { Router } from 'express'

const userRoutes = Router()
const userController = UserController()

userRoutes.get('/refresh-token', userController.refreshToken)
userRoutes.post('/register', useValidate(userSchema), userController.create)
userRoutes.post('/login', useValidate(userLoginSchema), userController.login)
userRoutes.get('/infos', useAuthentication(), userController.infos)

export default userRoutes
