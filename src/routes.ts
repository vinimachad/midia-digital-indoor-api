import commercialRoutes from '@routes/commercial/commercial-routes'
import { Router } from 'express'

const routes = Router()
routes.use('/commercial', commercialRoutes)
export default routes
