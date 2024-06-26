import CommercialController from '@controllers/commercial/commercial-controller'
import { Router } from 'express'

const commercialController = new CommercialController()
const commercialRoutes = Router()

commercialRoutes.put('/update', (req, res) => commercialController.update(req, res))
commercialRoutes.post('/create/banner', (req, res) => commercialController.create(req, res))
commercialRoutes.get('/list', (req, res) => commercialController.list(req, res))

export default commercialRoutes
