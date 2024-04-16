import useAuthentication from '@shared/middlewares/auth/use-authentication'
import { Router } from 'express'
import HomesFactory from './factory'

const homesRoutes = Router()
const controller = HomesFactory.controller()

homesRoutes.get('/commercial/upload/menu', useAuthentication(), controller.commercialUploadMenu)
export default homesRoutes
