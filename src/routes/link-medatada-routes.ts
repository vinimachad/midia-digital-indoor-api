import linkMetadataController from '@controllers/link-metadata-controller'
import { Router } from 'express'

const controller = linkMetadataController()
const linkMetadataRoutes = Router()

linkMetadataRoutes.post('/metadata', controller.post)

export default linkMetadataRoutes
