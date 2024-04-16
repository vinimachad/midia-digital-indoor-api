import useAuthentication from '@shared/middlewares/auth/use-authentication'
import { Router } from 'express'
import CommercialFactory from './factory'

const commercialRoutes = Router()
const controller = CommercialFactory.controller()

commercialRoutes.put('/update', (req, res) => controller.update(req, res))
commercialRoutes.post('/create/banner', (req, res) => controller.create(req, res))
commercialRoutes.get('/list', (req, res) => controller.list(req, res))
commercialRoutes.post('/create/review', useAuthentication(), (req, res) => controller.createReview(req, res))
export default commercialRoutes
