import multerStorage from '@configs/multer'
import multer from 'multer'
import path from 'path'

const upload = multer({
  storage: multerStorage.remote
})
export default upload
