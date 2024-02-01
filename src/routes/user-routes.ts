import UserController from '@controllers/user/user-controller'
import useValidate from '@middlewares/zod/use-validate'
import { userSchema } from '@models/zod/schemas/user'
import { Router } from 'express'

const userRoutes = Router()
const userController = UserController()

userRoutes.post('/register', useValidate(userSchema), userController.create)
userRoutes.get('/refresh-token', userController.refreshToken)

export default userRoutes
