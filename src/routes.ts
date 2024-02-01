import commercialRoutes from '@routes/commercial/commercial-routes'
import userRoutes from '@routes/user-routes'
import { Router } from 'express'

const routes = Router()
routes.use('/commercial', commercialRoutes)
routes.use('/user', userRoutes)
export default routes
