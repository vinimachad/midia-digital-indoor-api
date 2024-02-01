import UserController from '@controllers/user/user-controller'
import validate from '@middlewares/zod/validate'
import { Router } from 'express'
import { userSchema } from '../models/zod/schemas/user'

const userRoutes = Router()
const userController = UserController()

userRoutes.post('/register', validate(userSchema), userController.create)

export default userRoutes
