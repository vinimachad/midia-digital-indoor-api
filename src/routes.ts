import commercialRoutes from '@modules/commercial/routes'
import linkMetadataRoutes from '@modules/link-metadata/routes'
import userRoutes from '@modules/user/routes'
import { Router } from 'express'

const routes = Router()
routes.use('/commercial', commercialRoutes)
routes.use('/user', userRoutes)
routes.use('/link', linkMetadataRoutes)
export default routes
