import HomesFactory from '@factories/homes/homes-factory'
import useAuthentication from '@middlewares/auth/use-authentication'
import { Router } from 'express'

const homesRoutes = Router()
const controller = HomesFactory.controller()

homesRoutes.get('/commercial/upload/menu', useAuthentication(), controller.commercialUploadMenu)
export default homesRoutes
