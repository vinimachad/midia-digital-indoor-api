import UserController from '@controllers/user/user-controller'
import { Router } from 'express'

const userRoutes = Router()
const userController = UserController()

userRoutes.post('/register', userController.create)

export default userRoutes
