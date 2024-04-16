import { Router } from 'express'
import controller from './controller'

const linkMetadataRoutes = Router()

linkMetadataRoutes.post('/metadata', controller().post)

export default linkMetadataRoutes
