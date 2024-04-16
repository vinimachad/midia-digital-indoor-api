import { Router } from 'express'
import RefreshTokenFactory from './factory'

const refreshTokenRoutes = Router()
const controller = RefreshTokenFactory.controller()

refreshTokenRoutes.get('/', (req, res) => controller.refreshToken(req, res))

export default refreshTokenRoutes
