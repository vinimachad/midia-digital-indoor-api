import multerStorage from '@configs/multer'
import multer from 'multer'

const upload = multer({ storage: multerStorage })
export default upload
