import commercialRoutes from '@routes/commercial/commercial-routes'
import linkMetadataRoutes from '@routes/link-medatada-routes'
import userRoutes from '@routes/user/user-routes'
import { Router } from 'express'

const routes = Router()
routes.use('/commercial', commercialRoutes)
routes.use('/user', userRoutes)
routes.use('/link', linkMetadataRoutes)
export default routes
