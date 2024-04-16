import { Router } from 'express'
import UserFactory from './factory'
import { userLoginSchema, userSchema } from './schema'
import useValidate from '@shared/middlewares/zod/use-validate'
import useAuthentication from '@shared/middlewares/auth/use-authentication'
import refreshTokenRoutes from '@modules/refresh-token/routes'
import homesRoutes from './modules/homes/router'

const userRoutes = Router()
const userController = UserFactory.controller()

userRoutes.post('/register', useValidate(userSchema), userController.create)
userRoutes.post('/login', useValidate(userLoginSchema), userController.login)
userRoutes.get('/infos', useAuthentication(), userController.infos)
userRoutes.use('/refresh-token', refreshTokenRoutes)
userRoutes.use('/homes', homesRoutes)

export default userRoutes
