import CommercialController from '@controllers/commercial/commercial-controller'
import upload from '@middlewares/upload'
import { Router } from 'express'

const commercialController = new CommercialController()
const commercialRoutes = Router()

commercialRoutes.patch('/update', (req, res) =>
  commercialController.update(req, res)
)
commercialRoutes.post('/create', upload.single('file'), (req, res) =>
  commercialController.create(req, res)
)
commercialRoutes.get('/list', (req, res) => commercialController.list(req, res))

export default commercialRoutes
